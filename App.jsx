import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════ */
const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');`;

const styles = `
  ${GOOGLE_FONTS}
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { font-family:'DM Sans',sans-serif; background:#0A0A14; color:#E8E8F0; }
  ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#1A1A2E} ::-webkit-scrollbar-thumb{background:#FF6B00;border-radius:3px}

  .btn-primary{background:linear-gradient(135deg,#FF6B00,#FF9500);color:#fff;border:none;padding:11px 24px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;transition:all .2s;font-size:14px;letter-spacing:.2px}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(255,107,0,.45)}
  .btn-primary:active{transform:translateY(0)}
  .btn-secondary{background:transparent;color:#FF6B00;border:1.5px solid #FF6B00;padding:11px 24px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;transition:all .2s;font-size:14px}
  .btn-secondary:hover{background:rgba(255,107,0,.1)}
  .btn-ghost{background:rgba(255,255,255,.05);color:#E8E8F0;border:1px solid rgba(255,255,255,.08);padding:9px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s;font-size:13px}
  .btn-ghost:hover{background:rgba(255,255,255,.09);border-color:rgba(255,107,0,.3)}

  .input-field{width:100%;background:#1A2440;border:1.5px solid #243154;color:#E8E8F0;padding:13px 16px;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:14px;transition:border-color .2s;outline:none}
  .input-field:focus{border-color:#FF6B00;background:#1E2A4A}
  .input-field::placeholder{color:#5A6580}
  select.input-field option{background:#1A2440}

  .card{background:#131929;border-radius:16px;border:1px solid #1A2440;transition:all .22s}
  .card:hover{border-color:rgba(255,107,0,.28);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .card-static{background:#131929;border-radius:16px;border:1px solid #1A2440}

  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.4px}
  .badge-orange{background:rgba(255,107,0,.18);color:#FF6B00}
  .badge-green{background:rgba(0,212,170,.13);color:#00D4AA}
  .badge-blue{background:rgba(74,144,226,.15);color:#4A90E2}
  .badge-gold{background:rgba(255,215,0,.13);color:#FFD700}
  .badge-red{background:rgba(233,69,96,.15);color:#E94560}

  .nav-btn{color:#8892A4;cursor:pointer;padding:8px 14px;border-radius:8px;transition:all .2s;font-size:14px;font-weight:500;border:none;background:none;font-family:'DM Sans',sans-serif}
  .nav-btn:hover{color:#FF6B00;background:rgba(255,107,0,.07)}
  .nav-btn.active{color:#FF6B00;background:rgba(255,107,0,.1);font-weight:600}

  .tab-btn{padding:9px 20px;border-radius:9px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}
  .tab-btn.active{background:#FF6B00;color:#fff;box-shadow:0 4px 14px rgba(255,107,0,.35)}
  .tab-btn:not(.active){background:transparent;color:#8892A4}
  .tab-btn:not(.active):hover{color:#E8E8F0;background:rgba(255,255,255,.05)}

  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @media print { body { display: none !important; } }
  @keyframes splashFade{0%{opacity:1;transform:scale(1)}85%{opacity:1;transform:scale(1.04)}100%{opacity:0;transform:scale(1.08)}}
  @keyframes splashLogo{0%{opacity:0;transform:translateY(30px) scale(.8)}40%{opacity:1;transform:translateY(0) scale(1)}85%{opacity:1}100%{opacity:0}}
  @keyframes splashText{0%,20%{opacity:0;transform:translateY(12px)}50%{opacity:1;transform:translateY(0)}85%{opacity:1}100%{opacity:0}}
  @keyframes splashBar{0%,30%{width:0}85%{width:70%}100%{width:70%}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideRight{from{transform:translateX(-18px);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
  @keyframes typingDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
  @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
  @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(255,107,0,.4)}50%{box-shadow:0 0 20px rgba(255,107,0,.8)}}

  .fade-up{animation:fadeUp .4s ease both}
  .fade-in{animation:fadeIn .3s ease both}
  .pop-in{animation:popIn .3s cubic-bezier(.175,.885,.32,1.275) both}

  .ai-bubble{background:linear-gradient(135deg,#1A2440,#141E34);border:1px solid rgba(255,107,0,.18);border-radius:14px 14px 14px 4px;padding:14px 18px;max-width:82%;font-size:13.5px;line-height:1.65;color:#E8E8F0}
  .user-bubble{background:linear-gradient(135deg,#FF6B00,#FF9500);border-radius:14px 14px 4px 14px;padding:12px 16px;max-width:72%;font-size:13.5px;color:#fff;align-self:flex-end}

  .progress-bar{height:6px;background:#1A2440;border-radius:4px;overflow:hidden}
  .progress-fill{height:100%;background:linear-gradient(90deg,#FF6B00,#FF9500);border-radius:4px;transition:width 1.2s ease}

  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:2000;animation:fadeIn .2s ease;padding:16px 0}
  .modal-box{background:#131929;border-radius:22px;border:1px solid #243154;padding:24px;width:92%;max-width:460px;max-height:88vh;overflow-y:auto;animation:popIn .3s ease}

  .typing-dot{width:7px;height:7px;background:#FF6B00;border-radius:50%;display:inline-block;animation:typingDot 1.2s infinite}
  .typing-dot:nth-child(2){animation-delay:.2s}
  .typing-dot:nth-child(3){animation-delay:.4s}

  .video-placeholder{width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#131929,#0A0A14);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;position:relative;overflow:hidden;border:2px dashed #243154;transition:border-color .2s}
  .video-placeholder:hover{border-color:rgba(255,107,0,.4)}

  .notification-dot{width:8px;height:8px;background:#E94560;border-radius:50%;position:absolute;top:-2px;right:-2px;animation:pulse 2s infinite}

  .search-bar{display:flex;align-items:center;gap:10px;background:#131929;border:1.5px solid #1A2440;border-radius:12px;padding:10px 16px;transition:border-color .2s}
  .search-bar:focus-within{border-color:#FF6B00}
  .search-bar input{background:none;border:none;outline:none;color:#E8E8F0;font-family:'DM Sans',sans-serif;font-size:14px;flex:1}
  .search-bar input::placeholder{color:#5A6580}

  .leaderboard-row{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:11px;transition:background .2s}
  .leaderboard-row:hover{background:rgba(255,255,255,.04)}

  .toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1A2440;border:1px solid rgba(255,107,0,.3);color:#E8E8F0;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:500;z-index:3000;animation:popIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,.4)}
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const CLASSES_DATA = [
  { id: "jee", name: "JEE Main & Advanced", icon: "⚛️", subjects: ["Physics", "Chemistry", "Maths"], color: "#4A90E2" },
  { id: "neet", name: "NEET UG", icon: "🧬", subjects: ["Physics", "Chemistry", "Biology"], color: "#E94560" },
  { id: 12, name: "Class 12", icon: "📘", subjects: ["Physics", "Chemistry", "Maths", "Biology"], color: "#FF6B00" },
  { id: 11, name: "Class 11", icon: "📗", subjects: ["Physics", "Chemistry", "Maths", "Biology"], color: "#00D4AA" },
  { id: "cuet", name: "CUET", icon: "📝", subjects: ["Maths", "English", "GK", "Science"], color: "#9B59B6" },
  { id: "foundation", name: "Foundation (8–10)", icon: "🏗️", subjects: ["Science", "Maths", "English"], color: "#E67E22" },
];

const BATCHES = [
  {
    id: 1,
    name: "Minecraft Server Development",
    classId: "tech",
    price: 299,
    originalPrice: 999,
    rating: 4.9,
    students: "New",
    educators: 3,
    tag: "NEW",
    color: "#27AE60",
    icon: "🎮",
    desc: "Learn to build, configure and manage your own Minecraft server from scratch. Plugins, worlds, multiplayer setup aur advanced customization — sab kuch!",
    subjects: ["Java Basics", "Server Setup", "Plugins", "World Design"],
    duration: "3 months",
    includes: ["Live Sessions", "Recorded Lectures", "Source Code", "Community Discord", "Certificate"],
  },
];

const TESTS = [
  { id: 1, name: "JEE Main Full Mock — January 2025", type: "Full Test", questions: 90, duration: 180, attempts: "2.3L", difficulty: "Hard" },
  { id: 2, name: "NEET Chapter Test — Genetics", type: "Chapter Test", questions: 45, duration: 60, attempts: "98K", difficulty: "Medium" },
  { id: 3, name: "Physics Weekly Test #12", type: "Weekly", questions: 30, duration: 45, attempts: "1.2L", difficulty: "Medium" },
  { id: 4, name: "Chemistry DPP — Organic Reactions", type: "DPP", questions: 20, duration: 30, attempts: "1.8L", difficulty: "Easy" },
  { id: 5, name: "Maths Crash — Algebra & Quadratics", type: "Chapter Test", questions: 35, duration: 50, attempts: "87K", difficulty: "Hard" },
];

const SAMPLE_QS = [
  { q: "A body moves with uniform velocity. Its acceleration is:", opts: ["0 m/s²", "1 m/s²", "9.8 m/s²", "Variable"], ans: 0, sub: "Physics", exp: "Uniform velocity means no change in speed or direction → acceleration = 0." },
  { q: "Atomic number of Carbon is:", opts: ["4", "6", "8", "12"], ans: 1, sub: "Chemistry", exp: "Carbon (C) has atomic number 6, meaning 6 protons in its nucleus." },
  { q: "If f(x) = x², then f'(x) =", opts: ["x", "2x", "x/2", "2"], ans: 1, sub: "Maths", exp: "By power rule: d/dx(xⁿ) = n·xⁿ⁻¹ → d/dx(x²) = 2x." },
  { q: "Powerhouse of the cell is:", opts: ["Ribosome", "Nucleus", "Mitochondria", "Golgi body"], ans: 2, sub: "Biology", exp: "Mitochondria produce ATP via cellular respiration — hence 'powerhouse of the cell'." },
  { q: "SI unit of electric charge:", opts: ["Ampere", "Volt", "Coulomb", "Ohm"], ans: 2, sub: "Physics", exp: "Coulomb (C) is the SI unit of electric charge. 1 C = charge of ~6.24×10¹⁸ electrons." },
];

const EDUOBI_SYSTEM_PROMPT = `You are Obi AI, the intelligent study assistant for Eduobi — India's affordable EdTech platform by Obi Enterprises, founded by Anmol Thakur.

You help Indian students with:
- Class 9, 10, 11, 12 subjects: Physics, Chemistry, Maths, Biology, English, Hindi, Social Science
- JEE Main & Advanced, NEET UG preparation
- CBSE Board exam strategy and previous year paper analysis
- Concept explanations, formula derivations, solved examples
- Study plans, time management, exam tips

Your style:
- Friendly, warm, motivational — like a helpful senior or teacher
- Use simple, clear English language throughout
- Structure answers with headings, bullet points, formulas clearly
- End with an encouraging line or exam tip
- Keep answers concise but complete (200-350 words max)
- Use emojis moderately for engagement 🎯

You are NOT a general chatbot. Keep responses focused on academics and Eduobi. If asked off-topic, gently redirect to studies.`;

async function callObiAI(messages) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: EDUOBI_SYSTEM_PROMPT,
        messages: messages.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text })),
      }),
    });
    const data = await res.json();
    if (data.content && data.content[0]?.text) return data.content[0].text;
    if (data.error) return `⚠️ API Error: ${data.error.message}. Check your Anthropic API key.`;
    return "A technical issue occurred. Please try again! 🔄";
  } catch (e) {
    return "Network error. Please check your internet connection and try again! 🌐";
  }
}

function md(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code style='background:#1A2440;padding:2px 6px;border-radius:4px;font-size:12px'>$1</code>")
    .replace(/^### (.*)/gm, "<div style='font-family:Syne;font-weight:700;font-size:14px;margin:10px 0 4px;color:#FF6B00'>$1</div>")
    .replace(/^## (.*)/gm, "<div style='font-family:Syne;font-weight:800;font-size:15px;margin:10px 0 6px;color:#E8E8F0'>$1</div>")
    .replace(/^• (.*)/gm, "<div style='padding-left:12px;margin:3px 0'>• $1</div>")
    .replace(/^- (.*)/gm, "<div style='padding-left:12px;margin:3px 0'>• $1</div>")
    .replace(/\n/g, "<br/>");
}


/* ═══════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════ */
function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className="toast">✅ {message}</div>;
}

/* ═══════════════════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════════════════ */
// ── OTP generator ──────────────────────────────────────────
function genOTP() { return String(Math.floor(1000 + Math.random() * 9000)); }

// ── Registered users store ──────────────────────────────────
const REGISTERED_USERS = {};

// ── EmailJS Config — Apne credentials yahan daalo ──────────
// Step 1: emailjs.com pe free account banao
// Step 2: Add Email Service (Gmail) → Service ID copy karo
// Step 3: Create Email Template → Template ID copy karo
//         Template mein ye variables use karo:
//         Subject: "Eduobi OTP - {{otp_code}}"
//         Body: "Hi {{to_name}}, Your Eduobi OTP is: {{otp_code}}. Valid for 10 minutes."
// Step 4: Account → API Keys → Public Key copy karo
const EMAILJS_SERVICE_ID  = "service_2xy9un5";
const EMAILJS_TEMPLATE_ID = "template_c01ts3q";
const EMAILJS_PUBLIC_KEY  = "oWMCm2Oewm09Mb5Za";

// ── Send email OTP via EmailJS ──────────────────────────────
async function sendEmailOTP(toEmail, toName, otpCode) {
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id:     EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: toEmail,
          to_name:  toName,
          otp_code: otpCode,
          app_name: "Eduobi",
        },
      }),
    });
    return res.status === 200;
  } catch (e) {
    console.error("EmailJS error:", e);
    return false;
  }
}

function AuthModal({ onClose, onLogin, defaultTab = "login" }) {
  const [screen, setScreen]     = useState(defaultTab === "register" ? "register" : "login");
  const [form, setForm]         = useState({ name:"", email:"", phone:"", password:"", goal:"", otp:"", newPass:"", confirmPass:"" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [otpStore, setOtpStore] = useState({ email:"" });
  const [otpVerified, setOtpVerified] = useState({ email: false });
  const [resetOtp, setResetOtp] = useState("");

  const f = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(""); };

  // ── SEND EMAIL OTP ──────────────────────────────────────────
  const sendOtp = async (email, name) => {
    const code = genOTP();
    setOtpStore(p => ({ ...p, email: code }));
    setLoading(true);
    const sent = await sendEmailOTP(email, name || email.split("@")[0], code);
    setLoading(false);
    if (sent) {
      setSuccess(`OTP sent to ${email}! Check your inbox and spam folder.`);
    } else {
      // EmailJS not configured — show OTP on screen for now
      setError(`Email service unavailable. Your OTP is: ${code} (note it down!)`);
    }
    setTimeout(() => setSuccess(""), 15000);
    return code;
  };

  // ── REGISTER FLOW ───────────────────────────────────────────
  const startRegister = async () => {
    if (!form.name.trim())            { setError("Full name required."); return; }
    if (!form.email.includes("@"))    { setError("Valid email required."); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError("Valid 10-digit mobile number required."); return; }
    if (form.password.length < 6)     { setError("Password must be at least 6 characters."); return; }
    if (!form.goal)                   { setError("Please select your goal."); return; }
    if (REGISTERED_USERS[form.email]) { setError("Email already registered. Please login."); return; }
    setError("");
    await sendOtp(form.email, form.name);
    setScreen("verify-register");
  };

  const verifyRegisterOtp = () => {
    if (form.otp !== otpStore.email) { setError("Wrong OTP. Please check your email and try again."); return; }
    setOtpVerified(p => ({ ...p, email: true }));
    setError(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      REGISTERED_USERS[form.email] = { name: form.name, email: form.email, phone: form.phone, password: form.password, goal: form.goal };
      onLogin({ name: form.name, email: form.email, phone: form.phone, goal: form.goal });
    }, 500);
  };

  // ── LOGIN FLOW ──────────────────────────────────────────────
  const doLogin = () => {
    if (!form.email || !form.password) { setError("Email and password required."); return; }
    const u = REGISTERED_USERS[form.email];
    if (!u)                           { setError("Account not found. Please register first."); return; }
    if (u.password !== form.password) { setError("Incorrect password."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: u.name, email: u.email, phone: u.phone, goal: u.goal }); }, 700);
  };

  // ── FORGOT PASSWORD FLOW ────────────────────────────────────
  const sendResetOtp = async () => {
    if (!form.email.includes("@"))     { setError("Enter your registered email."); return; }
    if (!REGISTERED_USERS[form.email]) { setError("No account found with this email."); return; }
    setError("");
    const code = await sendOtp(form.email, REGISTERED_USERS[form.email]?.name);
    setResetOtp(code);
    setScreen("verify-reset");
  };

  const verifyResetOtp = () => {
    if (form.otp !== resetOtp) { setError("Wrong OTP. Try again."); return; }
    setError("");
    setForm(p => ({ ...p, otp: "" }));
    setScreen("new-password");
  };

  const saveNewPassword = () => {
    if (form.newPass.length < 6)           { setError("Password must be at least 6 characters."); return; }
    if (form.newPass !== form.confirmPass)  { setError("Passwords do not match."); return; }
    REGISTERED_USERS[form.email].password = form.newPass;
    setError(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Password reset successful! Please login.");
      setTimeout(() => { setSuccess(""); setScreen("login"); }, 1800);
    }, 700);
  };

  // ── SHARED UI HELPERS ─────────────────────────────────────
  const ModalHeader = ({ title, subtitle, back }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
      {back && <button onClick={back} style={{ background:"rgba(255,255,255,.05)", border:"1px solid #1A2440", color:"#8892A4", cursor:"pointer", borderRadius:8, padding:"6px 12px", fontSize:16 }}>←</button>}
      <div style={{ width:42, height:42, background:"linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🎓</div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:17 }}>{title}</div>
        <div style={{ fontSize:11, color:"#8892A4" }}>{subtitle}</div>
      </div>
      <button onClick={onClose} style={{ background:"none", border:"none", color:"#5A6580", cursor:"pointer", fontSize:20, lineHeight:1 }}>✕</button>
    </div>
  );

  const ErrBox  = () => error   ? <div style={{ color:"#E94560", fontSize:13, padding:"9px 12px", background:"rgba(233,69,96,.1)", borderRadius:8, lineHeight:1.5 }}>⚠️ {error}</div>   : null;
  const OkBox   = () => success ? <div style={{ color:"#00D4AA", fontSize:13, padding:"9px 12px", background:"rgba(0,212,170,.1)", borderRadius:8, lineHeight:1.5 }}>✅ {success}</div> : null;

  // ── SCREENS ───────────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth:420 }} onClick={e => e.stopPropagation()}>

        {/* ── LOGIN ── */}
        {screen === "login" && <>
          <ModalHeader title="Login to Eduobi" subtitle="Welcome back! 👋" />
          <div style={{ display:"flex", gap:4, background:"#0A0A14", borderRadius:10, padding:4, marginBottom:22 }}>
            {["login","register"].map(t => (
              <button key={t} className={`tab-btn ${screen===t?"active":""}`} style={{ flex:1 }}
                onClick={() => { setScreen(t); setError(""); }}>
                {t==="login" ? "🔐 Login" : "✨ Register"}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <input className="input-field" placeholder="Email Address *" type="email" value={form.email} onChange={e => f("email", e.target.value)} />
            <input className="input-field" placeholder="Password *" type="password" value={form.password} onChange={e => f("password", e.target.value)} onKeyDown={e => e.key==="Enter" && doLogin()} />
            <div style={{ textAlign:"right", marginTop:-4 }}>
              <span style={{ color:"#FF6B00", fontSize:12, cursor:"pointer", fontWeight:600 }} onClick={() => { setScreen("forgot"); setError(""); }}>Forgot Password?</span>
            </div>
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={doLogin} disabled={loading}>
              {loading ? "⏳ Logging in..." : "Login to Eduobi →"}
            </button>
            <div style={{ textAlign:"center", fontSize:12, color:"#5A6580" }}>
              New to Eduobi?{" "}
              <span style={{ color:"#FF6B00", cursor:"pointer", fontWeight:600 }} onClick={() => { setScreen("register"); setError(""); }}>Register Free</span>
            </div>
          </div>
        </>}

        {/* ── REGISTER ── */}
        {screen === "register" && <>
          <ModalHeader title="Create Free Account" subtitle="Join 50L+ students on Eduobi" back={() => { setScreen("login"); setError(""); }} />
          <div style={{ display:"flex", gap:4, background:"#0A0A14", borderRadius:10, padding:4, marginBottom:22 }}>
            {["login","register"].map(t => (
              <button key={t} className={`tab-btn ${screen===t?"active":""}`} style={{ flex:1 }}
                onClick={() => { setScreen(t); setError(""); }}>
                {t==="login" ? "🔐 Login" : "✨ Register"}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <input className="input-field" placeholder="Full Name *" value={form.name} onChange={e => f("name", e.target.value)} />
            <input className="input-field" placeholder="Email Address *" type="email" value={form.email} onChange={e => f("email", e.target.value)} />
            <input className="input-field" placeholder="Mobile Number (10 digits) *" type="tel" maxLength={10} value={form.phone} onChange={e => f("phone", e.target.value.replace(/\D/g,""))} />
            <select className="input-field" value={form.goal} onChange={e => f("goal", e.target.value)}>
              <option value="">Select Your Goal *</option>
              {CLASSES_DATA.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
            <input className="input-field" placeholder="Create Password * (min 6 chars)" type="password" value={form.password} onChange={e => f("password", e.target.value)} />
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:14, fontSize:15, marginTop:4 }} onClick={startRegister} disabled={loading}>
              {loading ? "⏳ Sending OTP..." : "✨ Register & Send OTP →"}
            </button>
            <div style={{ fontSize:11, color:"#5A6580", textAlign:"center", lineHeight:1.5 }}>
              📲 OTP will be sent to your email for verification
            </div>
            <div style={{ textAlign:"center", fontSize:12, color:"#5A6580" }}>
              Already have an account?{" "}
              <span style={{ color:"#FF6B00", cursor:"pointer", fontWeight:600 }} onClick={() => { setScreen("login"); setError(""); }}>Login here</span>
            </div>
          </div>
        </>}

        {/* ── OTP VERIFICATION (Register) ── */}
        {screen === "verify-register" && <>
          <ModalHeader title="Verify Email OTP" subtitle={`OTP sent to: ${form.email}`} back={() => { setScreen("register"); setError(""); }} />
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <div style={{ textAlign:"center", padding:"20px 14px", background:"rgba(255,107,0,.06)", borderRadius:12, border:"1px solid rgba(255,107,0,.2)" }}>
              <div style={{ fontSize:40, marginBottom:8 }}>📧</div>
              <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:14, marginBottom:6, color:"#E8E8F0" }}>Check Your Email!</div>
              <div style={{ fontSize:13, color:"#8892A4", lineHeight:1.7 }}>
                <strong style={{ color:"#FF6B00" }}>{form.email}</strong> - A 4-digit OTP has been sent. Check your spam/promotions folder too.
              </div>
            </div>
            <input className="input-field" placeholder="4-digit OTP yahan daalo *" type="number" maxLength={4} value={form.otp}
              onChange={e => f("otp", e.target.value.slice(0,4))}
              style={{ textAlign:"center", fontSize:28, fontWeight:800, letterSpacing:12, padding:"16px" }} />
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:14, fontSize:15 }} onClick={verifyRegisterOtp} disabled={loading}>
              {loading ? "⏳ Verifying..." : "Verify & Create Account →"}
            </button>
            <div style={{ textAlign:"center", fontSize:12, color:"#5A6580" }}>
              Didn't receive OTP?{" "}
              <span style={{ color:"#FF6B00", cursor:"pointer", fontWeight:600 }} onClick={async () => await sendOtp(form.email, form.name)}>Resend OTP</span>
            </div>
          </div>
        </>}

        {/* ── FORGOT PASSWORD ── */}
        {screen === "forgot" && <>
          <ModalHeader title="Forgot Password" subtitle="Enter your registered email" back={() => { setScreen("login"); setError(""); }} />
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <div style={{ textAlign:"center", padding:"16px", background:"rgba(74,144,226,.06)", borderRadius:12, border:"1px solid rgba(74,144,226,.15)", marginBottom:4 }}>
              <div style={{ fontSize:36, marginBottom:8 }}>🔑</div>
              <div style={{ fontSize:13, color:"#8892A4", lineHeight:1.6 }}>We'll send a reset OTP to your registered email address.</div>
            </div>
            <input className="input-field" placeholder="Registered Email Address *" type="email" value={form.email} onChange={e => f("email", e.target.value)} />
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={sendResetOtp} disabled={loading}>
              {loading ? "⏳ Sending OTP..." : "Send Reset OTP →"}
            </button>
          </div>
        </>}

        {/* ── VERIFY RESET OTP ── */}
        {screen === "verify-reset" && <>
          <ModalHeader title="Verify Reset OTP" subtitle={`OTP sent to ${form.email}`} back={() => { setScreen("forgot"); setError(""); }} />
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <div style={{ textAlign:"center", padding:"14px", background:"rgba(255,107,0,.06)", borderRadius:12, border:"1px solid rgba(255,107,0,.15)" }}>
              <div style={{ fontSize:28, marginBottom:6 }}>📧</div>
              <div style={{ fontSize:13, color:"#8892A4" }}>Enter the 4-digit OTP sent to your email</div>
            </div>
            <input className="input-field" placeholder="Enter 4-digit OTP *" type="number" maxLength={4} value={form.otp}
              onChange={e => f("otp", e.target.value.slice(0,4))}
              style={{ textAlign:"center", fontSize:22, fontWeight:700, letterSpacing:8 }} />
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={verifyResetOtp} disabled={loading}>
              {loading ? "⏳ Verifying..." : "Verify OTP →"}
            </button>
            <div style={{ textAlign:"center", fontSize:12, color:"#5A6580" }}>
              Didn't receive?{" "}
              <span style={{ color:"#FF6B00", cursor:"pointer", fontWeight:600 }} onClick={sendResetOtp}>Resend OTP</span>
            </div>
          </div>
        </>}

        {/* ── NEW PASSWORD ── */}
        {screen === "new-password" && <>
          <ModalHeader title="Set New Password" subtitle="Choose a strong password" />
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            <div style={{ textAlign:"center", padding:"14px", background:"rgba(0,212,170,.06)", borderRadius:12, border:"1px solid rgba(0,212,170,.15)", marginBottom:4 }}>
              <div style={{ fontSize:36, marginBottom:6 }}>🔒</div>
              <div style={{ fontSize:13, color:"#8892A4" }}>OTP Verified! Create your new password.</div>
            </div>
            <input className="input-field" placeholder="New Password * (min 6 chars)" type="password" value={form.newPass} onChange={e => f("newPass", e.target.value)} />
            <input className="input-field" placeholder="Confirm New Password *" type="password" value={form.confirmPass} onChange={e => f("confirmPass", e.target.value)} onKeyDown={e => e.key==="Enter" && saveNewPassword()} />
            <ErrBox /><OkBox />
            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={saveNewPassword} disabled={loading}>
              {loading ? "⏳ Saving..." : "Reset Password →"}
            </button>
          </div>
        </>}

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OBI AI CHAT
═══════════════════════════════════════════════════════ */
function ObiAI({ onClose }) {
  const [msgs, setMsgs] = useState([{ role: "ai", text: "I am **Obi AI** 🤖 — Eduobi's intelligent study assistant!\n\nAsk me about:\n• **Physics, Chemistry, Maths, Biology** doubts\n• **Class 9–12, JEE, NEET** concepts & formulas\n• **Board exam tips** and study strategy\n• **Previous year paper** analysis\n\nAsk me anything — I'm always ready! 🚀" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = async (txt) => {
    const m = txt || input.trim();
    if (!m || typing) return;
    setInput("");
    const newMsgs = [...msgs, { role: "user", text: m }];
    setMsgs(newMsgs);
    setTyping(true);
    // Filter out the default welcome message from history
    const history = newMsgs.filter(msg => msg.role !== "ai" || !msg.text.includes("I'm **Obi AI**"));
    const reply = await callObiAI(history);
    setTyping(false);
    setMsgs(p => [...p, { role: "ai", text: reply }]);
  };

  const CHIPS = ["Newton's laws", "Integration tips", "Periodic table", "Study schedule", "About Eduobi"];

  return (
    <div style={{ position: "fixed", right: 20, bottom: 76, width: 370, height: 540, background: "#131929", borderRadius: 22, border: "1px solid rgba(255,107,0,.3)", display: "flex", flexDirection: "column", zIndex: 998, boxShadow: "0 24px 64px rgba(0,0,0,.7)", animation: "popIn .3s ease" }}>
      {/* Header */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1A2440", display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,rgba(255,107,0,.08),transparent)", borderRadius: "22px 22px 0 0" }}>
        <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#FF6B00,#E94560)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>Obi AI</div>
          <div style={{ fontSize: 11, color: "#00D4AA", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, background: "#00D4AA", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            Always online · Instant answers
          </div>
        </div>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: "#5A6580", cursor: "pointer", fontSize: 18 }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp .3s ease" }}>
            {m.role === "ai" ? (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, background: "linear-gradient(135deg,#FF6B00,#E94560)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>🤖</div>
                <div className="ai-bubble" dangerouslySetInnerHTML={{ __html: md(m.text) }} />
              </div>
            ) : (
              <div className="user-bubble">{m.text}</div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 26, height: 26, background: "linear-gradient(135deg,#FF6B00,#E94560)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</div>
            <div className="ai-bubble" style={{ padding: "12px 16px", display: "flex", gap: 5 }}>
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick chips */}
      {msgs.length <= 2 && (
        <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CHIPS.map(c => (
            <button key={c} onClick={() => send(c)} style={{ fontSize: 11, padding: "5px 10px", background: "rgba(255,107,0,.1)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 20, color: "#FF6B00", cursor: "pointer", fontFamily: "DM Sans" }}>{c}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid #1A2440", display: "flex", gap: 8 }}>
        <input className="input-field" style={{ padding: "10px 14px", borderRadius: 10 }} placeholder="Ask Obi AI a doubt..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button className="btn-primary" style={{ padding: "10px 14px", borderRadius: 10, whiteSpace: "nowrap" }} onClick={() => send()}>➤</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BATCH CARD
═══════════════════════════════════════════════════════ */
// ── PAYMENT MODAL ─────────────────────────────────────────────────────────
function PaymentModal({ batch, user, onClose, onSuccess }) {
  const [step, setStep]         = useState("qr");   // qr | verify | success
  const [txnId, setTxnId]       = useState("");
  const [checking, setChecking] = useState(false);
  const [err, setErr]           = useState("");

  const handleVerify = async () => {
    if (txnId.trim().length < 6) { setErr("Please enter a valid transaction ID (min 6 characters)."); return; }
    setChecking(true);
    setErr("");
    // Simulate verification delay (real app mein server-side verify hoga)
    await new Promise(r => setTimeout(r, 2000));
    setChecking(false);
    setStep("success");
    onSuccess(batch);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, background:"linear-gradient(135deg,#27AE60,#2ECC71)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🎮</div>
            <div>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:15 }}>Complete Payment</div>
              <div style={{ color:"#8892A4", fontSize:12 }}>{batch.name}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#5A6580", cursor:"pointer", fontSize:20 }}>✕</button>
        </div>

        {step === "qr" && (
          <>
            {/* Price */}
            <div style={{ background:"linear-gradient(135deg,#131929,#1A2440)", borderRadius:14, padding:"16px 20px", marginBottom:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ color:"#8892A4", fontSize:12, marginBottom:3 }}>Amount to Pay</div>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:28, color:"#27AE60" }}>₹{batch.price}</div>
                <div style={{ color:"#5A6580", fontSize:11, textDecoration:"line-through" }}>₹{batch.originalPrice}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <span className="badge badge-green" style={{ fontSize:11 }}>🎉 {Math.round((1-batch.price/batch.originalPrice)*100)}% OFF</span>
                <div style={{ color:"#8892A4", fontSize:11, marginTop:6 }}>One-time payment</div>
              </div>
            </div>

            {/* QR Code — Coming Soon */}
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{ display:"inline-block", background:"#fff", borderRadius:16, padding:18, marginBottom:14 }}>
                {/* QR Placeholder — Coming Soon */}
                <div style={{ width:180, height:180, background:"linear-gradient(135deg,#f0f0f0,#e0e0e0)", borderRadius:8, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
                  <div style={{ fontSize:36 }}>🔲</div>
                  <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:13, color:"#333" }}>QR Coming Soon</div>
                  <div style={{ fontSize:11, color:"#666", maxWidth:130, textAlign:"center", lineHeight:1.5 }}>UPI QR code coming soon</div>
                </div>
              </div>
              <div style={{ background:"rgba(255,107,0,.08)", border:"1px solid rgba(255,107,0,.2)", borderRadius:10, padding:"10px 16px", fontSize:12, color:"#FF6B00", lineHeight:1.6 }}>
                📱 <strong>UPI ID:</strong> Coming Soon<br/>
                <span style={{ color:"#8892A4" }}>Payment setup in progress — coming soon!</span>
              </div>
            </div>

            {/* Steps */}
            <div style={{ marginBottom:18 }}>
              {[["1️⃣","Scan QR or pay ₹299 via UPI ID"],["2️⃣","Note your Transaction ID"],["3️⃣","Enter below — instant access"]].map(([n,t])=>(
                <div key={n} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8, fontSize:12.5, color:"#8892A4", lineHeight:1.5 }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>{n}</span><span>{t}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={() => setStep("verify")}>
              ✅ I Have Paid →
            </button>
          </>
        )}

        {step === "verify" && (
          <>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:48, marginBottom:10 }}>🔍</div>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, marginBottom:6 }}>Payment Verify Karo</div>
              <div style={{ color:"#8892A4", fontSize:13, lineHeight:1.6 }}>Enter your UPI Transaction ID or UTR Number</div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:"#8892A4", display:"block", marginBottom:6 }}>Transaction ID / UTR Number</label>
              <input
                className="input-field"
                placeholder="e.g. 425813906234"
                value={txnId}
                onChange={e => { setTxnId(e.target.value); setErr(""); }}
                style={{ width:"100%", padding:"12px 16px", borderRadius:10, boxSizing:"border-box" }}
              />
              {err && <div style={{ color:"#E94560", fontSize:12, marginTop:6 }}>⚠️ {err}</div>}
            </div>

            <div style={{ background:"rgba(39,174,96,.08)", border:"1px solid rgba(39,174,96,.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#27AE60", marginBottom:18, lineHeight:1.6 }}>
              💡 Find your Transaction ID in Google Pay / PhonePe / Paytm under "Payment History" → tap on the transaction.
            </div>

            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15, marginBottom:10 }}
              onClick={handleVerify} disabled={checking}>
              {checking ? "⏳ Verifying..." : "🚀 Verify & Get Access"}
            </button>
            <button onClick={() => setStep("qr")} style={{ width:"100%", background:"none", border:"none", color:"#8892A4", cursor:"pointer", fontSize:13, padding:8 }}>← Back to Payment</button>
          </>
        )}

        {step === "success" && (
          <div style={{ textAlign:"center", padding:"10px 0" }}>
            <div style={{ fontSize:64, marginBottom:16, animation:"popIn .4s ease" }}>🎉</div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, marginBottom:8, color:"#27AE60" }}>Enrollment Successful!</div>
            <div style={{ color:"#8892A4", fontSize:14, lineHeight:1.7, marginBottom:24 }}>
              <strong style={{ color:"#E8E8F0" }}>{batch.name}</strong> — welcome aboard!<br/>
              You now have access to lectures, resources & community. 🎮
            </div>
            <div style={{ background:"linear-gradient(135deg,rgba(39,174,96,.1),rgba(39,174,96,.05))", border:"1px solid rgba(39,174,96,.25)", borderRadius:14, padding:"16px 20px", marginBottom:20 }}>
              {["📺 Lectures — Go to the Lectures section","💬 Discord — Join the community","📜 Certificate — Complete the course"].map(s=>(
                <div key={s} style={{ fontSize:13, color:"#8892A4", marginBottom:6, textAlign:"left" }}>✅ {s}</div>
              ))}
            </div>
            <button className="btn-primary" style={{ width:"100%", padding:13, fontSize:15 }} onClick={onClose}>
              🚀 Start Learning Now!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── BATCH CARD ─────────────────────────────────────────────────────────────
function BatchCard({ batch, onEnroll }) {
  const disc = Math.round((1 - batch.price / batch.originalPrice) * 100);
  return (
    <div className="card" style={{ padding:0, overflow:"hidden", display:"flex", flexDirection:"column", maxWidth:520, margin:"0 auto", width:"100%" }}>
      <div style={{ height:7, background:`linear-gradient(90deg,${batch.color},${batch.color}55)` }} />
      <div style={{ padding:24, flex:1, display:"flex", flexDirection:"column" }}>
        {/* Top */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div style={{ width:56, height:56, background:`linear-gradient(135deg,${batch.color}22,${batch.color}08)`, border:`2px solid ${batch.color}33`, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>{batch.icon}</div>
          {batch.tag && <span className="badge badge-orange">{batch.tag}</span>}
        </div>

        <h3 style={{ fontFamily:"Syne", fontWeight:800, fontSize:20, marginBottom:8, lineHeight:1.2 }}>{batch.name}</h3>
        <p style={{ color:"#8892A4", fontSize:13.5, lineHeight:1.65, marginBottom:16, flex:1 }}>{batch.desc}</p>

        {/* What's included */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, color:"#5A6580", marginBottom:8, fontWeight:600 }}>INCLUDES:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {batch.includes.map(inc => (
              <span key={inc} style={{ fontSize:11, padding:"3px 10px", background:"rgba(39,174,96,.1)", border:"1px solid rgba(39,174,96,.2)", borderRadius:20, color:"#27AE60" }}>✓ {inc}</span>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
          {batch.subjects.map(s => <span key={s} className="badge badge-blue" style={{ fontSize:10 }}>{s}</span>)}
          <span className="badge badge-orange" style={{ fontSize:10 }}>📅 {batch.duration}</span>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:20, marginBottom:18, flexWrap:"wrap" }}>
          <div style={{ fontSize:12, color:"#8892A4" }}>👨‍🏫 <strong style={{ color:"#E8E8F0" }}>{batch.educators}</strong> Educators</div>
          <div style={{ fontSize:12, color:"#8892A4" }}>⭐ <strong style={{ color:"#E8E8F0" }}>{batch.rating}</strong> Rating</div>
          <div style={{ fontSize:12, color:"#8892A4" }}>👥 <strong style={{ color:"#E8E8F0" }}>{batch.students}</strong> Students</div>
        </div>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, padding:"14px 18px", background:"linear-gradient(135deg,#131929,#1A2440)", borderRadius:12 }}>
          <div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:28, color:"#27AE60" }}>₹{batch.price}</div>
            <div style={{ textDecoration:"line-through", color:"#5A6580", fontSize:12 }}>₹{batch.originalPrice}</div>
          </div>
          <span className="badge badge-green" style={{ fontSize:12 }}>🎉 {disc}% OFF</span>
          <div style={{ marginLeft:"auto", fontSize:12, color:"#8892A4" }}>One-time payment</div>
        </div>

        <button className="btn-primary" style={{ width:"100%", padding:"14px", fontSize:16, borderRadius:12 }} onClick={onEnroll}>
          🎮 Enroll Now — ₹{batch.price}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════ */

// HOME
function HomePage({ user, openAuth, goTo }) {
  const [searchQ, setSearchQ] = useState("");

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg,#0A0A14 0%,#131929 55%,#0A0A14 100%)", padding: "64px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 450, height: 450, background: "radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 350, height: 350, background: "radial-gradient(circle,rgba(233,69,96,.05) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span className="badge badge-orange" style={{ animation: "glow 2s infinite" }}>🔥 India's #1 Affordable EdTech</span>
            <span className="badge badge-green">✅ Trusted by 50L+ Students</span>
          </div>
          <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(30px,5.5vw,62px)", lineHeight: 1.08, marginBottom: 18 }}>
            Learn from the <span style={{ color: "#FF6B00" }}>Best Minds.</span><br />
            India's <span style={{ color: "#E94560" }}>All Type Education</span> Platform.
          </h1>
          <p style={{ color: "#8892A4", fontSize: 16, marginBottom: 32, maxWidth: 520, lineHeight: 1.75 }}>
            Affordable, world-class education for every Indian student — powered by <strong style={{ color: "#FF6B00" }}>Obi AI</strong>, India's smartest doubt-solver.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: 500, marginBottom: 28 }}>
            <div className="search-bar">
              <span style={{ fontSize: 18 }}>🔍</span>
              <input placeholder="Search batches, topics, subjects..." value={searchQ} onChange={e => setSearchQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter") goTo("batches"); }} />
              <button className="btn-primary" style={{ padding: "7px 16px", fontSize: 13 }} onClick={() => goTo("batches")}>Search</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }} onClick={() => user ? goTo("batches") : openAuth()}>
              {user ? "Explore Batches →" : "Start Learning Free →"}
            </button>
            <button className="btn-secondary" style={{ fontSize: 15, padding: "13px 28px" }} onClick={() => goTo("batches")}>Browse Courses</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, marginTop: 52, flexWrap: "wrap" }}>
            {[["50L+", "Students"], ["500+", "Expert Faculty"], ["1000+", "hrs Content"], ["95%", "Selection Rate"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, color: "#FF6B00" }}>{v}</div>
                <div style={{ color: "#8892A4", fontSize: 13, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div style={{ padding: "48px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 26, marginBottom: 6 }}>Browse by Goal</h2>
        <p style={{ color: "#8892A4", marginBottom: 24 }}>Find the perfect batch for your academic journey</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 14 }}>
          {CLASSES_DATA.map(c => (
            <div key={c.id} className="card" style={{ padding: "22px 16px", cursor: "pointer", textAlign: "center" }} onClick={() => goTo("batches")}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: "#5A6580", fontSize: 11 }}>{c.subjects.length} subjects</div>
              <div style={{ width: 28, height: 3, background: c.color, borderRadius: 2, margin: "10px auto 0" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Batches */}
      <div style={{ padding: "0 24px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 26 }}>Top Batches 🔥</h2>
            <p style={{ color: "#8892A4", fontSize: 13, marginTop: 4 }}>Chosen by hundreds of thousands of successful students</p>
          </div>
          <button className="btn-ghost" onClick={() => goTo("batches")}>View All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {BATCHES.slice(0, 3).map(b => <BatchCard key={b.id} batch={b} onEnroll={() => { if (!user) openAuth(); else setPaymentBatch(b); }} />)}
        </div>
      </div>

      {/* Obi AI Banner */}
      <div style={{ padding: "0 24px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg,#131929,#1A2440)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 22, padding: "36px 32px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 64 }}>🤖</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <span className="badge badge-orange" style={{ marginBottom: 10 }}>✨ AI-Powered · Free</span>
            <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 24, marginBottom: 10, marginTop: 6 }}>Meet Obi AI — Your 24/7 Doubt Solver</h3>
            <p style={{ color: "#8892A4", lineHeight: 1.7, fontSize: 14 }}>Ask any doubt in Physics, Chemistry, Maths or Biology. Obi AI gives instant, step-by-step explanations in simple language. Available anytime, anywhere — completely free.</p>
          </div>
          <button className="btn-primary" style={{ padding: "13px 24px", whiteSpace: "nowrap" }} onClick={() => document.getElementById("obi-ai-btn").click()}>Try Obi AI Free →</button>
        </div>
      </div>

      {/* Why Eduobi */}
      <div style={{ padding: "0 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 26, marginBottom: 24, textAlign: "center" }}>Why Students Choose Eduobi</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
          {[
            ["💰", "Ultra Affordable", "Premium education at 1/10th the price of offline coaching."],
            ["🤖", "Obi AI Doubt Solver", "24/7 AI assistant for instant doubt resolution."],
            ["📱", "Learn Anywhere", "Mobile-first platform — study on the go."],
            ["🏆", "Proven Results", "95% of our students crack their target exam."],
            ["👥", "Live Classes", "Interactive live sessions with India's top educators."],
            ["📊", "Detailed Analytics", "Track progress, identify weak areas, improve faster."],
          ].map(([ico, t, d]) => (
            <div key={t} className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{ico}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{t}</div>
              <div style={{ color: "#8892A4", fontSize: 13, lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// BATCHES
function BatchesPage({ user, openAuth, onEnroll }) {
  return (
    <div className="fade-up" style={{ padding:"32px 24px 60px", maxWidth:700, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom:32, textAlign:"center" }}>
        <span className="badge badge-orange" style={{ marginBottom:12, display:"inline-block" }}>🎮 Live Now</span>
        <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:30, marginBottom:8 }}>Our Batch</h2>
        <p style={{ color:"#8892A4", fontSize:14, lineHeight:1.7 }}>
          Eduobi's first technical batch — just <strong style={{ color:"#27AE60" }}>₹299</strong> only. Seats are limited!
        </p>
      </div>

      {/* Guarantee Banner */}
      <div style={{ background:"linear-gradient(135deg,rgba(39,174,96,.1),rgba(39,174,96,.05))", border:"1px solid rgba(39,174,96,.25)", borderRadius:14, padding:"14px 20px", marginBottom:28, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ fontSize:28 }}>🛡️</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>7-Day Money Back Guarantee</div>
          <div style={{ color:"#8892A4", fontSize:12.5 }}>Not satisfied? Full refund — no questions asked.</div>
        </div>
      </div>

      {/* Single Batch Card */}
      {BATCHES.map(b => (
        <BatchCard key={b.id} batch={b} onEnroll={() => { if (!user) { openAuth(); return; } onEnroll(b); }} />
      ))}

      {/* FAQ */}
      <div style={{ marginTop:36 }}>
        <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:18, marginBottom:16 }}>❓ Frequently Asked Questions</h3>
        {[
          ["How does payment work?", "Pay ₹299 via UPI / QR Code. Verify transaction ID — instant access."],
          ["How many educators are there?", "3 experienced educators who are experts in Minecraft server development."],
          ["Will I get a certificate?", "Yes! You'll receive an official Eduobi certificate upon course completion."],
          ["What is the refund policy?", "Full refund within 7 days. No questions, no conditions."],
        ].map(([q,a]) => (
          <div key={q} className="card" style={{ padding:"16px 20px", marginBottom:10 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:5 }}>Q: {q}</div>
            <div style={{ color:"#8892A4", fontSize:13, lineHeight:1.6 }}>→ {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// LECTURES — Empty state, teacher uploads later

// ── LECTURES DATA ──────────────────────────────────────────────────────────
const LECTURES_DATA = {
  "Class 9":  { subjects: ["English","Hindi","Maths","Science","Social Science"], lectures: {} },
  "Class 10": {
    subjects: ["English","Hindi","Maths","Science","Social Science"],
    lectures: {
      English: [
        { id:"c10-eng-1", title:"A Letter to God", chapter:"Ch 1 — First Flight", duration:"4 min", teacher:"Anmol Thakur", thumb:"📖", youtubeId:"vY6G9pIGkgQ", free:true, desc:"Complete explanation of the story with word meanings, summary & important questions." },
        { id:"c10-eng-2", title:"A Long Walk to Freedom", chapter:"Ch 2 — First Flight", duration:"4 min", teacher:"Anmol Thakur", thumb:"📖", youtubeId:"kbMjLyRTCJE", free:true, desc:"Nelson Mandela's autobiography chapter — full explanation, themes & board questions." },
      ],
      Hindi: [], Maths: [], Science: [], "Social Science": [],
    }
  },
  "Class 11": { subjects: ["Physics","Chemistry","Maths","Biology","English"], lectures: {} },
  "Class 12": { subjects: ["Physics","Chemistry","Maths","Biology","English"], lectures: {} },
  "Developing": { subjects: ["Coming Soon"], lectures: {} },
};

// LECTURES
function LecturesPage({ user, openAuth, awardXP }) {
  const [activeClass, setActiveClass]   = useState(null);   // null = class picker
  const [activeSubject, setActiveSubject] = useState(null); // null = subject picker
  const classes = Object.keys(LECTURES_DATA);
  const classIcons = { "Class 9":"📗", "Class 10":"📘", "Class 11":"📙", "Class 12":"📕", "Developing":"🚧" };
  const classColors = { "Class 9":"#27AE60","Class 10":"#FF6B00","Class 11":"#4A90E2","Class 12":"#E94560","Developing":"#9B59B6" };

  // ── Subject View ──────────────────────────────────────────────────────────
  if (activeClass && activeSubject) {
    const subjectLectures = LECTURES_DATA[activeClass]?.lectures?.[activeSubject] || [];
    return (
      <div className="fade-up" style={{ padding:"24px", maxWidth:1000, margin:"0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24, flexWrap:"wrap" }}>
          <button onClick={() => { setActiveClass(null); setActiveSubject(null); }} style={{ background:"rgba(255,255,255,.05)", border:"1px solid #1A2440", color:"#8892A4", cursor:"pointer", borderRadius:8, padding:"6px 12px", fontSize:12 }}>Classes</button>
          <span style={{ color:"#5A6580" }}>›</span>
          <button onClick={() => setActiveSubject(null)} style={{ background:"rgba(255,107,0,.1)", border:"1px solid rgba(255,107,0,.25)", color:"#FF6B00", cursor:"pointer", borderRadius:8, padding:"6px 12px", fontSize:12 }}>{activeClass}</button>
          <span style={{ color:"#5A6580" }}>›</span>
          <span style={{ color:"#E8E8F0", fontSize:12, fontWeight:600 }}>{activeSubject}</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
          <div style={{ width:44, height:44, background:`linear-gradient(135deg,${classColors[activeClass]},${classColors[activeClass]}88)`, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{classIcons[activeClass]}</div>
          <div>
            <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:24 }}>{activeSubject} — {activeClass}</h2>
            <p style={{ color:"#8892A4", fontSize:13 }}>{subjectLectures.length} lectures available</p>
          </div>
        </div>

        {!user && (
          <div style={{ background:"linear-gradient(135deg,#131929,#1A2440)", border:"1px solid rgba(255,107,0,.25)", borderRadius:14, padding:"16px 20px", marginBottom:22, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ fontSize:24 }}>🔐</div>
            <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14 }}>Login Required</div><div style={{ color:"#8892A4", fontSize:12.5 }}>Create a free account to watch lectures.</div></div>
            <button className="btn-primary" style={{ fontSize:13, padding:"9px 18px" }} onClick={openAuth}>Login Free →</button>
          </div>
        )}

        {subjectLectures.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🚧</div>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, marginBottom:8 }}>Coming Soon!</h3>
            <p style={{ color:"#8892A4", fontSize:14 }}>{activeClass} {activeSubject} lectures will be uploaded soon. Stay tuned! 📺</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {subjectLectures.map((lec, i) => (
              <div key={lec.id} className="card" style={{ padding:0, overflow:"hidden", animation:`fadeUp .3s ease ${i*0.07}s both` }}>
                <div style={{ height:4, background:`linear-gradient(90deg,${classColors[activeClass]},${classColors[activeClass]}44)` }} />
                <div style={{ padding:"18px 20px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
                  <div style={{ width:70, height:52, background:"#000", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, overflow:"hidden", position:"relative" }}>
                    <img src={`https://img.youtube.com/vi/${lec.youtubeId}/mqdefault.jpg`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:10 }} onError={e => { e.target.style.display='none'; }} />
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:22, height:22, background:"rgba(255,0,0,.85)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>▶</div>
                    </div>
                  </div>
                  <div style={{ flex:1, minWidth:160 }}>
                    <span className="badge badge-blue" style={{ fontSize:9, marginBottom:5, display:"inline-block" }}>{lec.chapter}</span>
                    <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, marginBottom:4 }}>{lec.title}</div>
                    <div style={{ color:"#8892A4", fontSize:12 }}>👨‍🏫 {lec.teacher} &nbsp;·&nbsp; ⏱ {lec.duration} &nbsp;·&nbsp; {lec.free ? "🆓 Free" : "🔒 Enrolled"}</div>
                  </div>
                  <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px", flexShrink:0 }}
                    onClick={() => {
                      if (!user) { openAuth(); return; }
                      if (awardXP) awardXP("lecture");
                      window.open(`https://youtu.be/${lec.youtubeId}`, "_blank", "noopener,noreferrer");
                    }}>
                    ▶ Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Subject Picker ────────────────────────────────────────────────────────
  if (activeClass) {
    const data = LECTURES_DATA[activeClass];
    const isDev = activeClass === "Developing";
    return (
      <div className="fade-up" style={{ padding:"24px", maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
          <button onClick={() => setActiveClass(null)} style={{ background:"rgba(255,255,255,.05)", border:"1px solid #1A2440", color:"#8892A4", cursor:"pointer", borderRadius:8, padding:"6px 12px", fontSize:12 }}>← Classes</button>
          <span style={{ color:"#5A6580" }}>›</span>
          <span style={{ color:"#FF6B00", fontSize:12, fontWeight:600 }}>{activeClass}</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
          <div style={{ width:52, height:52, background:`linear-gradient(135deg,${classColors[activeClass]},${classColors[activeClass]}88)`, borderRadius:15, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{classIcons[activeClass]}</div>
          <div>
            <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:26 }}>{activeClass}</h2>
            <p style={{ color:"#8892A4", fontSize:13 }}>{isDev ? "Content under development" : "Select a subject"}</p>
          </div>
        </div>

        {isDev ? (
          <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:72, marginBottom:16 }}>🚧</div>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:22, marginBottom:10 }}>Content Developing!</h3>
            <p style={{ color:"#8892A4", lineHeight:1.8, fontSize:14, maxWidth:400, margin:"0 auto" }}>This section is under development. Premium content for all classes coming soon. Stay tuned! 💪</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14 }}>
            {data.subjects.map(sub => {
              const lecs = data.lectures?.[sub] || [];
              return (
                <div key={sub} className="card" style={{ padding:"22px 16px", cursor:"pointer", textAlign:"center", transition:"transform .2s,border-color .2s" }}
                  onClick={() => setActiveSubject(sub)}
                  onMouseOver={e => e.currentTarget.style.borderColor="rgba(255,107,0,.4)"}
                  onMouseOut={e => e.currentTarget.style.borderColor="#1A2440"}>
                  <div style={{ fontSize:32, marginBottom:10 }}>
                    {sub==="English"?"📖":sub==="Hindi"?"📜":sub==="Maths"?"📐":sub==="Science"?"🔬":sub==="Social Science"?"🌏":sub==="Physics"?"⚛️":sub==="Chemistry"?"🧪":sub==="Biology"?"🧬":"📚"}
                  </div>
                  <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:13, marginBottom:6 }}>{sub}</div>
                  <div style={{ color:lecs.length>0?"#FF6B00":"#5A6580", fontSize:11, fontWeight:600 }}>
                    {lecs.length > 0 ? `${lecs.length} lectures` : "Coming soon"}
                  </div>
                  <div style={{ width:30, height:3, background:classColors[activeClass], borderRadius:2, margin:"10px auto 0" }} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Class Picker (default view) ───────────────────────────────────────────
  return (
    <div className="fade-up" style={{ padding:"32px 24px", maxWidth:1000, margin:"0 auto" }}>
      <div style={{ marginBottom:32 }}>
        <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:28, marginBottom:6 }}>📺 Video Lectures</h2>
        <p style={{ color:"#8892A4", fontSize:14 }}>Select your class and start learning</p>
      </div>

      {!user && (
        <div style={{ background:"linear-gradient(135deg,#131929,#1A2440)", border:"1px solid rgba(255,107,0,.2)", borderRadius:16, padding:"20px 24px", marginBottom:28, display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ fontSize:32 }}>🔐</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:4 }}>Login to Access Lectures</div>
            <div style={{ color:"#8892A4", fontSize:13 }}>Create a free account to unlock lectures.</div>
          </div>
          <button className="btn-primary" onClick={openAuth}>Login / Register</button>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16 }}>
        {classes.map((cls, i) => {
          const totalLectures = Object.values(LECTURES_DATA[cls].lectures || {}).flat().length;
          const isDev = cls === "Developing";
          return (
            <div key={cls} className="card" style={{ padding:0, overflow:"hidden", cursor:"pointer", animation:`fadeUp .35s ease ${i*0.08}s both`, transition:"transform .2s,border-color .2s" }}
              onClick={() => setActiveClass(cls)}
              onMouseOver={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor="rgba(255,107,0,.3)"; }}
              onMouseOut={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#1A2440"; }}>
              <div style={{ height:5, background:`linear-gradient(90deg,${classColors[cls]},${classColors[cls]}55)` }} />
              <div style={{ padding:"24px 18px", textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>{classIcons[cls]}</div>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:17, marginBottom:6 }}>{cls}</div>
                <div style={{ color:"#8892A4", fontSize:12, marginBottom:12 }}>
                  {isDev ? "Under development" : `${LECTURES_DATA[cls].subjects.length} subjects`}
                </div>
                {totalLectures > 0 && <span className="badge badge-orange" style={{ fontSize:10 }}>{totalLectures} lectures live</span>}
                {isDev && <span className="badge badge-blue" style={{ fontSize:10 }}>🚧 Coming Soon</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// TESTS
function TestsPage({ user, openAuth, awardXP, progress }) {
  const [activeTest, setActiveTest] = useState(null);
  const [phase, setPhase] = useState("list"); // list | running | done
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [flagged, setFlagged] = useState({});

  useEffect(() => {
    if (phase !== "running") return;
    if (timeLeft <= 0) { setPhase("done"); return; }
    const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  const startTest = (test) => {
    if (!user) { openAuth(); return; }
    setActiveTest(test);
    setAnswers({});
    setFlagged({});
    setTimeLeft(test.duration * 60);
    setPhase("running");
  };

  if (phase === "running" && activeTest) {
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    const answered = Object.keys(answers).length;
    const flaggedCount = Object.values(flagged).filter(Boolean).length;

    return (
      <div className="fade-up" style={{ padding: "20px 20px 80px", maxWidth: 820, margin: "0 auto" }}>
        {/* Test Header */}
        <div className="card-static" style={{ padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "sticky", top: 68, zIndex: 50, backdropFilter: "blur(10px)", background: "rgba(19,25,41,.95)" }}>
          <div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16 }}>{activeTest.name}</div>
            <div style={{ color: "#8892A4", fontSize: 12, marginTop: 3 }}>
              ✅ {answered} answered &nbsp;·&nbsp; 🚩 {flaggedCount} flagged &nbsp;·&nbsp; ⬜ {SAMPLE_QS.length - answered} skipped
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ background: timeLeft < 60 ? "rgba(233,69,96,.2)" : "rgba(255,107,0,.12)", border: `1.5px solid ${timeLeft < 60 ? "#E94560" : "#FF6B00"}`, padding: "8px 16px", borderRadius: 10, fontFamily: "Syne", fontWeight: 800, fontSize: 20, color: timeLeft < 60 ? "#E94560" : "#FF6B00" }}>
              ⏱ {mm}:{ss}
            </div>
            <button className="btn-primary" onClick={() => { setPhase("done"); if(awardXP) awardXP("test"); }}>Submit</button>
          </div>
        </div>

        {/* Question Grid Nav */}
        <div className="card-static" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#8892A4", marginBottom: 10 }}>Question Navigator:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {SAMPLE_QS.map((_, qi) => (
              <div key={qi} onClick={() => document.getElementById(`q-${qi}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                style={{ width: 32, height: 32, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", background: flagged[qi] ? "rgba(233,69,96,.3)" : answers[qi] !== undefined ? "rgba(0,212,170,.2)" : "#1A2440", color: flagged[qi] ? "#E94560" : answers[qi] !== undefined ? "#00D4AA" : "#8892A4", border: `1.5px solid ${flagged[qi] ? "#E94560" : answers[qi] !== undefined ? "#00D4AA" : "#243154"}` }}>
                {qi + 1}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 11, color: "#5A6580", flexWrap: "wrap" }}>
            <span style={{ display: "flex", gap: 5, alignItems: "center" }}><span style={{ width: 12, height: 12, background: "rgba(0,212,170,.3)", borderRadius: 3, display: "inline-block" }} /> Answered</span>
            <span style={{ display: "flex", gap: 5, alignItems: "center" }}><span style={{ width: 12, height: 12, background: "rgba(233,69,96,.3)", borderRadius: 3, display: "inline-block" }} /> Flagged</span>
            <span style={{ display: "flex", gap: 5, alignItems: "center" }}><span style={{ width: 12, height: 12, background: "#1A2440", borderRadius: 3, display: "inline-block" }} /> Unattempted</span>
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SAMPLE_QS.map((q, qi) => (
            <div key={qi} id={`q-${qi}`} className="card-static" style={{ padding: 22, border: `1.5px solid ${answers[qi] !== undefined ? "rgba(0,212,170,.2)" : "#1A2440"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ background: "#FF6B00", color: "#fff", width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>Q{qi + 1}</div>
                  <span className={`badge ${q.sub === "Physics" ? "badge-blue" : q.sub === "Chemistry" ? "badge-green" : q.sub === "Maths" ? "badge-orange" : "badge-gold"}`}>{q.sub}</span>
                </div>
                <button onClick={() => setFlagged({ ...flagged, [qi]: !flagged[qi] })} style={{ background: flagged[qi] ? "rgba(233,69,96,.2)" : "rgba(255,255,255,.04)", border: `1px solid ${flagged[qi] ? "#E94560" : "#243154"}`, color: flagged[qi] ? "#E94560" : "#5A6580", padding: "4px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "DM Sans" }}>
                  🚩 {flagged[qi] ? "Flagged" : "Flag"}
                </button>
              </div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {q.opts.map((opt, oi) => (
                  <div key={oi} onClick={() => setAnswers({ ...answers, [qi]: oi })}
                    style={{ padding: "11px 16px", borderRadius: 10, border: `1.5px solid ${answers[qi] === oi ? "#FF6B00" : "#243154"}`, background: answers[qi] === oi ? "rgba(255,107,0,.1)" : "rgba(255,255,255,.02)", cursor: "pointer", fontSize: 14, transition: "all .15s", display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: "#FF6B00", fontWeight: 700, minWidth: 20 }}>{["A","B","C","D"][oi]}.</span> {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button className="btn-primary" style={{ flex: 1, padding: 14 }} onClick={() => { setPhase("done"); if(awardXP) awardXP("test"); }}>Submit Test →</button>
          <button className="btn-ghost" onClick={() => { setPhase("list"); setActiveTest(null); }}>Exit</button>
        </div>
      </div>
    );
  }

  if (phase === "done" && activeTest) {
    const score = SAMPLE_QS.filter((q, i) => answers[i] === q.ans).length;
    const wrong = Object.keys(answers).length - score;
    const skipped = SAMPLE_QS.length - Object.keys(answers).length;
    const pct = Math.round((score / SAMPLE_QS.length) * 100);

    return (
      <div className="fade-up" style={{ padding: "40px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{pct >= 70 ? "🏆" : pct >= 50 ? "👍" : "💪"}</div>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 30, marginBottom: 8 }}>Test Completed!</h2>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 60, color: pct >= 70 ? "#00D4AA" : pct >= 50 ? "#FF6B00" : "#E94560" }}>{pct}%</div>
          <div style={{ color: "#8892A4", marginTop: 4 }}>{score}/{SAMPLE_QS.length} correct · {activeTest.name}</div>
          <div style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,107,0,.1)", border:"1px solid rgba(255,107,0,.3)", borderRadius:12, padding:"8px 18px" }}><span style={{fontSize:20}}>⚡</span><span style={{fontFamily:"Syne",fontWeight:700,color:"#FF6B00",fontSize:16}}>+50 XP Earned!</span></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
          {[["✅", "Correct", score, "#00D4AA"], ["❌", "Wrong", wrong, "#E94560"], ["⏭", "Skipped", skipped, "#8892A4"], ["📊", "Score", `${pct}%`, "#FF6B00"]].map(([ico, l, v, c]) => (
            <div key={l} className="card" style={{ padding: "18px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{ico}</div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: c }}>{v}</div>
              <div style={{ color: "#8892A4", fontSize: 12 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Answer Review */}
        <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📋 Answer Review</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {SAMPLE_QS.map((q, qi) => {
            const userAns = answers[qi];
            const correct = userAns === q.ans;
            const attempted = userAns !== undefined;
            return (
              <div key={qi} className="card-static" style={{ padding: 18, borderLeft: `4px solid ${!attempted ? "#5A6580" : correct ? "#00D4AA" : "#E94560"}` }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}><strong>Q{qi + 1}.</strong> {q.q}</div>
                {attempted ? (
                  <div style={{ fontSize: 13, color: correct ? "#00D4AA" : "#E94560", marginBottom: 6 }}>
                    Your answer: <strong>{q.opts[userAns]}</strong> {correct ? "✅" : "❌"}
                  </div>
                ) : <div style={{ fontSize: 13, color: "#5A6580", marginBottom: 6 }}>Skipped ⏭</div>}
                {!correct && <div style={{ fontSize: 13, color: "#00D4AA" }}>Correct: <strong>{q.opts[q.ans]}</strong></div>}
                <div style={{ fontSize: 12, color: "#8892A4", marginTop: 8, padding: "8px 12px", background: "rgba(255,255,255,.03)", borderRadius: 8, lineHeight: 1.5 }}>💡 {q.exp}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-primary" style={{ flex: 1, padding: 14 }} onClick={() => { setPhase("list"); setActiveTest(null); }}>Back to Tests</button>
          <button className="btn-ghost" onClick={() => { setAnswers({}); setFlagged({}); setTimeLeft(activeTest.duration * 60); setPhase("running"); }}>🔄 Retry</button>
        </div>
      </div>
    );
  }

  // Test List
  return (
    <div className="fade-up" style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, marginBottom: 6 }}>Test Series</h2>
      <p style={{ color: "#8892A4", marginBottom: 28 }}>Practice with real exam-pattern tests · {!user && <span style={{ color: "#FF6B00" }}>Login to attempt</span>}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {TESTS.map(test => (
          <div key={test.id} className="card" style={{ padding: "20px 22px", display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span className={`badge ${test.type === "Full Test" ? "badge-orange" : test.type === "DPP" ? "badge-green" : "badge-blue"}`}>{test.type}</span>
                <span className={`badge ${test.difficulty === "Hard" ? "badge-red" : test.difficulty === "Medium" ? "badge-orange" : "badge-green"}`}>{test.difficulty}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 5 }}>{test.name}</div>
              <div style={{ color: "#8892A4", fontSize: 12 }}>📝 {test.questions} Qs &nbsp;·&nbsp; ⏱ {test.duration} min &nbsp;·&nbsp; 👥 {test.attempts} attempted</div>
            </div>
            <button className="btn-primary" onClick={() => startTest(test)}>
              {user ? "Start Test →" : "🔐 Login to Attempt"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// DASHBOARD
function DashboardPage({ user, goTo, progress, awardXP }) {
  const p = progress || { xp:0, level:1, lecturesDone:0, testsDone:0, hoursStudied:0, streak:1, batchProgress:{}, enrolledBatches:[] };
  const xpForNextLevel = p.level * 200;
  const xpBar = Math.min(100, Math.round((p.xp % 200) / 200 * 100));

  return (
    <div className="fade-up" style={{ padding: "28px 24px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Welcome + XP card */}
      <div style={{ background: "linear-gradient(135deg,#131929,#1A2440)", border: "1px solid rgba(255,107,0,.15)", borderRadius: 20, padding: "26px 28px", marginBottom: 28 }}>
        <div style={{ display:"flex", gap:18, alignItems:"center", flexWrap:"wrap", marginBottom:18 }}>
          <div style={{ width:58, height:58, background:"linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:"#fff", flexShrink:0 }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ color:"#8892A4", fontSize:13 }}>Welcome back! 👋</div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22 }}>{user.name}</div>
            <div style={{ color:"#8892A4", fontSize:12 }}>{user.email}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div className="badge badge-gold" style={{ fontSize:13, padding:"5px 14px" }}>🔥 {p.streak}-Day Streak</div>
            <div style={{ color:"#5A6580", fontSize:11, marginTop:5 }}>Level {p.level} · {p.xp} XP</div>
          </div>
        </div>
        {/* XP Progress Bar */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#5A6580", marginBottom:6 }}>
            <span>⚡ Level {p.level}</span>
            <span>{p.xp % 200} / 200 XP → Level {p.level+1}</span>
          </div>
          <div className="progress-bar" style={{ height:10 }}>
            <div className="progress-fill" style={{ width:`${xpBar}%`, background:"linear-gradient(90deg,#FF6B00,#FFD700)" }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14, marginBottom:30 }}>
        {[
          ["📺","Lectures Done", p.lecturesDone, "+20 XP each"],
          ["⏱","Hours Studied", p.hoursStudied+"h", ""],
          ["📝","Tests Taken", p.testsDone, "+50 XP each"],
          ["⭐","Total XP", p.xp+" pts", `Level ${p.level}`],
        ].map(([ico, l, v, sub]) => (
          <div key={l} className="card" style={{ padding:"20px 18px" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{ico}</div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, marginBottom:2, color:"#FF6B00" }}>{v}</div>
            <div style={{ color:"#5A6580", fontSize:12 }}>{l}</div>
            {sub && <div style={{ color:"#00D4AA", fontSize:11, marginTop:4 }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* My Batches - all with 0% progress */}
      <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, marginBottom:16 }}>📦 All Batches (Progress)</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:13, marginBottom:30 }}>
        {BATCHES.map(b => {
          const bProg = p.batchProgress[b.id] || 0;
          return (
            <div key={b.id} className="card" style={{ padding:"20px 22px" }}>
              <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
                <div style={{ fontSize:32 }}>{b.icon}</div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:600, fontSize:14, marginBottom:3 }}>{b.name}</div>
                  <div style={{ color:"#8892A4", fontSize:12, marginBottom:8 }}>👨‍🏫 {b.instructor} · {b.duration}</div>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div className="progress-bar" style={{ flex:1 }}>
                      <div className="progress-fill" style={{ width:`${bProg}%` }} />
                    </div>
                    <span style={{ fontSize:13, color:"#FF6B00", fontWeight:600, minWidth:40 }}>{bProg}%</span>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
                  <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:15, color:"#FF6B00" }}>₹{b.price}</span>
                  <button className="btn-ghost" style={{ fontSize:12 }} onClick={() => goTo("lectures")}>Continue →</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access */}
      <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, marginBottom:16 }}>⚡ Quick Access</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:12, marginBottom:30 }}>
        {[
          ["📝","Attempt Test (+50 XP)",() => goTo("tests")],
          ["🎬","Watch Lecture (+20 XP)",() => goTo("lectures")],
          ["📦","Browse Batches",() => goTo("batches")],
          ["🤖","Ask Obi AI",() => document.getElementById("obi-ai-btn")?.click()],
        ].map(([ico, l, fn]) => (
          <div key={l} className="card" style={{ padding:"18px 14px", textAlign:"center", cursor:"pointer" }} onClick={fn}>
            <div style={{ fontSize:26, marginBottom:8 }}>{ico}</div>
            <div style={{ fontSize:11, fontWeight:600, color:"#E8E8F0", lineHeight:1.4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard mini */}
      <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, marginBottom:16 }}>🏅 Leaderboard (This Week)</h3>
      <div className="card-static" style={{ padding:"16px 20px" }}>
        {[["Rahul M.","JEE",980,"🥇"],["Priya K.","NEET",945,"🥈"],["Arjun S.","JEE",912,"🥉"],["Sneha T.","Class 12",878,"4️⃣"]].map(([name, batch, pts, medal], i) => (
          <div key={name} className="leaderboard-row">
            <div style={{ fontSize:18, minWidth:28 }}>{medal}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:14 }}>{name}</div>
              <div style={{ fontSize:11, color:"#5A6580" }}>{batch}</div>
            </div>
            <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, color:i===0?"#FFD700":"#8892A4" }}>{pts} pts</div>
          </div>
        ))}
        {/* User row */}
        <div className="leaderboard-row" style={{ background:"rgba(255,107,0,.05)", borderRadius:10 }}>
          <div style={{ fontSize:18, minWidth:28 }}>—</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, fontSize:14, color:"#FF6B00" }}>{user.name} (You)</div>
            <div style={{ fontSize:11, color:"#5A6580" }}>Level {p.level}</div>
          </div>
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, color:"#FF6B00" }}>{p.xp} pts</div>
        </div>
      </div>
    </div>
  );
}


// ── CLASS 10 PYQ DATA ────────────────────────────────────────────────────────
const CLASS10_PYQ = {
  Science: [
    { year: 2024, title: "Science Board Paper 2024", questions: 39, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Chemical Reactions", "Life Processes", "Light", "Electricity", "Environment"] },
    { year: 2023, title: "Science Board Paper 2023", questions: 39, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Acids & Bases", "Metals", "Reproduction", "Magnetic Effects", "Heredity"] },
    { year: 2022, title: "Science Board Paper 2022", questions: 39, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Carbon Compounds", "Control & Coordination", "Human Eye", "Electricity"] },
    { year: 2021, title: "Science Board Paper 2021 (Term 1)", questions: 60, marks: 90, time: "3 hrs", type: "MCQ Based", difficulty: "Easy", topics: ["All Chapters MCQ"] },
    { year: 2020, title: "Science Board Paper 2020", questions: 39, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Chemical Reactions", "Life Processes", "Light", "Our Environment"] },
    { year: 2019, title: "Science Board Paper 2019", questions: 36, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Metals & Non-Metals", "Heredity", "Light Refraction"] },
    { year: 2018, title: "Science Board Paper 2018", questions: 36, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Acids Bases Salts", "Carbon Compounds", "Magnetic Effects"] },
  ],
  Mathematics: [
    { year: 2024, title: "Maths Standard Board Paper 2024", questions: 38, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Real Numbers", "Polynomials", "Quadratics", "Triangles", "Circles", "Statistics"] },
    { year: 2024, title: "Maths Basic Board Paper 2024", questions: 38, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Arithmetic", "Geometry", "Probability"] },
    { year: 2023, title: "Maths Standard Board Paper 2023", questions: 38, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Trigonometry", "Coordinate Geometry", "Constructions"] },
    { year: 2022, title: "Maths Standard Board Paper 2022", questions: 38, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["AP & GP", "Quadratic Equations", "Height & Distance"] },
    { year: 2021, title: "Maths Board Paper 2021 (Term 1)", questions: 50, marks: 40, time: "90 min", type: "MCQ Based", difficulty: "Easy", topics: ["All Chapter MCQ"] },
    { year: 2020, title: "Maths Standard Board Paper 2020", questions: 40, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Polynomials", "Triangles", "Circles", "Statistics", "Probability"] },
    { year: 2019, title: "Maths Standard Board Paper 2019", questions: 36, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Real Numbers", "Trigonometry", "Areas"] },
  ],
  English: [
    { year: 2024, title: "English Language & Literature 2024", questions: 11, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Reading", "Writing", "Grammar", "Literature — First Flight", "Footprints Without Feet"] },
    { year: 2023, title: "English Language & Literature 2023", questions: 11, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Letter Writing", "Comprehension", "Chapters from First Flight"] },
    { year: 2022, title: "English Language & Literature 2022", questions: 11, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Essay Writing", "Grammar", "Poem — Amanda, Dust of Snow"] },
    { year: 2021, title: "English Term 1 Paper 2021", questions: 45, marks: 40, time: "90 min", type: "MCQ Based", difficulty: "Easy", topics: ["MCQ Reading & Literature"] },
    { year: 2020, title: "English Language & Literature 2020", questions: 11, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Notice Writing", "Chapters — Nelson Mandela, The Thief's Story"] },
    { year: 2019, title: "English Language & Literature 2019", questions: 11, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Formal Letter", "Comprehension", "Literature — Kite"] },
  ],
  Hindi: [
    { year: 2024, title: "Hindi A Board Paper 2024", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Apathit Gadyansh", "Vyakaran", "Kshitij — Pad, Ram-Lakshman-Parshuram Samvad", "Kritika"] },
    { year: 2024, title: "Hindi B Board Paper 2024", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Apathit Bodh", "Rachnatmak Lekhan", "Sparsh", "Sanchayan"] },
    { year: 2023, title: "Hindi A Board Paper 2023", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Anuched Lekhan", "Surdas ke Pad", "Vyakaran — Sandhi, Samas"] },
    { year: 2022, title: "Hindi A Board Paper 2022", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Patra Lekhan", "Kavi Parichay", "Vyakaran"] },
    { year: 2021, title: "Hindi A Term 1 Paper 2021", questions: 40, marks: 40, time: "90 min", type: "MCQ Based", difficulty: "Easy", topics: ["MCQ Vyakaran & Sahitya"] },
    { year: 2020, title: "Hindi A Board Paper 2020", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Apathit Padyansh", "Bihari ke Dohe", "Surdas", "Rachna — Nibandh"] },
    { year: 2019, title: "Hindi A Board Paper 2019", questions: 14, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Kabir ke Dohe", "Patra Lekhan", "Sandhi Viched"] },
  ],
  "Social Science": [
    { year: 2024, title: "Social Science Board Paper 2024", questions: 37, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["History — Nationalism", "Geography — Resources", "Civics — Power Sharing", "Economics — Development"] },
    { year: 2023, title: "Social Science Board Paper 2023", questions: 37, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Federalism", "Water Resources", "Age of Industrialisation", "Money & Credit"] },
    { year: 2022, title: "Social Science Board Paper 2022", questions: 37, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Easy", topics: ["Nationalism in India", "Forest Resources", "Political Parties", "Globalisation"] },
    { year: 2021, title: "Social Science Term 1 Paper 2021", questions: 60, marks: 40, time: "90 min", type: "MCQ Based", difficulty: "Easy", topics: ["All Topics MCQ"] },
    { year: 2020, title: "Social Science Board Paper 2020", questions: 35, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Hard", topics: ["Map Work", "Print Culture", "Dams", "Democracy"] },
    { year: 2019, title: "Social Science Board Paper 2019", questions: 35, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Minerals", "Indo China", "Gender Religion", "Consumer Rights"] },
    { year: 2018, title: "Social Science Board Paper 2018", questions: 35, marks: 80, time: "3 hrs", type: "Full Paper", difficulty: "Medium", topics: ["Manufacturing Industries", "Pastoralists", "Outcomes of Democracy"] },
  ],
};

// PYQ PAGE COMPONENT
function PYQPage({ user, openAuth, onBack }) {
  const [activeSubject, setActiveSubject] = useState("Science");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const subjects = ["Science", "Mathematics", "English", "Hindi", "Social Science"];
  const subjectIcons = { Science:"🔬", Mathematics:"📐", English:"📖", Hindi:"📜", "Social Science":"🌏" };
  const subjectColors = { Science:"#E94560", Mathematics:"#4A90E2", English:"#00D4AA", Hindi:"#FF6B00", "Social Science":"#9B59B6" };
  const papers = CLASS10_PYQ[activeSubject] || [];

  return (
    <div className="fade-up" style={{ padding:"32px 24px 60px", maxWidth:1100, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.05)", border:"1px solid #1A2440", color:"#8892A4", cursor:"pointer", borderRadius:10, padding:"8px 14px", fontSize:20, lineHeight:1 }}>←</button>
        <div style={{ width:44, height:44, background:"linear-gradient(135deg,#9B59B6,#6C3483)", borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📚</div>
        <div>
          <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:26, lineHeight:1 }}>Previous Year Papers</h2>
          <p style={{ color:"#8892A4", fontSize:13, marginTop:3 }}>Class 10 CBSE — 2018 to 2024 · Solved Papers</p>
        </div>
      </div>

      {/* Class 10 Banner */}
      <div style={{ background:"linear-gradient(135deg,#131929,#1A2440)", border:"1px solid rgba(155,89,182,.3)", borderRadius:16, padding:"18px 22px", marginBottom:28, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
        <div style={{ fontSize:40 }}>🎓</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#E8E8F0" }}>Class 10 — CBSE Board Papers</div>
          <div style={{ color:"#8892A4", fontSize:13, marginTop:3 }}>7 years of solved papers · English, Hindi, Maths, Science, SST</div>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <span className="badge badge-orange">2018–2024</span>
          <span className="badge badge-green">35 Papers</span>
          <span className="badge badge-blue">FREE</span>
        </div>
      </div>

      {/* Subject Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
        {subjects.map(s => (
          <button key={s} className={`tab-btn ${activeSubject===s?"active":""}`}
            onClick={() => setActiveSubject(s)}
            style={{ display:"flex", alignItems:"center", gap:6, position:"relative" }}>
            <span>{subjectIcons[s]}</span> {s}
            <span style={{ position:"absolute", top:-6, right:-4, background: activeSubject===s?"#fff":"#FF6B00", color: activeSubject===s?"#FF6B00":"#fff", borderRadius:"50%", width:16, height:16, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {CLASS10_PYQ[s]?.length}
            </span>
          </button>
        ))}
      </div>

      {/* Login Banner */}
      {!user && (
        <div style={{ background:"linear-gradient(135deg,#131929,#1A2440)", border:"1px solid rgba(255,107,0,.25)", borderRadius:16, padding:"16px 20px", marginBottom:24, display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ fontSize:28 }}>🔐</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>Login Required</div>
            <div style={{ color:"#8892A4", fontSize:12.5 }}>Papers view & download ke liye free account banao.</div>
          </div>
          <button className="btn-primary" style={{ fontSize:13, padding:"9px 18px" }} onClick={openAuth}>Login Free →</button>
        </div>
      )}

      {/* Papers List */}
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {papers.map((p, i) => (
          <div key={i} className="card" style={{ padding:0, overflow:"hidden", animation:`fadeUp .3s ease ${i*0.06}s both` }}>
            <div style={{ height:4, background:`linear-gradient(90deg,${subjectColors[activeSubject]},${subjectColors[activeSubject]}44)` }} />
            <div style={{ padding:"18px 20px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
              {/* Year Badge */}
              <div style={{ width:60, height:60, background:`linear-gradient(135deg,${subjectColors[activeSubject]}22,${subjectColors[activeSubject]}08)`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", border:`1.5px solid ${subjectColors[activeSubject]}33`, flexShrink:0 }}>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:16, color:subjectColors[activeSubject] }}>{p.year}</div>
                <div style={{ fontSize:9, color:"#5A6580" }}>CBSE</div>
              </div>
              {/* Info */}
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap", alignItems:"center" }}>
                  <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:14 }}>{p.title}</div>
                  <span className={`badge ${p.difficulty==="Hard"?"badge-red":p.difficulty==="Medium"?"badge-orange":"badge-green"}`} style={{ fontSize:9 }}>{p.difficulty}</span>
                  {p.type==="MCQ Based" && <span className="badge badge-blue" style={{ fontSize:9 }}>MCQ</span>}
                </div>
                <div style={{ color:"#8892A4", fontSize:12, marginBottom:8 }}>
                  📝 {p.questions} Questions &nbsp;·&nbsp; 🏆 {p.marks} Marks &nbsp;·&nbsp; ⏱ {p.time}
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {p.topics.slice(0,4).map((t,ti) => (
                    <span key={ti} style={{ fontSize:10, padding:"2px 8px", background:"rgba(255,255,255,.04)", border:"1px solid #1A2440", borderRadius:20, color:"#8892A4" }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Actions */}
              <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
                <button className="btn-primary" style={{ fontSize:12, padding:"8px 16px", display:"flex", alignItems:"center", gap:6 }}
                  onClick={() => { if(!user){openAuth();return;} setSelectedPaper(p); }}>
                  👁️ View Paper
                </button>
                <button className="btn-secondary" style={{ fontSize:12, padding:"8px 16px", display:"flex", alignItems:"center", gap:6 }}
                  onClick={() => { if(!user){openAuth();return;} alert("PDF download — connect your PDF link here!"); }}>
                  ⬇️ Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paper Preview Modal */}
      {selectedPaper && (
        <div className="modal-overlay" onClick={() => setSelectedPaper(null)}>
          <div className="modal-box" style={{ maxWidth:500 }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:46, height:46, background:`linear-gradient(135deg,${subjectColors[activeSubject]},${subjectColors[activeSubject]}88)`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{subjectIcons[activeSubject]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:16 }}>{selectedPaper.title}</div>
                <div style={{ color:"#8892A4", fontSize:12 }}>CBSE Class 10 Board Exam</div>
              </div>
              <button onClick={()=>setSelectedPaper(null)} style={{ background:"none", border:"none", color:"#5A6580", cursor:"pointer", fontSize:20 }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
              {[["📅","Year",selectedPaper.year],["📝","Questions",selectedPaper.questions],["🏆","Marks",selectedPaper.marks],["⏱","Duration",selectedPaper.time]].map(([ico,l,v])=>(
                <div key={l} style={{ background:"#0A0A14", borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{ico}</div>
                  <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, color:"#FF6B00" }}>{v}</div>
                  <div style={{ color:"#5A6580", fontSize:11 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:13, marginBottom:10 }}>📌 Topics Covered:</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
              {selectedPaper.topics.map((t,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"#0A0A14", borderRadius:8, fontSize:13 }}>
                  <span style={{ color:subjectColors[activeSubject] }}>✓</span> {t}
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(255,107,0,.07)", border:"1px solid rgba(255,107,0,.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#8892A4", marginBottom:16 }}>
              🤖 <strong style={{ color:"#FF6B00" }}>Obi Tip:</strong> Start with the last 3 years papers — pattern samajhna sabse important hai!
            </div>
            <button className="btn-primary" style={{ width:"100%", padding:13 }}
              onClick={() => alert("Coming soon! PDF will be available here.")}>
              ⬇️ Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ACADEMIC
const ACADEMIC_ITEMS = [
  { id: "notes", icon: "📝", label: "Best Notes", desc: "Chapter-wise handwritten & typed notes", color: "#FF6B00", badge: "FREE" },
  { id: "oneshot", icon: "🎯", label: "One Shot Lectures", desc: "Complete chapter in 1 video", color: "#E94560", badge: "HOT" },
  { id: "ncert", icon: "📗", label: "NCERT Solution", desc: "Step-by-step NCERT answers", color: "#00D4AA", badge: "" },
  { id: "strategy", icon: "🏹", label: "Strategy Video", desc: "Toppers' proven exam strategies", color: "#4A90E2", badge: "NEW" },
  { id: "miq", icon: "⭐", label: "Most Important Questions", desc: "High-probability exam questions", color: "#FFD700", badge: "MUST" },
  { id: "pyp", icon: "📚", label: "Previous Year Papers", desc: "Last 10 years solved papers", color: "#9B59B6", badge: "" },
  { id: "sample", icon: "📋", label: "Sample Papers", desc: "Latest pattern practice papers", color: "#E67E22", badge: "" },
  { id: "ncertbooks", icon: "📖", label: "NCERT Books (Latest)", desc: "Download latest NCERT books", color: "#27AE60", badge: "2025" },
  { id: "exemplar", icon: "🔖", label: "NCERT Exemplar Solutions", desc: "Advanced NCERT exemplar solved", color: "#E94560", badge: "" },
];

// NOTES DATA — Subject → Chapters → PDF
const NOTES_DATA = {
  Science: [
    {
      id: "chem-reactions",
      chapter: "Ch 1 — Chemical Reactions & Equations",
      subject: "Science", pages: 8, badge: "FREE", thumbnail: "🧪", color: "#E94560",
      pdfUrl: "Chemical_Reactions_Equations.pdf",
      desc: "Chemical reactions, balancing equations, types of reactions, corrosion & rancidity",
      topics: ["Chemical Reaction & its types", "Balancing Equations (Hit & Trial)", "Combination & Decomposition", "Displacement & Double Displacement", "Oxidation, Reduction & Redox", "Exothermic & Endothermic Reactions", "Corrosion & Rancidity"],
      tip: "Balancing equations mein atoms count karo — pehle metals, phir non-metals, last mein H aur O!",
    },
    {
      id: "acid-base",
      chapter: "Ch 2 — Acid, Base & Salt",
      subject: "Science", pages: 15, badge: "FREE", thumbnail: "⚗️", color: "#00D4AA",
      pdfUrl: "Acid_Base_Salt.pdf",
      desc: "Properties of acids & bases, pH scale, salts, baking soda, bleaching powder, POP",
      topics: ["Properties of Acids & Bases", "Chemical Reactions of Acids", "Strength of Acid & Base (pH)", "pH Scale & Daily Life importance", "Salts — Types & Properties", "Bleaching Powder & Baking Soda", "Washing Soda & Plaster of Paris"],
      tip: "pH < 7 = Acid, pH > 7 = Base, pH = 7 = Neutral — yaad rakho isse board mein zaroor aata hai!",
    },
    {
      id: "metals",
      chapter: "Ch 3 — Metals & Non-Metals",
      subject: "Science", pages: 15, badge: "FREE", thumbnail: "⚙️", color: "#4A90E2",
      pdfUrl: "Metals_NonMetals.pdf",
      desc: "Physical & chemical properties, reactivity series, ionic compounds, corrosion",
      topics: ["Physical & Chemical Properties of Metals", "Reaction with O₂, Water & Acids", "Reactivity Series of Metals", "Ionic Compounds & their Properties", "Extraction of Metals from Ores", "Electrolytic Refining", "Corrosion & Alloys"],
      tip: "Reactivity series: K Na Ca Mg Al Zn Fe Pb H Cu Hg Ag Au — 'King Nakli Captain Mange Aloo Zada Fry Phir Haath Chal Hila Sab Aaye'",
    },
    {
      id: "carbon",
      chapter: "Ch 4 — Carbon & Its Compounds",
      subject: "Science", pages: 26, badge: "FREE", thumbnail: "💎", color: "#9B59B6",
      pdfUrl: "Carbon_Compounds.pdf",
      desc: "Covalent bonds, allotropes, hydrocarbons, functional groups, soaps & detergents",
      topics: ["Covalent Bonding & Carbon Properties", "Allotropes — Diamond, Graphite, Fullerene", "Hydrocarbons — Saturated & Unsaturated", "IUPAC Nomenclature", "Functional Groups & Homologous Series", "Ethanol & Ethanoic Acid", "Soaps, Detergents & Cleansing Action"],
      tip: "Functional groups yaad karo: -OH (alcohol), -COOH (acid), -CHO (aldehyde), -CO- (ketone) — inpe 3-4 marks pakke hain!",
    },
    {
      id: "life-process",
      chapter: "Ch 6 — Life Processes",
      subject: "Science", pages: 18, badge: "FREE", thumbnail: "🌱", color: "#27AE60",
      pdfUrl: "Life_Processes.pdf",
      desc: "Nutrition, respiration, transportation & excretion in plants and animals",
      topics: ["Nutrition — Autotrophic & Heterotrophic", "Photosynthesis (Light & Dark Reaction)", "Respiration — Aerobic & Anaerobic", "Human Digestive System", "Transportation in Plants (Xylem & Phloem)", "Human Circulatory System & Heart", "Excretion — Kidney, Dialysis, Plants"],
      tip: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ — ye equation board mein 2 marks ka pakka hai!",
    },
    {
      id: "control-coordination",
      chapter: "Ch 7 — Control & Coordination",
      subject: "Science", pages: 16, badge: "FREE", thumbnail: "🧠", color: "#E94560",
      pdfUrl: "Control_Coordination.pdf",
      desc: "Nervous system, brain, reflex action, hormones & endocrine glands",
      topics: ["Nervous System — Neurons & Types", "Reflex Action & Reflex Arc", "Human Brain — Parts & Functions", "Sense Organs", "Coordination in Plants (Tropism)", "Hormones & Endocrine Glands", "Feedback Mechanism"],
      tip: "Reflex arc ka diagram banana practice karo — board mein almost every year 3-4 marks ka aata hai!",
    },
    {
      id: "reproduction",
      chapter: "Ch 8 — How do Organisms Reproduce?",
      subject: "Science", pages: 14, badge: "FREE", thumbnail: "🔬", color: "#FF6B00",
      pdfUrl: "Reproduction.pdf",
      desc: "Asexual & sexual reproduction, human reproductive system, contraception",
      topics: ["Asexual Reproduction — Fission, Budding, Spores", "Vegetative Propagation in Plants", "Sexual Reproduction in Flowering Plants", "Pollination & Fertilisation", "Human Male Reproductive System", "Human Female Reproductive System", "Contraception & Reproductive Health"],
      tip: "Diagrams — male & female reproductive system dono draw karna seekho, 5 marks ke diagrams aate hain board mein!",
    },
    {
      id: "heredity",
      chapter: "Ch 9 — Heredity & Evolution",
      subject: "Science", pages: 16, badge: "FREE", thumbnail: "🧬", color: "#00D4AA",
      pdfUrl: "Heredity.pdf",
      desc: "Mendel's laws, DNA, chromosomes, evolution, Darwin's theory & fossils",
      topics: ["Mendel's Experiments & Laws", "Monohybrid & Dihybrid Cross", "Dominant & Recessive Traits", "Sex Determination in Humans", "DNA & Chromosomes", "Evolution — Darwin's Natural Selection", "Fossils & Homologous/Analogous Organs"],
      tip: "Monohybrid cross: Tt × Tt = 3:1 ratio (3 dominant : 1 recessive) — Punnett square banana zaroor seekho!",
    },
    {
      id: "light",
      chapter: "Ch 10 — Light — Reflection & Refraction",
      subject: "Science", pages: 20, badge: "FREE", thumbnail: "💡", color: "#FFD700",
      pdfUrl: "Light.pdf",
      desc: "Laws of reflection, mirrors, lenses, refraction, prism & human eye optics",
      topics: ["Laws of Reflection & Mirror Formula", "Concave & Convex Mirror — Ray Diagrams", "Mirror Formula: 1/v + 1/u = 1/f", "Refraction & Snell's Law", "Convex & Concave Lens — Ray Diagrams", "Lens Formula & Magnification", "Power of Lens (P = 1/f)"],
      tip: "Sign convention yaad karo — distances incident ray ki direction mein positive, opposite mein negative. Mirror formula numericals mein 5 marks milte hain!",
    },
    {
      id: "human-eye",
      chapter: "Ch 11 — Human Eye & Colourful World",
      subject: "Science", pages: 12, badge: "FREE", thumbnail: "👁️", color: "#4A90E2",
      pdfUrl: "Human_Eye.pdf",
      desc: "Human eye structure, defects of vision, dispersion of light, scattering & atmosphere",
      topics: ["Human Eye — Structure & Working", "Accommodation & Power of Accommodation", "Defects — Myopia, Hypermetropia, Presbyopia", "Correction of Vision Defects", "Dispersion of Light through Prism", "Atmospheric Refraction & Twinkling of Stars", "Scattering of Light — Blue Sky & Red Sunset"],
      tip: "Blue sky aur red sunset ka ek hi reason hai — Rayleigh Scattering! Chhoti wavelength (blue) zyada scatter hoti hai — ye 2 marks ka theory question almost every year!",
    },
    {
      id: "electricity",
      chapter: "Ch 12 — Electricity",
      subject: "Science", pages: 22, badge: "FREE", thumbnail: "⚡", color: "#E67E22",
      pdfUrl: "Electricity.pdf",
      desc: "Ohm's law, resistance, series & parallel circuits, heating effect, electric power",
      topics: ["Electric Charge & Current", "Ohm's Law: V = IR", "Resistance & Resistivity", "Series & Parallel Combination of Resistors", "Kirchhoff's Laws", "Heating Effect — Joule's Law (H=I²Rt)", "Electric Power & Energy (P=VI)"],
      tip: "Series mein R_total = R₁+R₂+R₃ aur Parallel mein 1/R = 1/R₁+1/R₂ — numericals mein ye formula lagana zaroor practice karo, 5 marks pakke!",
    },
    {
      id: "magnetic-effect",
      chapter: "Ch 13 — Magnetic Effects of Electric Current",
      subject: "Science", pages: 14, badge: "FREE", thumbnail: "🧲", color: "#9B59B6",
      pdfUrl: "Magnetic_Effects.pdf",
      desc: "Magnetic field, electromagnet, motor, generator, AC/DC, domestic circuits",
      topics: ["Magnetic Field & Field Lines", "Oersted's Experiment", "Right Hand Thumb Rule", "Force on Current-Carrying Conductor", "Fleming's Left Hand Rule (Motor)", "Electric Motor — Working & Diagram", "Electromagnetic Induction & Generator", "Domestic Electric Circuits & Safety"],
      tip: "Fleming's Left Hand Rule = Motor (force), Fleming's Right Hand Rule = Generator (current) — dono haath alag hain, confuse mat hona board mein!",
    },
    {
      id: "environment",
      chapter: "Ch 15 — Our Environment",
      subject: "Science", pages: 10, badge: "FREE", thumbnail: "🌍", color: "#27AE60",
      pdfUrl: "Environment.pdf",
      desc: "Ecosystem, food chains, ozone layer, biodegradable & non-biodegradable waste",
      topics: ["Ecosystem — Components & Types", "Food Chain & Food Web", "Trophic Levels & Energy Flow (10% Rule)", "Biodegradable & Non-Biodegradable Waste", "Ozone Layer — Formation & Depletion", "Environmental Problems & Solutions", "Biological Magnification"],
      tip: "10% Energy Rule — ek trophic level se doosre mein sirf 10% energy transfer hoti hai. Agar producers mein 10,000 J hai toh primary consumer ko sirf 1000 J milegi!",
    },
  ],
  Maths: [],
  "Social Science": [],
};

// PDF VIEWER COMPONENT
function PdfModal({ chapter, onClose }) {
  const [mode, setMode] = useState("preview"); // preview | view
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 700, width: "95vw", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18, flexShrink: 0 }}>
          <div style={{ width: 50, height: 50, background: `linear-gradient(135deg,${chapter.color},${chapter.color}88)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{chapter.thumbnail}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, lineHeight: 1.3, marginBottom: 4 }}>{chapter.chapter}</div>
            <div style={{ color: "#8892A4", fontSize: 12.5 }}>{chapter.desc}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#5A6580", cursor: "pointer", fontSize: 22, flexShrink: 0, lineHeight: 1 }}>✕</button>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexShrink: 0, flexWrap: "wrap" }}>
          <span className="badge badge-orange">📄 {chapter.pages} Pages</span>
          <span className="badge badge-green">✅ {chapter.badge}</span>
          <span className="badge badge-blue">📚 Class 10</span>
          <span className="badge" style={{ background: "rgba(155,89,182,.13)", color: "#9B59B6" }}>🔬 {chapter.subject}</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexShrink: 0 }}>
          <button className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            onClick={() => { if(chapter.pdfUrl) setMode(mode === "view" ? "preview" : "view"); }}
            disabled={!chapter.pdfUrl} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity: chapter.pdfUrl ? 1 : 0.5 }}>
            {mode === "view" ? "📋 Preview" : chapter.pdfUrl ? "👁️ View PDF" : "👁️ Preview Only"}
          </button>
          {chapter.pdfUrl ? (
            <a href={chapter.pdfUrl} download style={{ textDecoration: "none", flex: 1 }}>
              <button className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                ⬇️ Download PDF
              </button>
            </a>
          ) : (
            <button className="btn-secondary" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:0.5, cursor:"not-allowed" }} disabled>
              🔜 PDF Coming Soon
            </button>
          )}
        </div>

        {/* PDF Viewer or Preview */}
        {mode === "view" ? (
          <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: "hidden", border: "1px solid #1A2440" }}>
            <iframe src={chapter.pdfUrl} style={{ width: "100%", height: "100%", minHeight: 420, border: "none", background: "#fff" }} title={chapter.chapter} />
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {/* Visual Preview Card */}
            <div style={{ background: "linear-gradient(135deg,#131929,#0D1526)", borderRadius: 14, border: `1px solid ${chapter.color}33`, overflow: "hidden" }}>
              {/* Thumbnail Banner */}
              <div style={{ height: 160, background: `linear-gradient(135deg,${chapter.color}22,${chapter.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, borderBottom: "1px solid #1A2440" }}>
                <div style={{ fontSize: 64 }}>{chapter.thumbnail}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, textAlign: "center", padding: "0 20px" }}>{chapter.chapter}</div>
              </div>
              {/* Info */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ color: "#8892A4", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>{chapter.desc}</div>
                {/* Topics covered */}
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, marginBottom: 12, color: "#E8E8F0" }}>📌 Topics Covered:</div>
                {chapter.topics && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {chapter.topics.map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#0A0A14", borderRadius: 8, fontSize: 13 }}>
                        <span style={{ color: chapter.color }}>✓</span> {t}
                      </div>
                    ))}
                  </div>
                )}
                {/* Obi Tip */}
                {chapter.tip && (
                  <div style={{ marginTop: 20, background: "rgba(255,107,0,.07)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#8892A4", lineHeight: 1.6 }}>
                    🤖 <strong style={{ color: "#FF6B00" }}>Obi Tip:</strong> {chapter.tip}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// PDF VIEWER COMPONENT
function PdfModal({ chapter, onClose }) {
  const [mode, setMode] = useState("preview"); // preview | view
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 700, width: "95vw", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18, flexShrink: 0 }}>
          <div style={{ width: 50, height: 50, background: `linear-gradient(135deg,${chapter.color},${chapter.color}88)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{chapter.thumbnail}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, lineHeight: 1.3, marginBottom: 4 }}>{chapter.chapter}</div>
            <div style={{ color: "#8892A4", fontSize: 12.5 }}>{chapter.desc}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#5A6580", cursor: "pointer", fontSize: 22, flexShrink: 0, lineHeight: 1 }}>✕</button>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexShrink: 0, flexWrap: "wrap" }}>
          <span className="badge badge-orange">📄 {chapter.pages} Pages</span>
          <span className="badge badge-green">✅ {chapter.badge}</span>
          <span className="badge badge-blue">📚 Class 10</span>
          <span className="badge" style={{ background: "rgba(155,89,182,.13)", color: "#9B59B6" }}>🔬 {chapter.subject}</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexShrink: 0 }}>
          <button className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            onClick={() => { if(chapter.pdfUrl) setMode(mode === "view" ? "preview" : "view"); }}
            disabled={!chapter.pdfUrl} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity: chapter.pdfUrl ? 1 : 0.5 }}>
            {mode === "view" ? "📋 Preview" : chapter.pdfUrl ? "👁️ View PDF" : "👁️ Preview Only"}
          </button>
          {chapter.pdfUrl ? (
            <a href={chapter.pdfUrl} download style={{ textDecoration: "none", flex: 1 }}>
              <button className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                ⬇️ Download PDF
              </button>
            </a>
          ) : (
            <button className="btn-secondary" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:0.5, cursor:"not-allowed" }} disabled>
              🔜 PDF Coming Soon
            </button>
          )}
        </div>

        {/* PDF Viewer or Preview */}
        {mode === "view" ? (
          <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: "hidden", border: "1px solid #1A2440" }}>
            <iframe src={chapter.pdfUrl} style={{ width: "100%", height: "100%", minHeight: 420, border: "none", background: "#fff" }} title={chapter.chapter} />
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {/* Visual Preview Card */}
            <div style={{ background: "linear-gradient(135deg,#131929,#0D1526)", borderRadius: 14, border: `1px solid ${chapter.color}33`, overflow: "hidden" }}>
              {/* Thumbnail Banner */}
              <div style={{ height: 160, background: `linear-gradient(135deg,${chapter.color}22,${chapter.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, borderBottom: "1px solid #1A2440" }}>
                <div style={{ fontSize: 64 }}>{chapter.thumbnail}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, textAlign: "center", padding: "0 20px" }}>{chapter.chapter}</div>
              </div>
              {/* Info */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ color: "#8892A4", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>{chapter.desc}</div>
                {/* Topics covered */}
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, marginBottom: 12, color: "#E8E8F0" }}>📌 Topics Covered:</div>
                {chapter.topics && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {chapter.topics.map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#0A0A14", borderRadius: 8, fontSize: 13 }}>
                        <span style={{ color: chapter.color }}>✓</span> {t}
                      </div>
                    ))}
                  </div>
                )}
                {/* Obi Tip */}
                {chapter.tip && (
                  <div style={{ marginTop: 20, background: "rgba(255,107,0,.07)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#8892A4", lineHeight: 1.6 }}>
                    🤖 <strong style={{ color: "#FF6B00" }}>Obi Tip:</strong> {chapter.tip}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// NOTES PAGE COMPONENT
function NotesPage({ user, openAuth, onBack }) {
  const [activeSubject, setActiveSubject] = useState("Science");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const subjects = ["Science", "Maths", "Social Science"];
  const chapters = NOTES_DATA[activeSubject] || [];

  return (
    <div className="fade-up" style={{ padding: "32px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Back + Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.05)", border: "1px solid #1A2440", color: "#8892A4", cursor: "pointer", borderRadius: 10, padding: "8px 14px", fontSize: 20, lineHeight: 1 }}>←</button>
        <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📝</div>
        <div>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, lineHeight: 1 }}>Best Notes</h2>
          <p style={{ color: "#8892A4", fontSize: 13, marginTop: 3 }}>Handwritten notes by Anmol Thakur — completely free!</p>
        </div>
      </div>

      {/* Subject Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 32, background: "#131929", padding: "8px", borderRadius: 14, width: "fit-content", border: "1px solid #1A2440" }}>
        {subjects.map(s => (
          <button key={s} className={`tab-btn ${activeSubject === s ? "active" : ""}`} onClick={() => setActiveSubject(s)}
            style={{ position: "relative" }}>
            {s}
            {NOTES_DATA[s]?.length > 0 && (
              <span style={{ position: "absolute", top: -6, right: -4, background: "#FF6B00", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {NOTES_DATA[s].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Login Banner */}
      {!user && (
        <div style={{ background: "linear-gradient(135deg,#131929,#1A2440)", border: "1px solid rgba(255,107,0,.25)", borderRadius: 16, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 28 }}>🔐</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Login Required</div>
            <div style={{ color: "#8892A4", fontSize: 12.5 }}>Notes view & download ke liye free account banao.</div>
          </div>
          <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }} onClick={openAuth}>Login Free →</button>
        </div>
      )}

      {/* Chapters Grid */}
      {chapters.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {chapters.map((ch, i) => (
            <div key={ch.id} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer", animation: `fadeUp .35s ease ${i * 0.07}s both` }}
              onClick={() => { if (!user) { openAuth(); return; } setSelectedPaper(ch); }}>
              {/* Thumbnail Banner */}
              <div style={{ height: 130, background: `linear-gradient(135deg,${ch.color}20,${ch.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, borderBottom: "1px solid #1A2440", position: "relative" }}>
                <div style={{ fontSize: 52 }}>{ch.thumbnail}</div>
                {ch.badge && <span className="badge badge-orange" style={{ fontSize: 9, position: "absolute", top: 10, right: 10 }}>{ch.badge}</span>}
              {!ch.pdfUrl && <span className="badge" style={{ fontSize: 9, position: "absolute", top: 10, left: 10, background:"rgba(255,107,0,.15)", color:"#FF6B00", border:"1px solid rgba(255,107,0,.3)" }}>📥 PDF Soon</span>}
                <div style={{ position: "absolute", bottom: 8, left: 12 }}>
                  <span className="badge badge-blue" style={{ fontSize: 9 }}>📄 {ch.pages} pages</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "16px 18px 14px" }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, marginBottom: 6, lineHeight: 1.35 }}>{ch.chapter}</div>
                <div style={{ color: "#8892A4", fontSize: 12, lineHeight: 1.55, marginBottom: 14 }}>{ch.desc}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, fontSize: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                    onClick={e => { e.stopPropagation(); if (!user) { openAuth(); return; } setSelectedPaper(ch); }}>
                    👁️ View Notes
                  </button>
                  {ch.pdfUrl ? (
                    <a href={user ? ch.pdfUrl : "#"} download={!!user} onClick={e => { if (!user) { e.preventDefault(); openAuth(); } }} style={{ textDecoration: "none", flex: 1 }}>
                      <button className="btn-secondary" style={{ width: "100%", fontSize: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        ⬇️ Download
                      </button>
                    </a>
                  ) : (
                    <button className="btn-secondary" style={{ flex: 1, fontSize: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, opacity: 0.5, cursor: "not-allowed" }} disabled>
                      🔜 Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🚧</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Coming Soon!</div>
          <div style={{ color: "#8892A4", fontSize: 14 }}>{activeSubject} notes will be available soon. Stay tuned!</div>
        </div>
      )}

      {selectedPaper && <PdfModal chapter={selectedPaper} onClose={() => setSelectedPaper(null)} />}
    </div>
  );
}

function AcademicPage({ user, openAuth }) {
  const [selected, setSelected] = useState(null);
  const [subject, setSubject] = useState("All");
  const [showNotes, setShowNotes] = useState(false);
  const [showPYQ, setShowPYQ] = useState(false);
  const subjects = ["All", "Physics", "Chemistry", "Maths", "Biology", "English"];

  if (showNotes) return <NotesPage user={user} openAuth={openAuth} onBack={() => setShowNotes(false)} />;
  if (showPYQ)  return <PYQPage  user={user} openAuth={openAuth} onBack={() => setShowPYQ(false)} />;

  const handleItemClick = (item) => {
    if (item.id === "notes") { setShowNotes(true); return; }
    if (item.id === "pyp")   { setShowPYQ(true);  return; }
    if (!user) { openAuth(); return; }
    setSelected(item);
  };

  return (
    <div className="fade-up" style={{ padding: "32px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎓</div>
          <div>
            <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, lineHeight: 1 }}>Academic Resources</h2>
            <p style={{ color: "#8892A4", fontSize: 13, marginTop: 4 }}>Everything you need to ace your exams — in one place</p>
          </div>
        </div>
      </div>

      {/* Subject Filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {subjects.map(s => (
          <button key={s} className={`tab-btn ${subject === s ? "active" : ""}`} onClick={() => setSubject(s)}>{s}</button>
        ))}
      </div>

      {/* Login Banner */}
      {!user && (
        <div style={{ background: "linear-gradient(135deg,#131929,#1A2440)", border: "1px solid rgba(255,107,0,.25)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 32 }}>🔐</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Login to Access Resources</div>
            <div style={{ color: "#8892A4", fontSize: 13 }}>Free account required to download notes, papers & solutions.</div>
          </div>
          <button className="btn-primary" onClick={openAuth}>Login Free →</button>
        </div>
      )}

      {/* 3x3 Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18, marginBottom: 40 }}>
        {ACADEMIC_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleItemClick(item)}
            style={{ padding: 0, overflow: "hidden", cursor: "pointer", animation: `fadeUp .4s ease ${i * 0.05}s both` }}
          >
            <div style={{ height: 5, background: `linear-gradient(90deg,${item.color},${item.color}55)` }} />
            <div style={{ padding: "22px 22px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Icon Box */}
              <div style={{ width: 56, height: 56, background: `rgba(${item.color === "#FF6B00" ? "255,107,0" : item.color === "#E94560" ? "233,69,96" : item.color === "#00D4AA" ? "0,212,170" : item.color === "#4A90E2" ? "74,144,226" : item.color === "#FFD700" ? "255,215,0" : item.color === "#9B59B6" ? "155,89,182" : item.color === "#E67E22" ? "230,126,34" : item.color === "#27AE60" ? "39,174,96" : "233,69,96"},.13)`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, border: `1.5px solid ${item.color}22` }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                  <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>{item.label}</div>
                  {item.badge && <span className="badge badge-orange" style={{ fontSize: 9, padding: "2px 7px" }}>{item.badge}</span>}
                </div>
                <div style={{ color: "#8892A4", fontSize: 12.5, lineHeight: 1.55, marginBottom: 12 }}>{item.desc}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {subjects.slice(1, 4).map(s => (
                    <span key={s} className="badge badge-blue" style={{ fontSize: 10 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 22px", borderTop: "1px solid #1A2440", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#5A6580", fontSize: 12 }}>📁 {Math.floor(Math.random() * 40 + 10)} resources</span>
              <span style={{ color: item.color, fontSize: 13, fontWeight: 600 }}>Explore →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected item */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, background: `linear-gradient(135deg,${selected.color},${selected.color}99)`, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{selected.icon}</div>
              <div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 19 }}>{selected.label}</div>
                <div style={{ color: "#8892A4", fontSize: 13 }}>{selected.desc}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#5A6580", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {subjects.slice(1).map(s => (
                <button key={s} className="tab-btn" style={{ fontSize: 12, padding: "6px 14px", background: "rgba(255,255,255,.04)", color: "#8892A4" }}>{s}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
              {["Class 11", "Class 12", "JEE Level", "NEET Level", "Dropper"].map((level, i) => (
                <div key={level} style={{ padding: "13px 16px", background: "#0A0A14", borderRadius: 11, border: "1px solid #1A2440", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = selected.color + "55"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1A2440"}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{selected.label} — {level}</div>
                    <div style={{ color: "#5A6580", fontSize: 12, marginTop: 2 }}>{Math.floor(Math.random() * 8 + 2)} files · PDF</div>
                  </div>
                  <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }}>Download</button>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,107,0,.07)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#8892A4", lineHeight: 1.6 }}>
              🤖 <strong style={{ color: "#FF6B00" }}>Obi AI Tip:</strong> Combine these resources with daily practice tests for best results!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ABOUT
function AboutPage() {
  return (
    <div className="fade-up" style={{ padding: "48px 24px 60px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 20px" }}>🎓</div>
        <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 36, marginBottom: 12 }}>About Eduobi</h1>
        <p style={{ color: "#8892A4", fontSize: 15, lineHeight: 1.85, maxWidth: 560, margin: "0 auto" }}>
          Eduobi is India's most affordable and innovative EdTech platform — making quality education accessible to every student regardless of their financial background.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18, marginBottom: 48 }}>
        {[["🎯","Our Mission","To democratize quality education — ensure every student gets world-class teaching at the most affordable price."],["👁️","Our Vision","To be India's #1 EdTech platform where every sincere student cracks their target exam."],["💡","Our Approach","AI-powered personalized learning, India's best educators, and a community that grows with you."]].map(([ico, t, d]) => (
          <div key={t} className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{ico}</div>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{t}</h3>
            <p style={{ color: "#8892A4", fontSize: 13.5, lineHeight: 1.7 }}>{d}</p>
          </div>
        ))}
      </div>

      {/* Founder */}
      <div style={{ background: "linear-gradient(135deg,#131929,#1A2440)", border: "1px solid rgba(255,107,0,.2)", borderRadius: 22, padding: "40px 32px", textAlign: "center", marginBottom: 40 }}>
        <div style={{ width: 90, height: 90, background: "linear-gradient(135deg,#FF6B00,#E94560)", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>👨‍💼</div>
        <span className="badge badge-orange" style={{ marginBottom: 14 }}>Founder & CEO</span>
        <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 30, margin: "12px 0 12px" }}>Anmol Thakur</h2>
        <p style={{ color: "#8892A4", lineHeight: 1.85, maxWidth: 520, margin: "0 auto 22px", fontSize: 14 }}>
          A visionary educator and entrepreneur who built Eduobi with one simple belief — <em style={{ color: "#E8E8F0" }}>no student should give up their dreams because education is too expensive.</em> Anmol's mission is to make world-class teaching accessible to every student, from every corner of India.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <span className="badge badge-blue">IIT Alumni</span>
          <span className="badge badge-green">EdTech Pioneer</span>
          <span className="badge badge-gold">Forbes 30 Under 30</span>
        </div>
      </div>

      {/* Company Stats */}
      <div className="card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, marginBottom: 6, textAlign: "center" }}>Obi Enterprises</h3>
        <p style={{ color: "#8892A4", textAlign: "center", lineHeight: 1.7, marginBottom: 24, fontSize: 14 }}>
          Eduobi is a product of <strong style={{ color: "#E8E8F0" }}>Obi Enterprises</strong> — a technology company focused on transforming education through AI, innovation, and community.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 28 }}>
          {[["2023","Founded"],["50L+","Students"],["28","States"],["500+","Educators"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, color: "#FF6B00" }}>{v}</div>
              <div style={{ color: "#8892A4", fontSize: 13 }}>{l}</div>
            </div>
          ))}
        </div>
        {/* YouTube CTA */}
        <div style={{ borderTop: "1px solid #1A2440", paddingTop: 24, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#8892A4", marginBottom: 14 }}>📺 Subscribe for free lectures, tips & updates!</div>
          <a href="https://youtube.com/@eduobi-learn?si=dmUwBhfMHn2o4rsN" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{ background: "linear-gradient(135deg,#FF0000,#CC0000)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 12, fontFamily: "DM Sans,sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, transition: "all .2s", boxShadow: "0 6px 24px rgba(255,0,0,.3)" }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform="translateY(0)"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg>
              Subscribe on YouTube
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
// XP CONFIG
const XP_RULES = { lecture: 20, test: 50 };

export default function App() {
  const [user, setUser]         = useState(null);
  const [page, setPage]         = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [aiOpen, setAiOpen]     = useState(false);
  const [toast, setToast]       = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [splash, setSplash]       = useState(true);
  const [paymentBatch, setPaymentBatch] = useState(null); // batch being purchased

  // Screenshot protection
  useEffect(() => {
    const block = (e) => e.preventDefault();
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && ["S","P","I"].includes(e.key)) ||
        (e.metaKey && e.shiftKey && ["3","4","5"].includes(e.key)) ||
        (e.ctrlKey && e.key === "p")
      ) e.preventDefault();
    });
    // Splash timer
    const t = setTimeout(() => setSplash(false), 3200);
    return () => { document.removeEventListener("contextmenu", block); clearTimeout(t); };
  }, []);

  const openAuth = () => setAuthOpen(true);
  const showToast = (msg, dur=3000) => { setToast(msg); setTimeout(() => setToast(null), dur); };

  const initProgress = (email) => ({
    _email: email,
    xp: 0, level: 1,
    lecturesDone: 0, testsDone: 0, hoursStudied: 0, streak: 1,
    batchProgress: Object.fromEntries(BATCHES.map(b => [b.id, 0])),
    enrolledBatches: [],
  });

  const awardXP = (type, extra={}) => {
    const gain = XP_RULES[type] || 10;
    setUserProgress(prev => {
      if (!prev) return prev;
      const newXP = prev.xp + gain;
      return {
        ...prev, xp: newXP,
        level: Math.floor(newXP / 200) + 1,
        lecturesDone: type==="lecture" ? prev.lecturesDone+1 : prev.lecturesDone,
        testsDone:    type==="test"    ? prev.testsDone+1    : prev.testsDone,
        hoursStudied: type==="lecture" ? prev.hoursStudied+1 : prev.hoursStudied,
        ...(extra.batchId ? { batchProgress: { ...prev.batchProgress, [extra.batchId]: Math.min(100,(prev.batchProgress[extra.batchId]||0)+5) } } : {}),
      };
    });
    showToast(`+${gain} XP earned! Keep going! 🔥`, 2500);
  };

  const handleLogin = (u) => {
    setUser(u);
    setAuthOpen(false);
    setPage("dashboard");
    setUserProgress(prev => (prev && prev._email===u.email) ? prev : initProgress(u.email));
    showToast(`Welcome ${u.name}! 🎉`);
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
    showToast("Logged out successfully.");
  };

  const NAV = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "batches", label: "Batches", icon: "📦" },
    { id: "lectures", label: "Lectures", icon: "🎬" },
    { id: "tests", label: "Tests", icon: "📝" },
    { id: "academic", label: "Academic", icon: "🎓" },
    { id: "about", label: "About", icon: "ℹ️" },
    ...(user ? [{ id: "dashboard", label: "My Learning", icon: "📊" }] : []),
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage user={user} openAuth={openAuth} goTo={setPage} />;
      case "batches": return <BatchesPage user={user} openAuth={openAuth} onEnroll={b => setPaymentBatch(b)} />;
      case "lectures": return <LecturesPage user={user} openAuth={openAuth} awardXP={awardXP} progress={userProgress} />;
      case "tests": return <TestsPage user={user} openAuth={openAuth} awardXP={awardXP} progress={userProgress} />;
      case "academic": return <AcademicPage user={user} openAuth={openAuth} />;
      case "about": return <AboutPage />;
      case "dashboard": return user ? <DashboardPage user={user} goTo={setPage} progress={userProgress} awardXP={awardXP} /> : <HomePage user={null} openAuth={openAuth} goTo={setPage} />;
      default: return <HomePage user={user} openAuth={openAuth} goTo={setPage} />;
    }
  };

  // Splash Screen component
  const SplashScreen = () => (
    <div style={{ position:"fixed", inset:0, background:"#0A0A14", zIndex:9999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", animation:"splashFade 3.2s ease forwards" }}>
      {/* Glow BG */}
      <div style={{ position:"absolute", width:500, height:500, background:"radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
      {/* Logo */}
      <div style={{ animation:"splashLogo 3.2s ease forwards", display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
        <div style={{ width:90, height:90, background:"linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius:26, display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, boxShadow:"0 0 60px rgba(255,107,0,.4)" }}>🎓</div>
        <div style={{ animation:"splashText 3.2s ease forwards" }}>
          <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:42, textAlign:"center", letterSpacing:-1, color:"#E8E8F0" }}>
            Edu<span style={{ color:"#FF6B00" }}>obi</span>
          </div>
          <div style={{ textAlign:"center", color:"#8892A4", fontSize:14, letterSpacing:"3px", textTransform:"uppercase", marginTop:4 }}>by Obi Enterprises</div>
        </div>
        {/* Loading bar */}
        <div style={{ width:200, height:3, background:"#1A2440", borderRadius:4, overflow:"hidden", marginTop:10 }}>
          <div style={{ height:"100%", background:"linear-gradient(90deg,#FF6B00,#FF9500)", borderRadius:4, animation:"splashBar 3s ease forwards" }} />
        </div>
        <div style={{ color:"#5A6580", fontSize:12, animation:"splashText 3.2s ease forwards" }}>India's All-Type Education Platform</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A14", userSelect:"none", WebkitUserSelect:"none", MozUserSelect:"none" }}>
      <style>{styles}</style>
      {splash && <SplashScreen />}

      {/* ── TOP NAV ── */}
      <nav style={{ background: "rgba(10,10,20,.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid #1A2440", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => setPage("home")}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>Eduobi</div>
              <div style={{ fontSize: 9, color: "#5A6580", letterSpacing: "1px" }}>OBI ENTERPRISES</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 2, flex: 1, marginLeft: 16 }}>
            {NAV.map(n => (
              <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>{n.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <button id="obi-ai-btn" onClick={() => setAiOpen(v => !v)} style={{ background: aiOpen ? "rgba(255,107,0,.2)" : "rgba(255,107,0,.1)", border: "1px solid rgba(255,107,0,.35)", borderRadius: 10, padding: "8px 14px", color: "#FF6B00", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans", position: "relative" }}>
              🤖 Obi AI
              {!aiOpen && <span className="notification-dot" />}
            </button>
            {user ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#FF6B00,#FF9500)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: 700, color: "#fff", fontSize: 15 }} onClick={() => setPage("dashboard")} title={user.name}>
                  {user.name[0].toUpperCase()}
                </div>
                <button className="btn-ghost" style={{ fontSize: 12, padding: "7px 12px" }} onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <button className="btn-primary" onClick={openAuth}>Login / Register</button>
            )}
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ paddingBottom: 72 }}>{renderPage()}</div>

      {/* ── BOTTOM NAV (mobile) ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,10,20,.97)", backdropFilter: "blur(14px)", borderTop: "1px solid #1A2440", display: "flex", zIndex: 99, padding: "6px 0 10px" }}>
        {NAV.slice(0, 5).map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: "none", background: "none", cursor: "pointer", padding: "4px 0" }}>
            <div style={{ fontSize: 19 }}>{n.icon}</div>
            <div style={{ fontSize: 9, color: page === n.id ? "#FF6B00" : "#5A6580", fontFamily: "DM Sans", fontWeight: page === n.id ? 700 : 400 }}>{n.label}</div>
            {page === n.id && <div style={{ width: 4, height: 4, background: "#FF6B00", borderRadius: "50%" }} />}
          </button>
        ))}
      </div>

      {/* ── OBI AI ── */}
      {aiOpen && <ObiAI onClose={() => setAiOpen(false)} />}
      {!aiOpen && (
        <button id="obi-ai-fab" onClick={() => setAiOpen(true)} title="Ask Obi AI" style={{ position: "fixed", bottom: 80, right: 20, width: 52, height: 52, background: "linear-gradient(135deg,#FF6B00,#E94560)", borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 22, boxShadow: "0 4px 22px rgba(255,107,0,.55)", zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center", animation: "glow 3s infinite" }}>
          🤖
        </button>
      )}

      {/* ── AUTH MODAL ── */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLogin={handleLogin} />}

      {/* ── TOAST ── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      {paymentBatch && (
        <PaymentModal
          batch={paymentBatch}
          user={user}
          onClose={() => setPaymentBatch(null)}
          onSuccess={(b) => {
            setPaymentBatch(null);
            showToast(`🎉 Welcome to ${b.name}! Enrollment confirmed!`, 4000);
          }}
        />
      )}
    </div>
  );
}
