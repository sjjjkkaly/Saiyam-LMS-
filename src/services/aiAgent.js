// SaiyamAI Commerce & Mathematics Tutor Engine (Class 11 & Class 12)

export function generateAIResponse(userPrompt, activeSubject = "All", activeClass = "12") {
  const query = userPrompt.toLowerCase().trim();

  // 1. Numerical / Calculation / Step-by-Step Solver
  if (query.includes("goodwill") || query.includes("super profit") || query.includes("valuation")) {
    return {
      type: "explanation",
      subject: "Accounts",
      title: "Goodwill Valuation - Step-by-Step Solution & Rules",
      content: `### 📊 Accountancy Step-by-Step Solution: Goodwill Valuation

**Formulae Overview:**
1. **Average Profit Method:**
   $$\\text{Goodwill} = \\text{Adjusted Average Profit} \\times \\text{No. of Years' Purchase}$$
2. **Super Profit Method:**
   $$\\text{Super Profit} = \\text{Actual/Average Profit} - \\text{Normal Profit}$$
   $$\\text{Normal Profit} = \\text{Capital Employed} \\times \\frac{\\text{Normal Rate of Return (NRR)}}{100}$$
   $$\\text{Goodwill} = \\text{Super Profit} \\times \\text{No. of Years' Purchase}$$

**Example Board Numerical:**
*Given:* Average Profit = ₹ 80,000; Capital Employed = ₹ 5,00,000; NRR = 10%; No. of Years Purchase = 3.
1. **Normal Profit** = $5,00,000 \\times 10\\% = ₹ 50,000$
2. **Super Profit** = ₹ $80,000 - ₹ 50,000 = ₹ 30,000$
3. **Goodwill** = ₹ $30,000 \\times 3 = \\mathbf{₹ 90,000}$`
    };
  }

  if (query.includes("integrate") || query.includes("integration") || query.includes("calculus") || query.includes("derivative")) {
    return {
      type: "math_solver",
      subject: "Maths",
      title: "Class 12 Integration & Calculus Step-by-Step Guidance",
      content: `### 📐 Mathematics Calculus Step-by-Step Solution

**Core Integration Property (NCERT Ex 7.11):**
$$\\int_{a}^{b} f(x) dx = \\int_{a}^{b} f(a+b-x) dx$$

**Step-by-Step Example Problem:**
Evaluate $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$

1. **Step 1:** Let $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$  --- (Equation 1)
2. **Step 2:** Apply Property $P_4$: Replace $x$ with $(\\pi/2 - x)$:
   $$I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin(\\pi/2 - x)}}{\\sqrt{\\sin(\\pi/2 - x)} + \\sqrt{\\cos(\\pi/2 - x)}} dx$$
   $$I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}} dx$  --- (Equation 2)
3. **Step 3:** Add Equation (1) and (2):
   $$2I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x} + \\sqrt{\\cos x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx = \\int_{0}^{\\pi/2} 1 \\, dx = [x]_{0}^{\\pi/2} = \\frac{\\pi}{2}$$
4. **Step 4:** $I = \\mathbf{\\frac{\\pi}{4}}$ ✨`
    };
  }

  if (query.includes("study plan") || query.includes("timetable") || query.includes("strategy") || query.includes("routine")) {
    return {
      type: "study_plan",
      subject: "General",
      title: "Class 11/12 Board Exam 95%+ Mastery Study Blueprint",
      content: `### 📅 Saiyam Classes 4-Week Board Exam Mastery Schedule

**Daily Routine (4-5 Hours Dedicated Self Study):**
* **Morning (6:00 AM - 7:30 AM):** High Focus Subject (Maths Calculus / Accounts Numericals) - Solve 15 problems daily.
* **Afternoon (3:30 PM - 5:00 PM):** Theory & Case Studies (Business Studies / Economics Graphs).
* **Evening (7:00 PM - 8:30 PM):** Saiyam Live Classes & Doubt Resolution with SaiyamAI.
* **Night (10:00 PM - 10:30 PM):** Quick Formula & Journal Entry flashcard revision before sleep.

**Subject Focus Breakdown:**
- **Accounts:** 30% Theory, 70% Numericals (Forfeiture, Cash Flow, Partnership Revaluation).
- **Maths:** Daily 20 solved questions from NCERT + Exemplar.
- **BST:** Practice identifying keywords in 5 case studies daily.
- **Economics:** Draw National Income flowcharts & Foreign Exchange demand-supply curves by hand!`
    };
  }

  if (query.includes("case study") || query.includes("management") || query.includes("marketing") || query.includes("delegation")) {
    return {
      type: "bst_concept",
      subject: "Business Studies",
      title: "Business Studies Case Study Technique & Principles",
      content: `### 💼 Business Studies Case Study Breakdown

**3-Step Method to Solve Any BST Board Case Study:**
1. **Read the Last Line First:** Identify what the examiner is asking (e.g., "Identify the principle of management violated above").
2. **Scan for Trigger Keywords:**
   - *Harmonious relationship between workers and management* $\\rightarrow$ Harmony, Not Discord (Taylor).
   - *One subordinate taking orders from only one superior* $\\rightarrow$ Unity of Command (Fayol).
   - *Transferring authority to lower levels* $\\rightarrow$ Decentralisation / Delegation.
3. **Draft the Answer Structure:**
   - State the **Name of Principle / Concept** clearly in bold.
   - Quote the **Exact Line from Paragraph**.
   - State **2 Positive Effects & 2 Consequences of Violation**.`
    };
  }

  if (query.includes("national income") || query.includes("macroeconomics") || query.includes("gdp") || query.includes("gva")) {
    return {
      type: "eco_concept",
      subject: "Economics",
      title: "Economics: National Income Aggregates Simplified",
      content: `### 📈 Macroeconomics: National Income Conversion Matrix

**Golden Conversion Rules:**
1. **Gross $\\leftrightarrow$ Net:** $\\text{Gross} - \\text{Depreciation (Consumption of Fixed Capital)} = \\text{Net}$
2. **National $\\leftrightarrow$ Domestic:** $\\text{Domestic} + \\text{NFIA (Net Factor Income from Abroad)} = \\text{National}$
3. **Market Price (MP) $\\leftrightarrow$ Factor Cost (FC):** $\\text{Factor Cost} + \\text{NIT (Net Indirect Taxes)} = \\text{Market Price}$
   *(Where $\\text{NIT} = \\text{Indirect Taxes} - \\text{Subsidies}$)*

**3 Methods of Calculating National Income ($NNP_{FC}$):**
* **Value Added Method:** $GVA_{MP} = \\text{Value of Output} - \\text{Intermediate Consumption}$
* **Income Method:** $NDP_{FC} = \\text{Compensation of Employees} + \\text{Operating Surplus} + \\text{Mixed Income}$
* **Expenditure Method:** $GDP_{MP} = C + I + G + (X - M)$`
    };
  }

  // Default fallback response tailored to Saiyam Classes
  return {
    type: "general",
    subject: activeSubject,
    title: `SaiyamAI Response for Class ${activeClass} ${activeSubject !== "All" ? activeSubject : "Commerce & Maths"}`,
    content: `### 🤖 SaiyamAI Assistant Answer

Hello! As your dedicated **Saiyam Classes AI Tutor**, I have analyzed your question regarding **"${userPrompt}"**.

Here is your detailed academic guidance:
* **Subject Context:** Class ${activeClass} ${activeSubject !== "All" ? activeSubject : "Commerce & Mathematics"}.
* **Key Concept:** Make sure to follow NCERT guidelines and CA Saiyam Gupta's structured step marking rules.
* **Suggested Action:**
  1. Review Chapter Video Lectures in the **Lectures tab**.
  2. Download **Handwritten Topper Notes** from Resources.
  3. Attempt a 5-minute **Quick Quiz** to test your formula retention.

*Ask me to solve any calculation, generate practice questions, or explain any journal entry / derivative formula!*`
  };
}
