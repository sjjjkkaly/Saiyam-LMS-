// Initial Mock Data for Saiyam Classes LMS (Class 11 & 12 Commerce & Mathematics)

export const INITIAL_COURSES = [
  {
    id: "c12-acc-01",
    title: "Class 12 Accounting Masterclass (Partnership & Company)",
    subject: "Accounts",
    classLevel: "12",
    instructor: "CA Saiyam Gupta",
    rating: 4.95,
    enrolledCount: 420,
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    description: "Complete coverage of Partnership Accounts, Revaluation, Admission, Retirement, Death, Dissolution & Company Accounts (Shares & Debentures).",
    duration: "140 Hours",
    totalLectures: 65,
    isPopular: true,
    chapters: [
      { id: "ch1", title: "Fundamentals of Partnership", lecturesCount: 8 },
      { id: "ch2", title: "Goodwill Valuation & Revaluation Account", lecturesCount: 10 },
      { id: "ch3", title: "Admission & Retirement of a Partner", lecturesCount: 15 },
      { id: "ch4", title: "Issue of Shares & Forfeiture", lecturesCount: 18 },
      { id: "ch5", title: "Cash Flow Statement (AS-3)", lecturesCount: 14 }
    ]
  },
  {
    id: "c12-math-01",
    title: "Class 12 Higher Mathematics & Calculus Pinnacle",
    subject: "Maths",
    classLevel: "12",
    instructor: "Prof. Rajesh Saiyam",
    rating: 4.92,
    enrolledCount: 380,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description: "Master Differential & Integral Calculus, Matrices, Determinants, Vectors, 3D Geometry, and Linear Programming for 100/100 target.",
    duration: "160 Hours",
    totalLectures: 72,
    isPopular: true,
    chapters: [
      { id: "mch1", title: "Matrices & Determinants", lecturesCount: 10 },
      { id: "mch2", title: "Continuity & Differentiability", lecturesCount: 14 },
      { id: "mch3", title: "Integrals & Application of Integrals", lecturesCount: 20 },
      { id: "mch4", title: "Differential Equations & Vectors", lecturesCount: 16 }
    ]
  },
  {
    id: "c12-bst-01",
    title: "Class 12 Business Studies Case Study Mastery",
    subject: "Business Studies",
    classLevel: "12",
    instructor: "Dr. Ananya Saiyam",
    rating: 4.88,
    enrolledCount: 310,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "In-depth breakdown of Management Principles, Marketing Mix, Financial Markets & Consumer Protection with 500+ board case studies.",
    duration: "95 Hours",
    totalLectures: 45,
    isPopular: false,
    chapters: [
      { id: "bch1", title: "Principles & Functions of Management", lecturesCount: 12 },
      { id: "bch2", title: "Business Environment & Planning", lecturesCount: 8 },
      { id: "bch3", title: "Financial Management & Capital Structure", lecturesCount: 15 }
    ]
  },
  {
    id: "c12-eco-01",
    title: "Class 12 Macroeconomics & Indian Economic Dev",
    subject: "Economics",
    classLevel: "12",
    instructor: "CA Saiyam Gupta",
    rating: 4.90,
    enrolledCount: 340,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    description: "National Income Accounting, Money & Banking, Foreign Exchange Rate, and 1991 Reforms with graphical diagram workshops.",
    duration: "110 Hours",
    totalLectures: 52,
    isPopular: false,
    chapters: [
      { id: "ech1", title: "National Income & Aggregates", lecturesCount: 14 },
      { id: "ech2", title: "Money, Banking & Government Budget", lecturesCount: 12 },
      { id: "ech3", title: "Indian Economy on Eve of Independence & 1991 Reforms", lecturesCount: 16 }
    ]
  },
  {
    id: "c11-acc-01",
    title: "Class 11 Foundation Financial Accounting & Journal",
    subject: "Accounts",
    classLevel: "11",
    instructor: "CA Saiyam Gupta",
    rating: 4.96,
    enrolledCount: 290,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    description: "Build crystal clear basics: Accounting Equation, Journal Entries, Ledger posting, Trial Balance, GST & Financial Statements.",
    duration: "120 Hours",
    totalLectures: 58,
    isPopular: true,
    chapters: [
      { id: "c11ch1", title: "Accounting Principles & Rules of Debit/Credit", lecturesCount: 10 },
      { id: "c11ch2", title: "Journal, Ledger & Cash Book", lecturesCount: 18 },
      { id: "c11ch3", title: "Bank Reconciliation & Trial Balance", lecturesCount: 12 },
      { id: "c11ch4", title: "Financial Statements of Sole Proprietorship", lecturesCount: 18 }
    ]
  },
  {
    id: "c11-math-01",
    title: "Class 11 Mathematics Core Foundations & Algebra",
    subject: "Maths",
    classLevel: "11",
    instructor: "Prof. Rajesh Saiyam",
    rating: 4.89,
    enrolledCount: 260,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    description: "Sets, Relations & Functions, Trigonometric Functions, Permutations & Combinations, Sequence & Series, Limits & Derivatives.",
    duration: "130 Hours",
    totalLectures: 60,
    isPopular: false,
    chapters: [
      { id: "c11mch1", title: "Sets & Trigonometric Functions", lecturesCount: 15 },
      { id: "c11mch2", title: "Linear Inequalities & Combinatorics", lecturesCount: 12 },
      { id: "c11mch3", title: "Introduction to Calculus (Limits)", lecturesCount: 18 }
    ]
  }
];

export const INITIAL_LECTURES = [
  {
    id: "lec-101",
    courseId: "c12-acc-01",
    title: "Admission of Partner: Revaluation of Assets & Liabilities",
    subject: "Accounts",
    classLevel: "12",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "45 mins",
    speaker: "CA Saiyam Gupta",
    dateAdded: "2026-08-01",
    pdfNote: "Revaluation_Account_Format_and_Journal_Entries.pdf",
    timestamps: [
      { time: "02:15", title: "Concept of Revaluation Account" },
      { time: "12:40", title: "Unrecorded Assets & Unrecorded Liabilities" },
      { time: "25:10", title: "Provision for Bad Debts Adjustments" },
      { time: "38:00", title: "Comprehensive Problem Solution" }
    ],
    transcript: "Welcome students! Today we are discussing Revaluation Account during partner admission. Remember: Nominal account rule applies - Credit all gains, Debit all losses..."
  },
  {
    id: "lec-102",
    courseId: "c12-math-01",
    title: "Definite Integration & Properties (NCERT Ex 7.11 Tricks)",
    subject: "Maths",
    classLevel: "12",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "55 mins",
    speaker: "Prof. Rajesh Saiyam",
    dateAdded: "2026-08-03",
    pdfNote: "Definite_Integrals_Shortcut_Formulae.pdf",
    timestamps: [
      { time: "05:00", title: "Property P4: Integral f(x) = f(a+b-x)" },
      { time: "20:30", title: "Symmetric Boundaries Property P7" },
      { time: "42:15", title: "Board Exam 6-Mark Question Walkthrough" }
    ],
    transcript: "Hello champions! Property 4 is the backbone of Class 12 Integration board questions. Whenever you see limits from 0 to pi/2, apply P4 immediately..."
  },
  {
    id: "lec-103",
    courseId: "c12-bst-01",
    title: "Financial Management: Capital Structure & Trading on Equity",
    subject: "Business Studies",
    classLevel: "12",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "40 mins",
    speaker: "Dr. Ananya Saiyam",
    dateAdded: "2026-08-04",
    pdfNote: "Trading_On_Equity_Case_Study_Notes.pdf",
    timestamps: [
      { time: "03:20", title: "What is Capital Structure?" },
      { time: "15:10", title: "Numerical Example of Trading on Equity (EBIT-EPS)" },
      { time: "31:00", title: "Factors Affecting Capital Structure Choice" }
    ],
    transcript: "High return on investment allows a firm to leverage debt and increase EPS for equity shareholders! Let us calculate EBIT/EPS..."
  }
];

export const INITIAL_LIVE_CLASSES = [
  {
    id: "live-201",
    title: "🔥 LIVE: Cash Flow Statement (AS-3) Operating Activities Special",
    subject: "Accounts",
    classLevel: "12",
    instructor: "CA Saiyam Gupta",
    startTime: "Today, 6:00 PM IST",
    status: "LIVE NOW",
    viewerCount: 284,
    streamUrl: "https://www.youtube.com/embed/live_stream?channel=saiyamclasses",
    bannerImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    description: "Join live to master Non-cash adjustments, Working Capital changes, and Tax provisions in Cash Flow Statement!"
  },
  {
    id: "live-202",
    title: "⚡ UPCOMING: Class 11 Accounting Equation & Double Entry Rules",
    subject: "Accounts",
    classLevel: "11",
    instructor: "CA Saiyam Gupta",
    startTime: "Tomorrow, 5:00 PM IST",
    status: "UPCOMING",
    viewerCount: 0,
    bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    description: "Foundation workshop for Class 11 beginners. Real-world business transaction journalizing."
  },
  {
    id: "live-203",
    title: "📐 UPCOMING: Class 12 Vectors & 3D Geometry 50 Most Expected Questions",
    subject: "Maths",
    classLevel: "12",
    instructor: "Prof. Rajesh Saiyam",
    startTime: "Aug 10, 7:00 PM IST",
    status: "UPCOMING",
    viewerCount: 0,
    bannerImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description: "Shortest distance between skew lines, vector projection, and plane equations solved live."
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-301",
    title: "Class 12 Accounts Handwritten Formula & Format Sheet",
    subject: "Accounts",
    classLevel: "12",
    author: "CA Saiyam Gupta",
    pages: 24,
    fileSize: "4.2 MB",
    downloads: 1420,
    tags: ["Partnership", "Forfeiture", "Ratio Analysis"],
    contentPreview: "COMPREHENSIVE ACCOUNTANCY HANDBOOK:\n1. Goodwill Valuation = Average Profit x No. of Years Purchase\n2. Super Profit = Actual Profit - Normal Profit (Capital Employed x NRR%)\n3. Sacrifice Ratio = Old Share - New Share\n4. Gaining Ratio = New Share - Old Share\n5. Journal Entry for Forfeiture of Shares:\n   Share Capital A/c ... Dr (Called-up amount)\n     To Share Forfeited A/c (Paid-up amount)\n     To Calls-in-Arrears A/c (Unpaid amount)"
  },
  {
    id: "note-302",
    title: "Class 12 Maths Formula Revision Booklet (Calculus & Vectors)",
    subject: "Maths",
    classLevel: "12",
    author: "Prof. Rajesh Saiyam",
    pages: 32,
    fileSize: "5.8 MB",
    downloads: 1890,
    tags: ["Integration", "Derivatives", "Matrices"],
    contentPreview: "MATHEMATICS CORE FORMULAE:\n• d/dx (sin x) = cos x\n• ∫ (1 / √(a² - x²)) dx = sin⁻¹(x/a) + C\n• ∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C\n• Projection of vector A on B = (A · B) / |B|\n• Shortest distance d = | (a2 - a1) · (b1 x b2) | / | b1 x b2 |"
  },
  {
    id: "note-303",
    title: "Class 12 Business Studies 50 Keyword Case Study Guide",
    subject: "Business Studies",
    classLevel: "12",
    author: "Dr. Ananya Saiyam",
    pages: 18,
    fileSize: "3.1 MB",
    downloads: 980,
    tags: ["Management", "Marketing", "Finance"],
    contentPreview: "BST CASE STUDY KEYWORDS:\n1. Management is Pervasive -> Required in all types of organizations (Commercial/Non-commercial).\n2. Scalar Chain -> Formal line of authority from highest to lowest rank.\n3. Financial Leverage -> Proportion of debt in total capital.\n4. Dematerialisation -> Converting physical share certificates into electronic format."
  },
  {
    id: "note-304",
    title: "Class 11 Financial Accounting Ledger & GST Quick Book",
    subject: "Accounts",
    classLevel: "11",
    author: "CA Saiyam Gupta",
    pages: 20,
    fileSize: "3.5 MB",
    downloads: 870,
    tags: ["GST", "Journal", "Trial Balance"],
    contentPreview: "CLASS 11 ACCOUNTANCY FUNDAMENTALS:\n• Assets = Capital + Liabilities\n• CGST & SGST applied on Intra-State Sale.\n• IGST applied on Inter-State Sale.\n• Bank Reconciliation Statement (BRS): Add cheques issued but not presented, deduct cheques deposited but not cleared."
  }
];

export const INITIAL_EBOOKS = [
  {
    id: "eb-401",
    title: "Saiyam Special Class 12 Accountancy Board Scanner (2026 Edition)",
    subject: "Accounts",
    classLevel: "12",
    author: "CA Saiyam Gupta",
    pages: 340,
    fileSize: "18.5 MB",
    rating: 4.98,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    description: "Topic-wise 10-year Solved Board Papers, Expected Numericals with Step Marking schemes, and Common Mistakes Alert."
  },
  {
    id: "eb-402",
    title: "Saiyam Class 12 Mathematics Question Bank & Exemplar Solved",
    subject: "Maths",
    classLevel: "12",
    author: "Prof. Rajesh Saiyam",
    pages: 410,
    fileSize: "22.1 MB",
    rating: 4.94,
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    description: "Contains 1200+ selected problems with detailed handwritten solutions for Board Exam top score."
  },
  {
    id: "eb-403",
    title: "Class 11 & 12 Economics Diagram & Graph Companion",
    subject: "Economics",
    classLevel: "12",
    author: "CA Saiyam Gupta",
    pages: 190,
    fileSize: "12.4 MB",
    rating: 4.90,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    description: "High-resolution economic graphs for Inflation, Deflationary Gap, Demand/Supply curves, and National Income circular flow."
  }
];

export const INITIAL_QUIZZES = [
  {
    id: "qz-501",
    title: "Class 12 Accounts: Goodwill & Revaluation Quick Test",
    subject: "Accounts",
    classLevel: "12",
    timeLimitMins: 15,
    questionsCount: 5,
    totalMarks: 20,
    questions: [
      {
        id: 1,
        question: "When a new partner brings cash for goodwill, which account is credited?",
        options: ["Revaluation A/c", "Premium for Goodwill A/c", "Capital A/c of New Partner", "Realisation A/c"],
        correctIndex: 1,
        explanation: "Cash/Bank A/c Dr. To Premium for Goodwill A/c is the correct journal entry when premium is brought in cash."
      },
      {
        id: 2,
        question: "Goodwill of the firm is valued at ₹ 1,20,000. Partner C is admitted for 1/4th share. C's share of goodwill is:",
        options: ["₹ 40,000", "₹ 30,000", "₹ 20,000", "₹ 15,000"],
        correctIndex: 1,
        explanation: "C's share = 1,20,000 x (1/4) = ₹ 30,000."
      },
      {
        id: 3,
        question: "Unrecorded liability discovered at the time of admission is shown on which side of Revaluation Account?",
        options: ["Credit Side", "Debit Side", "Asset Side of Balance Sheet only", "Not recorded"],
        correctIndex: 1,
        explanation: "Unrecorded liability increases liabilities, representing a loss for the firm, so it is debited to Revaluation Account."
      },
      {
        id: 4,
        question: "Old Ratio - New Ratio is known as:",
        options: ["Gaining Ratio", "Sacrificing Ratio", "Capital Ratio", "Equal Ratio"],
        correctIndex: 1,
        explanation: "Sacrificing Ratio = Old Share - New Share."
      },
      {
        id: 5,
        question: "If Super Profit is ₹ 20,000 and Normal Rate of Return is 10%, Goodwill by Capitalisation of Super Profit is:",
        options: ["₹ 2,00,000", "₹ 20,000", "₹ 1,00,000", "₹ 5,00,000"],
        correctIndex: 0,
        explanation: "Goodwill = Super Profit x 100 / NRR = 20,000 x 100 / 10 = ₹ 2,00,000."
      }
    ]
  },
  {
    id: "qz-502",
    title: "Class 12 Maths: Matrices & Determinants Speed Quiz",
    subject: "Maths",
    classLevel: "12",
    timeLimitMins: 10,
    questionsCount: 4,
    totalMarks: 16,
    questions: [
      {
        id: 1,
        question: "If A is a square matrix of order 3x3 such that |A| = 5, then |adj(A)| is equal to:",
        options: ["5", "25", "125", "1/5"],
        correctIndex: 1,
        explanation: "|adj(A)| = |A|^(n-1) = 5^(3-1) = 5² = 25."
      },
      {
        id: 2,
        question: "A matrix A = [a_ij] is called skew-symmetric if:",
        options: ["a_ij = a_ji", "a_ij = -a_ji", "a_ij = 0", "A = A⁻¹"],
        correctIndex: 1,
        explanation: "In a skew-symmetric matrix, A^T = -A, hence a_ij = -a_ji for all i and j."
      },
      {
        id: 3,
        question: "If A and B are invertible matrices of same order, then (AB)⁻¹ is equal to:",
        options: ["A⁻¹ B⁻¹", "B⁻¹ A⁻¹", "A B", "1 / (AB)"],
        correctIndex: 1,
        explanation: "By reversal law of matrix inverse, (AB)⁻¹ = B⁻¹ A⁻¹."
      },
      {
        id: 4,
        question: "The value of determinant of an identity matrix of order 4 is:",
        options: ["0", "1", "4", "16"],
        correctIndex: 1,
        explanation: "Determinant of any Identity matrix I is always 1."
      }
    ]
  }
];

export const INITIAL_STUDENTS = [
  { id: "std-101", name: "Aarav Sharma", classLevel: "12", batch: "Batch 12-A (Morning)", email: "aarav@gmail.com", enrolledCourses: ["c12-acc-01", "c12-math-01"], attendance: "96%", scoreAvg: "94%" },
  { id: "std-102", name: "Riya Verma", classLevel: "12", batch: "Batch 12-B (Evening)", email: "riya.v@gmail.com", enrolledCourses: ["c12-acc-01", "c12-bst-01", "c12-eco-01"], attendance: "92%", scoreAvg: "89%" },
  { id: "std-103", name: "Kabir Mehta", classLevel: "11", batch: "Batch 11-A (Morning)", email: "kabir.m@gmail.com", enrolledCourses: ["c11-acc-01", "c11-math-01"], attendance: "98%", scoreAvg: "96%" },
  { id: "std-104", name: "Ananya Singhania", classLevel: "11", batch: "Batch 11-A (Morning)", email: "ananya.s@gmail.com", enrolledCourses: ["c11-acc-01"], attendance: "94%", scoreAvg: "91%" }
];

export const INITIAL_TEACHERS = [
  { id: "tch-201", name: "CA Saiyam Gupta", subject: "Accounts & Economics", classesHandled: "Class 11 & 12", email: "saiyam@saiyamclasses.edu", status: "Active Lead Faculty" },
  { id: "tch-202", name: "Prof. Rajesh Saiyam", subject: "Mathematics", classesHandled: "Class 11 & 12", email: "rajesh@saiyamclasses.edu", status: "Active Senior Faculty" },
  { id: "tch-203", name: "Dr. Ananya Saiyam", subject: "Business Studies", classesHandled: "Class 12", email: "ananya@saiyamclasses.edu", status: "Active Faculty" }
];

export const INITIAL_ANNOUNCEMENTS = [
  { id: "anc-1", title: "🎉 Special Board Exam Revision Test Series Starting Next Monday!", date: "2026-08-08", category: "Test Series", content: "All Class 12 students are instructed to attempt the live full-length mock test on Accounts and Mathematics. Schedule has been emailed." },
  { id: "anc-2", title: "📘 Class 11 New GST & Trial Balance Notes Uploaded", date: "2026-08-07", category: "Notes Update", content: "Check the Resources section for updated handwritten notes by CA Saiyam Gupta with 2026 solved examples." }
];
