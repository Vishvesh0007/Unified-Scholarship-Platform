// ═══════════════════════════════════════════════════════════════════
// MOCK DATA LAYER — Unified Scholarship Platform
// Prototype uses simulated data. Production requires authorized
// government APIs (NSP, MoTA, DigiLocker, DBT/PFMS).
// ═══════════════════════════════════════════════════════════════════

// ─── Connected Government Portals ───
export const portals = [
  { name: "National Scholarship Portal", tag: "NSP · Applications", href: "https://scholarships.gov.in/home", icon: "🏛️" },
  { name: "Ministry of Tribal Affairs", tag: "MoTA · Schemes", href: "https://tribal.nic.in/Home.aspx", icon: "🏢" },
  { name: "DigiLocker", tag: "Document Verification", href: "https://digilocker.gov.in", icon: "🔒" },
  { name: "DBT Tribal", tag: "DBT / PFMS · Payments", href: "https://dbttribal.gov.in/MainHomePage.aspx", icon: "💰" },
  { name: "National Overseas Scholarship", tag: "Study Abroad", href: "https://overseas.tribal.gov.in/AboutUs.aspx", icon: "✈️" },
  { name: "National Fellowship", tag: "M.Phil / Ph.D.", href: "https://fellowship.tribal.gov.in/AboutUs.aspx", icon: "🎓" },
];

// ─── Scholarship Schemes ───
export interface Scheme {
  id: string;
  name: string;
  source: string;
  level: string;
  maxIncome: number | null;
  minLevel: string;
  deadline: string;
  amount: string;
  description: string;
  documents: string[];
  category: string;
  state: string;
  type: string;
}

export const schemes: Scheme[] = [
  {
    id: "nfst",
    name: "National Fellowship for ST Students",
    source: "MoTA",
    level: "M.Phil / Ph.D.",
    maxIncome: null,
    minLevel: "phd",
    deadline: "31 Dec 2026",
    amount: "₹31,000 / month",
    description: "Fellowship for Scheduled Tribe students pursuing M.Phil and Ph.D. programmes in universities, research institutions and scientific institutions.",
    documents: ["Aadhaar", "Caste Certificate", "Admission Proof", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Fellowship",
  },
  {
    id: "nos",
    name: "National Overseas Scholarship",
    source: "MoTA",
    level: "Postgraduate Abroad",
    maxIncome: 600000,
    minLevel: "pg",
    deadline: "15 Nov 2026",
    amount: "Full Tuition + Living",
    description: "Scholarship for ST students to pursue Masters and Ph.D. level courses abroad in accredited institutions.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Admission Letter", "Passport", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Overseas",
  },
  {
    id: "pm",
    name: "Post-matric Scholarship for ST",
    source: "NSP",
    level: "Class 11 and Above",
    maxIncome: 250000,
    minLevel: "ug",
    deadline: "15 Oct 2026",
    amount: "₹50,000 / year",
    description: "Financial assistance to Scheduled Tribe students studying at post-matriculation or post-secondary stage to enable them to complete their education.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Marksheet", "Bonafide Certificate", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Scholarship",
  },
  {
    id: "pre",
    name: "Pre-matric Scholarship for ST",
    source: "NSP",
    level: "Class 9 and 10",
    maxIncome: 250000,
    minLevel: "school",
    deadline: "15 Oct 2026",
    amount: "₹6,000 / year",
    description: "Financial assistance for ST students in Class 9 and 10 to reduce dropouts at pre-matric level.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Marksheet", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Scholarship",
  },
  {
    id: "tribal_higher",
    name: "Tribal Higher Education Scheme",
    source: "State Govt",
    level: "Undergraduate",
    maxIncome: 300000,
    minLevel: "ug",
    deadline: "30 Nov 2026",
    amount: "₹35,000 / year",
    description: "State-level scholarship for tribal students pursuing higher education in recognised institutions within the state.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Bonafide Certificate", "Bank Details"],
    category: "ST",
    state: "Maharashtra",
    type: "Scholarship",
  },
  {
    id: "topclass",
    name: "Top Class Education for ST",
    source: "MoTA",
    level: "Undergraduate / Postgraduate",
    maxIncome: 600000,
    minLevel: "ug",
    deadline: "31 Jan 2027",
    amount: "Full Tuition",
    description: "Full scholarship for ST students admitted to premier institutions like IITs, IIMs, NITs, AIIMS, and other notified institutes.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Admission Proof", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Scholarship",
  },
  {
    id: "vocational",
    name: "Vocational Training for Tribal Youth",
    source: "MoTA",
    level: "ITI / Diploma",
    maxIncome: 200000,
    minLevel: "school",
    deadline: "28 Feb 2027",
    amount: "₹20,000 / year",
    description: "Support for tribal youth pursuing vocational and skill development training at recognized institutions.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Admission Proof", "Bank Details"],
    category: "ST",
    state: "All India",
    type: "Training",
  },
  {
    id: "hostelfund",
    name: "Hostel Maintenance Allowance",
    source: "State Govt",
    level: "Class 9 and Above",
    maxIncome: 250000,
    minLevel: "school",
    deadline: "30 Sep 2026",
    amount: "₹12,000 / year",
    description: "Maintenance allowance for ST students staying in hostels while pursuing education at recognised institutions.",
    documents: ["Aadhaar", "Caste Certificate", "Income Certificate", "Hostel Proof", "Bank Details"],
    category: "ST",
    state: "Rajasthan",
    type: "Allowance",
  },
];

// ─── Eligibility Engine ───
const levelOrder = ["school", "ug", "pg", "phd"];

export interface EligibilityResult extends Scheme {
  eligible: boolean;
  matchScore: number;
  reason: string;
  criteria: { label: string; matched: boolean; detail: string }[];
}

export function checkEligibility(profile: {
  income: number;
  level: string;
  state?: string;
  category?: string;
}): EligibilityResult[] {
  return schemes
    .map((s) => {
      const levelOk =
        s.id === "pre"
          ? profile.level === "school"
          : levelOrder.indexOf(profile.level) >= levelOrder.indexOf(s.minLevel) &&
            !(s.id === "pm" && profile.level === "phd");
      const incomeOk = s.maxIncome == null || profile.income <= s.maxIncome;
      const stateOk = s.state === "All India" || s.state === (profile.state || "All India");
      const categoryOk = !profile.category || s.category === profile.category || s.category === "All";

      const criteria = [
        { label: "Course Level", matched: levelOk, detail: levelOk ? `${s.level} eligible` : "Course level does not match" },
        { label: "Family Income", matched: incomeOk, detail: incomeOk ? (s.maxIncome ? `Within ₹${(s.maxIncome / 100000).toFixed(1)}L limit` : "No income limit") : `Income exceeds ₹${((s.maxIncome || 0) / 100000).toFixed(1)}L limit` },
        { label: "State", matched: stateOk, detail: stateOk ? s.state : `Available in ${s.state} only` },
        { label: "Category", matched: categoryOk, detail: categoryOk ? `${s.category} eligible` : "Category mismatch" },
      ];

      const matchedCount = criteria.filter((c) => c.matched).length;
      const matchScore = Math.round((matchedCount / criteria.length) * 100);
      const eligible = levelOk && incomeOk && stateOk && categoryOk;
      const reason = !levelOk ? "Course level does not match" : !incomeOk ? "Family income above limit" : !stateOk ? "State not eligible" : !categoryOk ? "Category mismatch" : "Meets all listed rules";

      return { ...s, eligible, matchScore, reason, criteria };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ─── Student Profile ───
export const studentProfile = {
  name: "Rahul Kumar",
  dob: "2002-05-15",
  gender: "Male",
  state: "Maharashtra",
  district: "Pune",
  category: "ST",
  subCategory: "Bhil",
  aadhaar: "•••• •••• 8912",
  familyIncome: 180000,
  educationLevel: "ug",
  institute: "Savitribai Phule Pune University",
  course: "B.Sc. Computer Science",
  year: "2nd Year",
  academicScore: "78%",
  aadhaarLinked: true,
  bankLinked: true,
  profileCompletion: 85,
  joinedDate: "12 Sep 2026",
};

// ─── Documents ───
export interface Document {
  id: string;
  name: string;
  category: string;
  status: "verified" | "uploaded" | "pending" | "missing";
  uploadDate?: string;
  verificationDate?: string;
  source?: string;
  required: boolean;
}

export const documents: Document[] = [
  { id: "aadhaar", name: "Aadhaar Card", category: "Identity", status: "verified", uploadDate: "10 Sep 2026", verificationDate: "10 Sep 2026", source: "DigiLocker", required: true },
  { id: "caste", name: "Caste/Community Certificate", category: "Category", status: "verified", uploadDate: "11 Sep 2026", verificationDate: "12 Sep 2026", source: "Manual Upload", required: true },
  { id: "income", name: "Income Certificate", category: "Financial", status: "uploaded", uploadDate: "12 Sep 2026", source: "Manual Upload", required: true },
  { id: "marksheet", name: "Previous Marksheet", category: "Education", status: "verified", uploadDate: "11 Sep 2026", verificationDate: "13 Sep 2026", source: "DigiLocker", required: true },
  { id: "bonafide", name: "Bonafide Certificate", category: "Education", status: "uploaded", uploadDate: "13 Sep 2026", source: "Manual Upload", required: true },
  { id: "bank", name: "Bank Account Details", category: "Financial", status: "verified", uploadDate: "10 Sep 2026", verificationDate: "10 Sep 2026", source: "DBT Link", required: true },
  { id: "photo", name: "Passport Photo", category: "Identity", status: "uploaded", uploadDate: "10 Sep 2026", source: "Manual Upload", required: false },
  { id: "domicile", name: "Domicile Certificate", category: "Identity", status: "missing", required: false },
];

// ─── Application Timeline ───
export interface TimelineStep {
  key: string;
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
  description?: string;
}

export const applicationTimeline: TimelineStep[] = [
  { key: "PROFILE", label: "Profile Created", date: "12 Sep 2026", done: true, description: "Profile setup completed with all required information." },
  { key: "DOCS", label: "Documents Uploaded", date: "13 Sep 2026", done: true, description: "All required documents submitted to the document wallet." },
  { key: "APPLIED", label: "Application Submitted", date: "14 Sep 2026", done: true, description: "Post-matric Scholarship application submitted via USP." },
  { key: "INST_VERIFY", label: "Institute Verification", date: "16 Sep 2026", done: true, description: "Verified by Savitribai Phule Pune University." },
  { key: "DIST_VERIFY", label: "District Verification", done: false, current: true, description: "Application under review at District Welfare Office." },
  { key: "APPROVAL", label: "Ministry Approval", done: false, description: "Final approval from Ministry of Tribal Affairs." },
  { key: "DBT", label: "DBT Processing", done: false, description: "Direct Benefit Transfer to linked bank account." },
  { key: "DISBURSED", label: "Scholarship Disbursed", done: false, description: "Funds credited to your bank account." },
];

// ─── Student Applications ───
export interface Application {
  id: string;
  schemeName: string;
  schemeId: string;
  status: "submitted" | "under_review" | "verified" | "approved" | "rejected" | "disbursed";
  appliedDate: string;
  lastUpdate: string;
  amount: string;
  currentStep: string;
}

export const studentApplications: Application[] = [
  { id: "USP-2026-001042", schemeName: "Post-matric Scholarship for ST", schemeId: "pm", status: "under_review", appliedDate: "14 Sep 2026", lastUpdate: "28 Sep 2026", amount: "₹50,000", currentStep: "District Verification" },
  { id: "USP-2026-001043", schemeName: "Top Class Education for ST", schemeId: "topclass", status: "submitted", appliedDate: "20 Sep 2026", lastUpdate: "20 Sep 2026", amount: "Full Tuition", currentStep: "Institute Verification" },
  { id: "USP-2026-001044", schemeName: "Hostel Maintenance Allowance", schemeId: "hostelfund", status: "approved", appliedDate: "01 Aug 2026", lastUpdate: "25 Sep 2026", amount: "₹12,000", currentStep: "DBT Processing" },
];

// ─── Institute Verification Queue ───
export interface VerificationItem {
  id: string;
  studentName: string;
  scheme: string;
  rawStatus: string;
  submittedDate: string;
  documents: number;
  issues: number;
  priority: "high" | "normal" | "low";
}

export const verificationQueue: VerificationItem[] = [
  { id: "A-1042", studentName: "Rahul Kumar", scheme: "Post-matric Scholarship", rawStatus: "Institute Verified", submittedDate: "14 Sep 2026", documents: 6, issues: 0, priority: "normal" },
  { id: "A-1043", studentName: "Priya Meena", scheme: "National Fellowship", rawStatus: "Pending Review", submittedDate: "15 Sep 2026", documents: 5, issues: 0, priority: "high" },
  { id: "A-1044", studentName: "Amit Bhil", scheme: "Overseas Scholarship", rawStatus: "IV", submittedDate: "16 Sep 2026", documents: 8, issues: 1, priority: "normal" },
  { id: "A-1045", studentName: "Neha Gond", scheme: "Post-matric Scholarship", rawStatus: "Doc mismatch", submittedDate: "17 Sep 2026", documents: 5, issues: 2, priority: "high" },
  { id: "A-1046", studentName: "Suresh Munda", scheme: "Top Class Education", rawStatus: "Verified", submittedDate: "18 Sep 2026", documents: 6, issues: 0, priority: "low" },
  { id: "A-1047", studentName: "Kavita Oraon", scheme: "Post-matric Scholarship", rawStatus: "Pending Review", submittedDate: "19 Sep 2026", documents: 6, issues: 1, priority: "normal" },
  { id: "A-1048", studentName: "Ravi Santhal", scheme: "Tribal Higher Education", rawStatus: "Institute Verified", submittedDate: "20 Sep 2026", documents: 5, issues: 0, priority: "low" },
  { id: "A-1049", studentName: "Anita Warli", scheme: "Vocational Training", rawStatus: "Doc mismatch", submittedDate: "21 Sep 2026", documents: 4, issues: 3, priority: "high" },
];

// ─── Adapter Layer: Normalize Status ───
export function normalizeStatus(raw: string): string {
  const r = raw.toLowerCase();
  if (["verified", "institute verified", "iv"].includes(r)) return "VERIFIED";
  if (["pending review", "pending"].includes(r)) return "PENDING";
  if (["doc mismatch", "document mismatch", "exception"].includes(r)) return "NEEDS_REVIEW";
  if (["approved", "sanctioned"].includes(r)) return "APPROVED";
  if (["rejected", "cancelled"].includes(r)) return "REJECTED";
  return "NEEDS_REVIEW";
}

// ─── Coverage Data (District Analytics) ───
export const coverageData = [
  { district: "Pune", totalEligible: 12400, applied: 10168, verified: 8240, disbursed: 7440, pct: 82, pendingRate: 18 },
  { district: "Nashik", totalEligible: 8200, applied: 5248, verified: 4020, disbursed: 3280, pct: 64, pendingRate: 36 },
  { district: "Thane", totalEligible: 15600, applied: 6396, verified: 4680, disbursed: 3120, pct: 41, pendingRate: 59 },
  { district: "Nagpur", totalEligible: 9800, applied: 2646, verified: 1960, disbursed: 1372, pct: 27, pendingRate: 73 },
  { district: "Aurangabad", totalEligible: 7400, applied: 5328, verified: 4440, disbursed: 3848, pct: 72, pendingRate: 28 },
  { district: "Kolhapur", totalEligible: 5600, applied: 3136, verified: 2240, disbursed: 1960, pct: 56, pendingRate: 44 },
];

// ─── Institute Stats ───
export const instituteStats = {
  totalApplications: 1248,
  pendingVerification: 86,
  verified: 1104,
  exceptions: 58,
  approvalRate: 88.5,
  avgProcessingDays: 4.2,
};

// ─── District Stats ───
export const districtStats = {
  totalApplications: 24582,
  verified: 19420,
  pending: 3821,
  exceptions: 1341,
  totalDisbursed: "₹48.2 Cr",
  coverageRate: 67.4,
};

// ─── Ministry / National Stats ───
export const nationalStats = {
  totalStudents: "4.2M",
  totalApplications: "2.8M",
  verified: "2.1M",
  disbursed: "1.7M",
  totalAmount: "₹8,420 Cr",
  activeSchemes: 24,
  coveringStates: 28,
  institutions: 12400,
};

// ─── Chart Data ───
export const monthlyApplications = [
  { month: "Apr", applications: 42000, verified: 35000, disbursed: 28000 },
  { month: "May", applications: 58000, verified: 48000, disbursed: 38000 },
  { month: "Jun", applications: 72000, verified: 58000, disbursed: 45000 },
  { month: "Jul", applications: 95000, verified: 78000, disbursed: 62000 },
  { month: "Aug", applications: 128000, verified: 105000, disbursed: 85000 },
  { month: "Sep", applications: 156000, verified: 128000, disbursed: 98000 },
];

export const schemeWiseData = [
  { name: "Post-matric ST", value: 850000, fill: "#1a365d" },
  { name: "Pre-matric ST", value: 620000, fill: "#2d4a7c" },
  { name: "Top Class", value: 180000, fill: "#d97706" },
  { name: "National Fellowship", value: 95000, fill: "#16a34a" },
  { name: "Overseas", value: 12000, fill: "#64748b" },
  { name: "Others", value: 43000, fill: "#94a3b8" },
];

export const stateWiseApprovals = [
  { state: "Maharashtra", applications: 320000, approved: 264000, rate: 82.5 },
  { state: "Madhya Pradesh", applications: 280000, approved: 218000, rate: 77.9 },
  { state: "Odisha", applications: 245000, approved: 196000, rate: 80.0 },
  { state: "Jharkhand", applications: 210000, approved: 164000, rate: 78.1 },
  { state: "Chhattisgarh", applications: 195000, approved: 156000, rate: 80.0 },
  { state: "Rajasthan", applications: 175000, approved: 140000, rate: 80.0 },
  { state: "Gujarat", applications: 165000, approved: 136000, rate: 82.4 },
  { state: "Assam", applications: 142000, approved: 108000, rate: 76.1 },
];

export const verificationBottlenecks = [
  { stage: "Document Check", pending: 42000, avgDays: 3.2 },
  { stage: "Institute Verify", pending: 28000, avgDays: 5.8 },
  { stage: "District Verify", pending: 18000, avgDays: 8.4 },
  { stage: "State Approval", pending: 12000, avgDays: 12.1 },
  { stage: "Ministry Sanction", pending: 8000, avgDays: 15.6 },
  { stage: "DBT Processing", pending: 6000, avgDays: 4.2 },
];

// ─── JAGO AI Assistant ───
export function jagoReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("document") || s.includes("upload"))
    return "Add your documents once in the Document Wallet. They are reused for every scheme application. Aadhaar and Marksheets can be fetched directly from DigiLocker — no manual upload needed.";
  if (s.includes("eligib") || s.includes("qualify") || s.includes("scheme"))
    return "Go to 'Discover Scholarships' in your dashboard. Enter your course level and family income, and the Eligibility Engine will list all schemes you match with detailed criteria breakdown.";
  if (s.includes("status") || s.includes("track") || s.includes("where"))
    return "Your Application Timeline shows the current stage — from submission through verification to DBT disbursement. All portal statuses are normalized to one plain timeline.";
  if (s.includes("payment") || s.includes("dbt") || s.includes("money") || s.includes("amount"))
    return "Once approved, your scholarship amount is processed through Direct Benefit Transfer (DBT) via PFMS. It goes directly to your linked bank account. Track it under 'DBT Status' in your dashboard.";
  if (s.includes("offline") || s.includes("internet") || s.includes("network"))
    return "USP works offline! Your application data is saved locally via IndexedDB. When internet returns, everything syncs automatically. You can fill forms, view documents, and check saved data without connectivity.";
  if (s.includes("verify") || s.includes("verification"))
    return "Verification happens in stages: Institute → District → State/Ministry. Each level checks your documents and eligibility. You can see exactly which stage you're at in the Application Timeline.";
  if (s.includes("deadline") || s.includes("date") || s.includes("last date"))
    return "Each scholarship has its own deadline. Check the 'Discover Scholarships' page for deadline information. I recommend applying at least 2 weeks before the deadline to allow time for verification.";
  if (s.includes("hello") || s.includes("hi") || s.includes("hey"))
    return "Hello! I'm JAGO, your AI scholarship assistant. I can help you with:\n• Finding eligible scholarships\n• Understanding document requirements\n• Tracking your application status\n• Explaining the verification process\n\nWhat would you like to know?";
  return "I can help with eligibility, documents, application status, payments, offline access, and verification. In production, my answers come from the official scheme knowledge base via RAG, not generic AI responses. What specifically would you like to know?";
}

// ─── Notifications ───
export const notifications = [
  { id: 1, title: "District verification started", description: "Your Post-matric Scholarship application is now being reviewed by the District Welfare Office.", time: "2 hours ago", read: false, type: "info" as const },
  { id: 2, title: "Document verified", description: "Your Income Certificate has been verified successfully.", time: "1 day ago", read: false, type: "success" as const },
  { id: 3, title: "New scheme available", description: "Top Class Education scheme deadline extended to 31 Jan 2027.", time: "2 days ago", read: true, type: "info" as const },
  { id: 4, title: "Application approved", description: "Hostel Maintenance Allowance has been approved. DBT processing initiated.", time: "5 days ago", read: true, type: "success" as const },
  { id: 5, title: "Action required", description: "Please upload Domicile Certificate for National Overseas Scholarship.", time: "1 week ago", read: true, type: "warning" as const },
];
