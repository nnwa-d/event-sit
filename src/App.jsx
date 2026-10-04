import { useEffect, useState } from "react";
import "./App.css";
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyea0_LbccfGuR6N_N8r0pRQOctCYp8u3NlRPl5trd4jxlLLz-q3X-crqkF8ngZbz6x/exec';

const EVENT = {
  name: "ملتقى الإبداع التقني",
  tagline: "لقاء يجمع المطورين والمصممين لتبادل الخبرات وبناء مشاريع حقيقية.",
  date: "2026-12-20T16:00:00",
  dateText: "الأحد ٢٠ ديسمبر ٢٠٢٦",
  time: "٤:٠٠ – ١٠:٠٠ مساءً",
  place: "قاعة الابتكار، مركز المؤتمرات",
  seats: 150,
};

const PROGRAM = [
  { time: "٤:٠٠ م", title: "استقبال الضيوف", note: "قهوة وتعارف" },
  { time: "٤:٣٠ م", title: "الجلسة الافتتاحية", note: "مستقبل تطوير الويب" },
  { time: "٦:٠٠ م", title: "ورشة عمل: بناء موقع بـ React", note: "تطبيق عملي مباشر" },
  { time: "٨:٠٠ م", title: "حوار مفتوح مع المختصين", note: "أسئلة وأجوبة" },
  { time: "٩:٠٠ م", title: "الختام وتوزيع الشهادات", note: "" },
];

function useCountdown(target) {
  const calc = () => Math.max(0, new Date(target) - new Date());
  const [ms, setMs] = useState(calc); 
  useEffect(() => {
    const t = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(ms / 1000);
  return [
    { v: Math.floor(s / 86400), l: "يوم" },
    { v: Math.floor((s % 86400) / 3600), l: "ساعة" },
    { v: Math.floor((s % 3600) / 60), l: "دقيقة" },
    { v: s % 60, l: "ثانية" },
  ];
}

export default function App() {
  const left = useCountdown(EVENT.date);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
  e.preventDefault();
  const err = {};
  if (form.name.trim().length < 3) err.name = "اكتب اسمك الكامل";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "البريد الإلكتروني غير صحيح";
  if (!/^05\d{8}$/.test(form.phone)) err.phone = "رقم جوال يبدأ بـ 05 ويتكون من 10 أرقام";
  setErrors(err);
  if (Object.keys(err).length) return;

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(form),
    });
    setDone(true);
  } catch (error) {
    alert('صار خطأ، حاول مرة ثانية');
  }
};

  return (
    <div dir="rtl" lang="ar">
      <header className="nav">
        <div className="wrap">
          <strong className="logo">{EVENT.name}</strong>
          <nav>
            <a href="#about">عن الفعالية</a>
            <a href="#program">البرنامج</a>
            <a href="#register" className="btn btn-sm">سجّل الآن</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <h1>{EVENT.name}</h1>
              <p className="lead">{EVENT.tagline}</p>
              <div className="actions">
                <a href="#register" className="btn btn-light">احجز مقعدك</a>
                <a href="#program" className="btn btn-line">تصفّح البرنامج</a>
              </div>
            </div>
            <div className="hero-card">
              <div><span>التاريخ</span><b>{EVENT.dateText}</b></div>
              <div><span>الوقت</span><b>{EVENT.time}</b></div>
              <div><span>المكان</span><b>{EVENT.place}</b></div>
            </div>
          </div>
          <div className="countdown" aria-label="الوقت المتبقي">
            {left.map((x) => (
              <div key={x.l} className="tick">
                <b>{x.v.toLocaleString("ar-SA")}</b>
                <span>{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap">
          <div className="head">
            <h2>عن الفعالية</h2>
            <p>يوم مليء بالتعلّم والتطبيق العملي مع نخبة من المختصين.</p>
          </div>
          <div className="cards">
            <div className="card"><span>المحاور</span><b>تطوير الويب والتصميم</b></div>
            <div className="card"><span>الورش</span><b>تطبيق عملي مباشر</b></div>
            <div className="card"><span>الحضور</span><b>{EVENT.seats.toLocaleString("ar-SA")} مقعدًا فقط</b></div>
            <div className="card"><span>الشهادة</span><b>شهادة حضور لكل مشارك</b></div>
          </div>
        </div>
      </section>

      <section id="program" className="section alt">
        <div className="wrap">
          <div className="head"><h2>برنامج اليوم</h2></div>
          <div className="program">
            {PROGRAM.map((p) => (
              <div className="row" key={p.title}>
                <time>{p.time}</time>
                <h3>{p.title}</h3>
                <p>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="section">
        <div className="wrap reg-grid">
          <div className="head">
            <h2>التسجيل في الفعالية</h2>
            <p>التسجيل مجاني والمقاعد محدودة. سيصلك تأكيد الحضور على بريدك الإلكتروني.</p>
            <ul className="notes">
              <li>سجّل باسمك الكامل كما تريده في الشهادة</li>
              <li>استخدم بريدًا تتابعه لاستلام التفاصيل</li>
              <li>رقم الجوال للتواصل عند الحاجة فقط</li>
            </ul>
          </div>
          {done ? (
            <div className="success" role="status">
              تم تسجيلك يا {form.name.split(" ")[0]}. أرسلنا تفاصيل الحضور إلى {form.email}.
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {[["name", "الاسم الكامل", "text"], ["email", "البريد الإلكتروني", "email"], ["phone", "رقم الجوال", "tel"]].map(([k, label, type]) => (
                <label key={k}>
                  {label}
                  <input type={type} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
                  {errors[k] && <small>{errors[k]}</small>}
                </label>
              ))}
              <button className="btn" type="submit">تأكيد التسجيل</button>
            </form>
          )}
        </div>
      </section>

      <footer>© ٢٠٢٦ {EVENT.name}</footer>
    </div>
  );
}
