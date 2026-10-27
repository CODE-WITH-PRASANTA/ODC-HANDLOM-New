import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MyAccount.css";

/* Saree image shown in the left panel (adjust the path to your project) */
import sareeImg from "../../assets/collection-2.png";
/* ODC Handloom logo */
import logoImg from "../../assets/navbarlogo.png";

/* ------------------------------------------------------------------
   Demo handlers
   Every action below calls an optional prop. Pass your real API calls
   as props (they must return a Promise and may throw an Error with a
   readable message). Without props, a short simulated delay is used.
------------------------------------------------------------------- */
const wait = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));
const demo = async () => {
  await wait();
};

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;
const REMEMBER_KEY = "MyAccount-remembered-email";

const LOCATIONS = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const PANEL_COPY = {
  signin: {
    badge: "ODC Handloom Portal",
    title: "Welcome Back",
    text: "Sign in to manage your orders and wishlist, and explore authentic handloom sarees woven by master weavers.",
    cta: "Create Account",
    ctaIcon: "userPlus",
    target: "register",
  },
  register: {
    badge: "Join ODC Handloom",
    title: "Create Account",
    text: "Join our community of saree lovers to shop authentic handloom sarees and celebrate weaving traditions.",
    cta: "Back to Sign In",
    ctaIcon: "arrowLeft",
    target: "signin",
  },
  forgot: {
    badge: "Account Recovery",
    title: "Forgot Password?",
    text: "No worries. Verify your email and choose a new password to get back to your handloom saree collection.",
    cta: "Back to Sign In",
    ctaIcon: "arrowLeft",
    target: "signin",
  },
};

const FORGOT_COPY = {
  1: { title: "Forgot Password", sub: "Enter your email and we'll send you a 6-digit reset code." },
  2: { title: "Verify Code", sub: "Enter the 6-digit code we sent to your email." },
  3: { title: "New Password", sub: "Choose a strong password for your account." },
  4: { title: "Password Updated", sub: "Your password has been reset successfully." },
};

/* ------------------------------------------------------------------
   Validation helpers
------------------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Use at least 8 characters";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
    return "Include at least one letter and one number";
  return "";
};

const getStrength = (value) => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  return { score, label: value ? labels[score] : "" };
};

/* ------------------------------------------------------------------
   Icons (inline SVG – no dependency)
------------------------------------------------------------------- */
const ICONS = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.8v1.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M6.6 7.6A16.6 16.6 0 0 0 2 12s3.6 6.5 10 6.5c1.5 0 2.9-.3 4.1-.9M10.6 5.6c.5-.1 1-.1 1.4-.1 6.4 0 10 6.5 10 6.5a17 17 0 0 1-3.2 3.9" />
      <path d="M9.9 9.9a2.8 2.8 0 0 0 4 4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c.6-4 3.6-6 7.5-6s6.9 2 7.5 6" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 20.5c.6-4 3.2-6 7-6 1.3 0 2.5.2 3.5.7M18 14v6M15 17h6" />
    </>
  ),
  login: (
    <>
      <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14" />
      <path d="M4 12h11M11 8l4 4-4 4" />
    </>
  ),
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  chevron: <path d="M6 9.5l6 6 6-6" />,
  sparkle: (
    <>
      <path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3z" />
      <path d="M18.5 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16v.01" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 2.8v5.6c0 4.8-3.2 8.2-7.5 9.6-4.3-1.4-7.5-4.8-7.5-9.6V5.8L12 3z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
};

const Icon = ({ name, size = 20, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {ICONS[name]}
  </svg>
);

/* ------------------------------------------------------------------
   Small building blocks
------------------------------------------------------------------- */
const TextField = ({
  id,
  label,
  icon,
  error,
  right,
  as = "input",
  children,
  ...inputProps
}) => {
  const Tag = as;
  return (
    <div className="MyAccount__field">
      <label className="MyAccount__label" htmlFor={id}>
        {label}
      </label>
      <div className={`MyAccount__control ${error ? "is-error" : ""}`}>
        <Icon name={icon} className="MyAccount__controlIcon" />
        <Tag
          id={id}
          className="MyAccount__input"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        >
          {children}
        </Tag>
        {right}
      </div>
      {error && (
        <p className="MyAccount__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

const PasswordField = ({ id, visible, onToggle, ...props }) => (
  <TextField
    id={id}
    icon="lock"
    type={visible ? "text" : "password"}
    right={
      <button
        type="button"
        className="MyAccount__eye"
        onClick={onToggle}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        <Icon name={visible ? "eyeOff" : "eye"} size={20} />
      </button>
    }
    {...props}
  />
);

const StrengthMeter = ({ value }) => {
  const { score, label } = getStrength(value);
  if (!value) return null;
  return (
    <div className="MyAccount__strength" data-level={score} aria-live="polite">
      <div className="MyAccount__strengthBars">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={`MyAccount__strengthBar ${n <= score ? "is-on" : ""}`}
          />
        ))}
      </div>
      <span className="MyAccount__strengthLabel">{label}</span>
    </div>
  );
};

const SubmitButton = ({ loading, loadingText, icon, children }) => (
  <button type="submit" className="MyAccount__submit" disabled={loading}>
    {loading ? (
      <span className="MyAccount__spinner" aria-hidden="true" />
    ) : (
      <Icon name={icon} size={21} />
    )}
    <span>{loading ? loadingText : children}</span>
  </button>
);

const OtpInput = ({ value, onChange, hasError, firstRef }) => {
  const refs = useRef([]);

  const focusAt = (i) => {
    const el = refs.current[i];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleChange = (i, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < OTP_LENGTH - 1) focusAt(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (value[i]) {
        const next = [...value];
        next[i] = "";
        onChange(next);
      } else if (i > 0) {
        const next = [...value];
        next[i - 1] = "";
        onChange(next);
        focusAt(i - 1);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) {
      e.preventDefault();
      focusAt(i + 1);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] || "");
    onChange(next);
    focusAt(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  return (
    <div
      className={`MyAccount__otp ${hasError ? "is-error" : ""}`}
      role="group"
      aria-label="6-digit verification code"
    >
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
            if (i === 0 && firstRef) firstRef.current = el;
          }}
          className="MyAccount__otpBox"
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------- */
const MyAccount = ({
  onSignIn = demo,
  onRegister = demo,
  onForgotPassword = demo, // also used for "resend code"
  onVerifyCode = demo,
  onResetPassword = demo,
}) => {
  const [view, setView] = useState("signin"); // signin | register | forgot
  const [step, setStep] = useState(1); // forgot-password step 1–4
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null); // { type, text }
  const [visible, setVisible] = useState({});
  const [resendIn, setResendIn] = useState(0);

  const [signin, setSignin] = useState(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(REMEMBER_KEY) || "";
    } catch (e) {
      /* storage unavailable */
    }
    return { email: saved, password: "", remember: Boolean(saved) };
  });
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    password: "",
    confirm: "",
  });
  const [forgot, setForgot] = useState({
    email: "",
    otp: Array(OTP_LENGTH).fill(""),
    password: "",
    confirm: "",
  });

  const titleRef = useRef(null);
  const otpFirstRef = useRef(null);
  const mounted = useRef(false);

  /* move focus to the heading when the view / step changes (not on first paint) */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (titleRef.current) titleRef.current.focus({ preventScroll: true });
    if (view === "forgot" && step === 2 && otpFirstRef.current) {
      otpFirstRef.current.focus();
    }
  }, [view, step]);

  /* resend countdown */
  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const panel = PANEL_COPY[view];
  const isSignin = view === "signin";
  const isRegister = view === "register";

  const copy = useMemo(() => {
    if (view === "signin")
      return { title: "Sign In", sub: "Welcome back! Please sign in to your account." };
    if (view === "register")
      return { title: "Create Account", sub: "Create your account to get started." };
    return FORGOT_COPY[step];
  }, [view, step]);

  /* ---------- helpers ---------- */
  const goTo = (next, nextNotice = null) => {
    setView(next);
    setStep(1);
    setErrors({});
    setNotice(nextNotice);
    setVisible({});
  };

  const bind = (setter, field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setter((s) => ({ ...s, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined, form: undefined }));
  };

  const toggleVisible = (id) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  const run = async (action, onSuccess) => {
    setLoading(true);
    setNotice(null);
    try {
      await action();
      onSuccess();
    } catch (err) {
      setErrors({ form: err?.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Sign in ---------- */
  const submitSignin = (e) => {
    e.preventDefault();
    const next = {};
    if (!signin.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(signin.email.trim())) next.email = "Enter a valid email address";
    if (!signin.password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    run(
      () =>
        onSignIn({
          email: signin.email.trim(),
          password: signin.password,
          remember: signin.remember,
        }),
      () => {
        try {
          if (signin.remember) localStorage.setItem(REMEMBER_KEY, signin.email.trim());
          else localStorage.removeItem(REMEMBER_KEY);
        } catch (err) {
          /* storage unavailable */
        }
        setSignin((s) => ({ ...s, password: "" }));
        setNotice({ type: "success", text: "Signed in successfully. Welcome back!" });
      }
    );
  };

  /* ---------- Register ---------- */
  const submitRegister = (e) => {
    e.preventDefault();
    const next = {};
    if (!register.firstName.trim()) next.firstName = "First name is required";
    if (!register.lastName.trim()) next.lastName = "Last name is required";
    if (!register.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(register.email.trim())) next.email = "Enter a valid email address";
    if (!register.location) next.location = "Please select your location";
    const pwError = validatePassword(register.password);
    if (pwError) next.password = pwError;
    if (!register.confirm) next.confirm = "Please confirm your password";
    else if (register.confirm !== register.password) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;

    run(
      () =>
        onRegister({
          firstName: register.firstName.trim(),
          lastName: register.lastName.trim(),
          email: register.email.trim(),
          location: register.location,
          password: register.password,
        }),
      () => {
        setSignin({ email: register.email.trim(), password: "", remember: false });
        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          location: "",
          password: "",
          confirm: "",
        });
        goTo("signin", {
          type: "success",
          text: "Account created successfully. Please sign in.",
        });
      }
    );
  };

  /* ---------- Forgot password ---------- */
  const submitForgotEmail = (e) => {
    e.preventDefault();
    const email = forgot.email.trim();
    if (!email) return setErrors({ email: "Email is required" });
    if (!EMAIL_RE.test(email)) return setErrors({ email: "Enter a valid email address" });
    setErrors({});
    run(
      () => onForgotPassword({ email }),
      () => {
        setStep(2);
        setResendIn(RESEND_SECONDS);
        setNotice({ type: "success", text: `We sent a 6-digit code to ${email}.` });
      }
    );
  };

  const submitForgotCode = (e) => {
    e.preventDefault();
    const code = forgot.otp.join("");
    if (code.length < OTP_LENGTH) {
      return setErrors({ otp: "Enter the complete 6-digit code" });
    }
    setErrors({});
    run(
      () => onVerifyCode({ email: forgot.email.trim(), code }),
      () => {
        setStep(3);
        setNotice(null);
      }
    );
  };

  const resendCode = () => {
    if (resendIn > 0 || loading) return;
    run(
      () => onForgotPassword({ email: forgot.email.trim() }),
      () => {
        setResendIn(RESEND_SECONDS);
        setForgot((f) => ({ ...f, otp: Array(OTP_LENGTH).fill("") }));
        setNotice({ type: "success", text: "A new code has been sent to your email." });
        if (otpFirstRef.current) otpFirstRef.current.focus();
      }
    );
  };

  const submitForgotReset = (e) => {
    e.preventDefault();
    const next = {};
    const pwError = validatePassword(forgot.password);
    if (pwError) next.password = pwError;
    if (!forgot.confirm) next.confirm = "Please confirm your password";
    else if (forgot.confirm !== forgot.password) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;

    run(
      () =>
        onResetPassword({
          email: forgot.email.trim(),
          code: forgot.otp.join(""),
          password: forgot.password,
        }),
      () => {
        setStep(4);
        setNotice(null);
      }
    );
  };

  const finishReset = () => {
    setSignin({ email: forgot.email.trim(), password: "", remember: false });
    setForgot({ email: "", otp: Array(OTP_LENGTH).fill(""), password: "", confirm: "" });
    goTo("signin", {
      type: "success",
      text: "Password updated. Sign in with your new password.",
    });
  };

  /* ---------- Render ---------- */
  return (
    <section className="MyAccount">
      <div className="MyAccount__card">
        {/* ================= Left showcase panel ================= */}
        <aside className="MyAccount__panel">
          <span className="MyAccount__orb MyAccount__orb--1" aria-hidden="true" />
          <span className="MyAccount__orb MyAccount__orb--2" aria-hidden="true" />
          <span className="MyAccount__orb MyAccount__orb--3" aria-hidden="true" />
          <span className="MyAccount__orb MyAccount__orb--4" aria-hidden="true" />

          <span className="MyAccount__weave" aria-hidden="true" />

          <div className="MyAccount__brand">
            <span className="MyAccount__logo">
              <img className="MyAccount__logoImg" src={logoImg} alt="ODC Handloom logo" />
            </span>
            <div className="MyAccount__brandText">
              <p className="MyAccount__brandName">ODC Handloom</p>
              <p className="MyAccount__brandTag">Authentic Handloom Sarees</p>
            </div>
          </div>

          <div className="MyAccount__panelBody" key={view}>
            <span className="MyAccount__badge">{panel.badge}</span>
            <h2 className="MyAccount__panelTitle">{panel.title}</h2>
            <p className="MyAccount__panelText">{panel.text}</p>
          </div>

          <div className="MyAccount__art" aria-hidden="true">
            <span className="MyAccount__orbit">
              <span className="MyAccount__orbitDot" />
            </span>
            <div className="MyAccount__frame">
              <div className="MyAccount__arch">
                <img
                  className="MyAccount__archImg"
                  src={sareeImg}
                  alt=""
                  loading="eager"
                />
                <span className="MyAccount__archShade" />
              </div>
              <span className="MyAccount__chip">
                <Icon name="sparkle" size={16} />
                Authentic handloom sarees
              </span>
            </div>
          </div>

          <button
            type="button"
            className="MyAccount__panelBtn"
            onClick={() => goTo(panel.target)}
          >
            <Icon name={panel.ctaIcon} size={20} />
            <span>{panel.cta}</span>
          </button>
        </aside>

        {/* ================= Right form panel ================= */}
        <div className="MyAccount__formWrap">
          <div
            className="MyAccount__form"
            key={`${view}-${step}`}
          >
            {view === "forgot" && step < 4 && (
              <ol className="MyAccount__steps" aria-label={`Step ${step} of 3`}>
                {[1, 2, 3].map((n) => (
                  <li
                    key={n}
                    className={`MyAccount__stepDot ${n <= step ? "is-done" : ""} ${
                      n === step ? "is-current" : ""
                    }`}
                  />
                ))}
              </ol>
            )}

            <header className="MyAccount__head">
              <h1 className="MyAccount__title" ref={titleRef} tabIndex={-1}>
                {copy.title}
              </h1>
              <span className="MyAccount__titleLine" aria-hidden="true" />
              <p className="MyAccount__subtitle">{copy.sub}</p>
            </header>

            <div className="MyAccount__alerts" aria-live="polite">
              {notice && (
                <p className={`MyAccount__alert MyAccount__alert--${notice.type}`} role="status">
                  <Icon name={notice.type === "success" ? "check" : "alert"} size={18} />
                  <span>{notice.text}</span>
                </p>
              )}
              {errors.form && (
                <p className="MyAccount__alert MyAccount__alert--error" role="alert">
                  <Icon name="alert" size={18} />
                  <span>{errors.form}</span>
                </p>
              )}
            </div>

            {/* ---------- Sign in ---------- */}
            {isSignin && (
              <form className="MyAccount__fields" onSubmit={submitSignin} noValidate>
                <TextField
                  id="MyAccount-signin-email"
                  label="Email Address"
                  icon="mail"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={signin.email}
                  onChange={bind(setSignin, "email")}
                  error={errors.email}
                />
                <PasswordField
                  id="MyAccount-signin-password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={signin.password}
                  onChange={bind(setSignin, "password")}
                  error={errors.password}
                  visible={visible.signin}
                  onToggle={() => toggleVisible("signin")}
                />

                <div className="MyAccount__row">
                  <label className="MyAccount__remember">
                    <input
                      type="checkbox"
                      className="MyAccount__rememberInput"
                      checked={signin.remember}
                      onChange={bind(setSignin, "remember")}
                    />
                    <span className="MyAccount__rememberBox">
                      <Icon name="check" size={13} />
                    </span>
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    className="MyAccount__link"
                    onClick={() => {
                      setForgot((f) => ({ ...f, email: signin.email }));
                      goTo("forgot");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <SubmitButton loading={loading} loadingText="Signing in…" icon="login">
                  Sign In
                </SubmitButton>

                <p className="MyAccount__switch">
                  Don't have an account?{" "}
                  <button type="button" className="MyAccount__link" onClick={() => goTo("register")}>
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {/* ---------- Register ---------- */}
            {isRegister && (
              <form className="MyAccount__fields" onSubmit={submitRegister} noValidate>
                <div className="MyAccount__grid">
                  <TextField
                    id="MyAccount-first"
                    label="First Name"
                    icon="user"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={register.firstName}
                    onChange={bind(setRegister, "firstName")}
                    error={errors.firstName}
                  />
                  <TextField
                    id="MyAccount-last"
                    label="Last Name"
                    icon="user"
                    name="lastName"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={register.lastName}
                    onChange={bind(setRegister, "lastName")}
                    error={errors.lastName}
                  />
                </div>
                <TextField
                  id="MyAccount-register-email"
                  label="Email Address"
                  icon="mail"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={register.email}
                  onChange={bind(setRegister, "email")}
                  error={errors.email}
                />
                <TextField
                  id="MyAccount-location"
                  label="Location"
                  icon="pin"
                  as="select"
                  name="location"
                  autoComplete="address-level1"
                  value={register.location}
                  onChange={bind(setRegister, "location")}
                  error={errors.location}
                  right={<Icon name="chevron" size={20} className="MyAccount__chevron" />}
                >
                  <option value="" disabled>
                    Select your location
                  </option>
                  {LOCATIONS.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </TextField>
                <div>
                  <PasswordField
                    id="MyAccount-register-password"
                    label="Password"
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={register.password}
                    onChange={bind(setRegister, "password")}
                    error={errors.password}
                    visible={visible.registerPw}
                    onToggle={() => toggleVisible("registerPw")}
                  />
                  <StrengthMeter value={register.password} />
                </div>
                <PasswordField
                  id="MyAccount-register-confirm"
                  label="Confirm Password"
                  name="confirm"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={register.confirm}
                  onChange={bind(setRegister, "confirm")}
                  error={errors.confirm}
                  visible={visible.registerConfirm}
                  onToggle={() => toggleVisible("registerConfirm")}
                />

                <SubmitButton loading={loading} loadingText="Creating account…" icon="userPlus">
                  Register
                </SubmitButton>

                <p className="MyAccount__switch">
                  Already have an account?{" "}
                  <button type="button" className="MyAccount__link" onClick={() => goTo("signin")}>
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* ---------- Forgot: step 1 – email ---------- */}
            {view === "forgot" && step === 1 && (
              <form className="MyAccount__fields" onSubmit={submitForgotEmail} noValidate>
                <TextField
                  id="MyAccount-forgot-email"
                  label="Email Address"
                  icon="mail"
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  value={forgot.email}
                  onChange={bind(setForgot, "email")}
                  error={errors.email}
                />
                <SubmitButton loading={loading} loadingText="Sending code…" icon="key">
                  Send Reset Code
                </SubmitButton>
                <p className="MyAccount__switch">
                  Remembered your password?{" "}
                  <button type="button" className="MyAccount__link" onClick={() => goTo("signin")}>
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* ---------- Forgot: step 2 – code ---------- */}
            {view === "forgot" && step === 2 && (
              <form className="MyAccount__fields" onSubmit={submitForgotCode} noValidate>
                <div className="MyAccount__field">
                  <span className="MyAccount__label">Verification Code</span>
                  <OtpInput
                    value={forgot.otp}
                    firstRef={otpFirstRef}
                    hasError={Boolean(errors.otp)}
                    onChange={(otp) => {
                      setForgot((f) => ({ ...f, otp }));
                      setErrors((er) => ({ ...er, otp: undefined, form: undefined }));
                    }}
                  />
                  {errors.otp && (
                    <p className="MyAccount__error" role="alert">
                      {errors.otp}
                    </p>
                  )}
                </div>

                <div className="MyAccount__row">
                  <button
                    type="button"
                    className="MyAccount__link"
                    onClick={() => {
                      setStep(1);
                      setNotice(null);
                      setErrors({});
                    }}
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    className="MyAccount__link"
                    onClick={resendCode}
                    disabled={resendIn > 0 || loading}
                  >
                    {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
                  </button>
                </div>

                <SubmitButton loading={loading} loadingText="Verifying…" icon="shield">
                  Verify Code
                </SubmitButton>
              </form>
            )}

            {/* ---------- Forgot: step 3 – new password ---------- */}
            {view === "forgot" && step === 3 && (
              <form className="MyAccount__fields" onSubmit={submitForgotReset} noValidate>
                <div>
                  <PasswordField
                    id="MyAccount-reset-password"
                    label="New Password"
                    name="password"
                    placeholder="Create a new password"
                    autoComplete="new-password"
                    value={forgot.password}
                    onChange={bind(setForgot, "password")}
                    error={errors.password}
                    visible={visible.resetPw}
                    onToggle={() => toggleVisible("resetPw")}
                  />
                  <StrengthMeter value={forgot.password} />
                </div>
                <PasswordField
                  id="MyAccount-reset-confirm"
                  label="Confirm New Password"
                  name="confirm"
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  value={forgot.confirm}
                  onChange={bind(setForgot, "confirm")}
                  error={errors.confirm}
                  visible={visible.resetConfirm}
                  onToggle={() => toggleVisible("resetConfirm")}
                />
                <SubmitButton loading={loading} loadingText="Updating…" icon="lock">
                  Reset Password
                </SubmitButton>
              </form>
            )}

            {/* ---------- Forgot: step 4 – success ---------- */}
            {view === "forgot" && step === 4 && (
              <div className="MyAccount__fields MyAccount__done">
                <span className="MyAccount__doneIcon" aria-hidden="true">
                  <Icon name="check" size={38} />
                </span>
                <p className="MyAccount__doneText">
                  You can now sign in with your new password.
                </p>
                <button type="button" className="MyAccount__submit" onClick={finishReset}>
                  <Icon name="login" size={21} />
                  <span>Back to Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;