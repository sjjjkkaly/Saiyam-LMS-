import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'lms_database.sqlite');
const db = new Database(dbPath);

// Enable Foreign Keys & Write-Ahead Logging for performance
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

export function initDatabase() {
  db.exec(`
    -- 1. USERS TABLE
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      profile_image TEXT,
      role TEXT NOT NULL DEFAULT 'Student', -- 'Super Admin', 'Admin', 'Instructor', 'Student'
      password_hash TEXT NOT NULL,
      bio TEXT,
      status TEXT NOT NULL DEFAULT 'active', -- 'active', 'suspended'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    -- 2. CATEGORIES TABLE
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      image TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. COURSES TABLE (ENHANCED FOR LMS BUILDER)
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_description TEXT,
      full_description TEXT,
      thumbnail TEXT,
      featured_image TEXT,
      instructor_id INTEGER NOT NULL,
      category_id INTEGER,
      price REAL DEFAULT 0.00,
      sale_price REAL DEFAULT 0.00,
      sale_start DATETIME,
      sale_end DATETIME,
      currency TEXT DEFAULT 'INR',
      course_level TEXT DEFAULT 'All Levels', -- 'Beginner', 'Intermediate', 'Advanced', 'All Levels'
      language TEXT DEFAULT 'English',
      duration TEXT,
      requirements TEXT, -- JSON string array
      learning_outcomes TEXT, -- JSON string array
      allow_coupons INTEGER DEFAULT 1,
      access_type TEXT DEFAULT 'lifetime', -- 'lifetime', 'fixed_days'
      access_days INTEGER DEFAULT 0,
      enrollment_type TEXT DEFAULT 'open', -- 'open', 'approval', 'manual'
      completion_req_lessons INTEGER DEFAULT 1,
      completion_req_quizzes INTEGER DEFAULT 0,
      completion_req_assignments INTEGER DEFAULT 0,
      completion_min_quiz_score REAL DEFAULT 60.0,
      prerequisite_course_id INTEGER DEFAULT NULL,
      certificate_enabled INTEGER DEFAULT 1,
      certificate_min_completion REAL DEFAULT 100.0,
      certificate_min_quiz_score REAL DEFAULT 60.0,
      visibility TEXT DEFAULT 'Public', -- 'Public', 'Private'
      featured INTEGER DEFAULT 0,
      reviews_enabled INTEGER DEFAULT 1,
      qna_enabled INTEGER DEFAULT 1,
      status TEXT DEFAULT 'Draft', -- 'Draft', 'Pending Review', 'Published', 'Archived'
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
      FOREIGN KEY (prerequisite_course_id) REFERENCES courses(id) ON DELETE SET NULL
    );

    -- 4. COURSE SECTIONS TABLE
    CREATE TABLE IF NOT EXISTS course_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      ordering INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 5. LESSONS TABLE (ENHANCED FOR DRIP & RESOURCES)
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT,
      video_url TEXT,
      video_provider TEXT DEFAULT 'youtube', -- 'youtube', 'vimeo', 'custom', 'external'
      lesson_type TEXT DEFAULT 'Video', -- 'Video', 'Text', 'PDF', 'Audio', 'Quiz', 'Assignment', 'Embedded'
      duration TEXT,
      ordering INTEGER DEFAULT 0,
      preview_enabled INTEGER DEFAULT 0,
      downloadable INTEGER DEFAULT 0,
      required_completion INTEGER DEFAULT 1,
      drip_type TEXT DEFAULT 'immediately', -- 'immediately', 'days_after', 'specific_date'
      drip_value TEXT,
      resources_json TEXT, -- JSON array of file URLs and titles
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE
    );

    -- 6. ENROLLMENTS TABLE
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completion_percentage REAL DEFAULT 0.0,
      status TEXT DEFAULT 'active', -- 'active', 'completed', 'expired', 'cancelled'
      expiry_date DATETIME,
      source TEXT DEFAULT 'direct', -- 'direct', 'razorpay', 'admin_grant'
      order_id INTEGER,
      UNIQUE(student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 7. LESSON PROGRESS TABLE
    CREATE TABLE IF NOT EXISTS lesson_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      lesson_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      completion_status INTEGER DEFAULT 0, -- 0 = incomplete, 1 = completed
      watch_percentage REAL DEFAULT 0.0,
      last_position_seconds REAL DEFAULT 0.0,
      completed_at DATETIME,
      UNIQUE(student_id, lesson_id),
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 8. QUIZZES TABLE
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      time_limit_minutes INTEGER DEFAULT 0,
      attempts_allowed INTEGER DEFAULT 3,
      passing_score REAL DEFAULT 60.0,
      randomize_questions INTEGER DEFAULT 0,
      questions_json TEXT,
      ordering INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 9. QUIZ ATTEMPTS TABLE
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      score REAL DEFAULT 0.0,
      passed INTEGER DEFAULT 0,
      answers_json TEXT,
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 10. ASSIGNMENTS TABLE
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      instructions TEXT,
      deadline DATETIME,
      max_marks REAL DEFAULT 100.0,
      submission_type TEXT DEFAULT 'both', -- 'text', 'file', 'both'
      ordering INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 11. ASSIGNMENT SUBMISSIONS TABLE
    CREATE TABLE IF NOT EXISTS assignment_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignment_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      submission_text TEXT,
      file_url TEXT,
      marks_obtained REAL,
      feedback TEXT,
      status TEXT DEFAULT 'submitted', -- 'submitted', 'graded', 'resubmit'
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 12. CERTIFICATES TABLE
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      certificate_number TEXT UNIQUE NOT NULL,
      student_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      pdf_url TEXT,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 13. ORDERS TABLE
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      discount REAL DEFAULT 0.0,
      coupon_code TEXT,
      total REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      payment_gateway TEXT DEFAULT 'Razorpay',
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      razorpay_signature TEXT,
      payment_status TEXT DEFAULT 'Pending', -- 'Pending', 'Success', 'Failed', 'Refunded'
      order_status TEXT DEFAULT 'Processing', -- 'Processing', 'Completed', 'Cancelled'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 14. COUPONS TABLE
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      discount_type TEXT DEFAULT 'percentage', -- 'percentage', 'fixed'
      discount_value REAL NOT NULL,
      min_order_amount REAL DEFAULT 0.0,
      usage_limit INTEGER DEFAULT 100,
      used_count INTEGER DEFAULT 0,
      expiry_date DATETIME,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 15. REVIEWS TABLE
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      status TEXT DEFAULT 'approved', -- 'pending', 'approved', 'rejected'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(course_id, student_id),
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 16. ENQUIRIES TABLE
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new', -- 'new', 'replied', 'archived'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 17. AUDIT LOGS TABLE
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_email TEXT,
      action TEXT NOT NULL,
      entity_affected TEXT,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 18. SETTINGS TABLE
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      category TEXT DEFAULT 'general',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 19. WISHLISTS TABLE
    CREATE TABLE IF NOT EXISTS wishlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    -- 20. NOTIFICATIONS TABLE
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      type TEXT DEFAULT 'general',
      link_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 21. MEDIA TABLE
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT,
      file_size INTEGER,
      uploaded_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe Column Migration Helper for Existing Tables
  const addColumn = (table, column, def) => {
    try {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${def};`);
    } catch (e) {
      // Column already exists, ignore
    }
  };

  // Courses table migrations
  addColumn('courses', 'sale_start', 'DATETIME');
  addColumn('courses', 'sale_end', 'DATETIME');
  addColumn('courses', 'allow_coupons', 'INTEGER DEFAULT 1');
  addColumn('courses', 'access_type', "TEXT DEFAULT 'lifetime'");
  addColumn('courses', 'access_days', 'INTEGER DEFAULT 0');
  addColumn('courses', 'enrollment_type', "TEXT DEFAULT 'open'");
  addColumn('courses', 'completion_req_lessons', 'INTEGER DEFAULT 1');
  addColumn('courses', 'completion_req_quizzes', 'INTEGER DEFAULT 0');
  addColumn('courses', 'completion_req_assignments', 'INTEGER DEFAULT 0');
  addColumn('courses', 'completion_min_quiz_score', 'REAL DEFAULT 60.0');
  addColumn('courses', 'prerequisite_course_id', 'INTEGER DEFAULT NULL');
  addColumn('courses', 'certificate_enabled', 'INTEGER DEFAULT 1');
  addColumn('courses', 'certificate_min_completion', 'REAL DEFAULT 100.0');
  addColumn('courses', 'certificate_min_quiz_score', 'REAL DEFAULT 60.0');
  addColumn('courses', 'visibility', "TEXT DEFAULT 'Public'");
  addColumn('courses', 'featured', 'INTEGER DEFAULT 0');
  addColumn('courses', 'reviews_enabled', 'INTEGER DEFAULT 1');
  addColumn('courses', 'qna_enabled', 'INTEGER DEFAULT 1');
  addColumn('courses', 'status', "TEXT DEFAULT 'Draft'");

  // Lessons table migrations
  addColumn('lessons', 'required_completion', 'INTEGER DEFAULT 1');
  addColumn('lessons', 'drip_type', "TEXT DEFAULT 'immediately'");
  addColumn('lessons', 'drip_value', 'TEXT');
  addColumn('lessons', 'resources_json', 'TEXT');

  // Quizzes table migrations
  addColumn('quizzes', 'section_id', 'INTEGER');
  addColumn('quizzes', 'randomize_questions', 'INTEGER DEFAULT 0');
  addColumn('quizzes', 'ordering', 'INTEGER DEFAULT 0');

  // Assignments table migrations
  addColumn('assignments', 'section_id', 'INTEGER');
  addColumn('assignments', 'submission_type', "TEXT DEFAULT 'both'");
  addColumn('assignments', 'ordering', 'INTEGER DEFAULT 0');

  // Seed or Update Super Admin Account with requested credentials
  const newAdminEmail = 'sam93392s@gmail.com';
  const newPasswordHash = bcrypt.hashSync('Sam93392s@', 10);

  const existingNewAdmin = db.prepare(`SELECT * FROM users WHERE email = ?`).get(newAdminEmail);
  const oldAdmin = db.prepare(`SELECT * FROM users WHERE email = 'admin@saiyamjain.com'`).get();

  if (oldAdmin) {
    db.prepare(`
      UPDATE users SET email = ?, password_hash = ?, phone = ?, profile_image = ?, role = 'Super Admin'
      WHERE id = ?
    `).run(newAdminEmail, newPasswordHash, '+919339256592', '/saiyam_jain.jpg', oldAdmin.id);
    console.log(`[DB] Updated Super Admin account credentials to ${newAdminEmail}`);
  } else if (!existingNewAdmin) {
    db.prepare(`
      INSERT INTO users (name, email, phone, role, password_hash, profile_image, bio, status)
      VALUES (?, ?, ?, 'Super Admin', ?, ?, ?, 'active')
    `).run(
      'Saiyam Jain',
      newAdminEmail,
      '+919339256592',
      newPasswordHash,
      '/saiyam_jain.jpg',
      'Founder, Educator, and LMS Administrator.'
    );
    console.log(`[DB] Created Super Admin account for Saiyam Jain (${newAdminEmail})`);
  }

  // Seed Standard Categories if empty
  const categoryCount = db.prepare(`SELECT COUNT(*) as count FROM categories`).get().count;
  if (categoryCount === 0) {
    const categoriesSeed = [
      { name: 'Full Stack Development', slug: 'full-stack-development', description: 'Web, Mobile, & Cloud Architecture' },
      { name: 'Class 12 Mathematics', slug: 'class-12-mathematics', description: 'Calculus, Matrices, Vectors, & Probability' },
      { name: 'Class 12 Accountancy', slug: 'class-12-accountancy', description: 'Partnership, Company Accounts, & Financial Analysis' },
      { name: 'Economics & Business', slug: 'economics-business', description: 'Macroeconomics, Microeconomics, & Business Studies' }
    ];

    const stmt = db.prepare(`INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)`);
    categoriesSeed.forEach(cat => stmt.run(cat.name, cat.slug, cat.description));
    console.log('[DB] Seeded standard course categories.');
  }

  // Seed Default Settings if empty
  const settingsCount = db.prepare(`SELECT COUNT(*) as count FROM settings`).get().count;
  if (settingsCount === 0) {
    const defaultSettings = [
      { key: 'site_title', value: 'Saiyam Jain LMS & Course Platform' },
      { key: 'site_tagline', value: 'Premier Digital Education & Skill Academy' },
      { key: 'razorpay_key_id', value: 'rzp_test_SAIYAM_JAIN_KEY_2026' },
      { key: 'razorpay_key_secret', value: 'RAZORPAY_SECRET_SAIYAM_2026' },
      { key: 'platform_currency', value: 'INR' },
      { key: 'support_email', value: 'support@saiyamjain.com' }
    ];

    const stmt = db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?)`);
    defaultSettings.forEach(s => stmt.run(s.key, s.value));
    console.log('[DB] Initialized default platform settings.');
  }
}

export default db;
