"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

/* ================= TYPES ================= */
type Tab = "login" | "register" | "forgot";
type ForgotStep = 1 | 2;

/* ================= PAGE ================= */
export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [forgotStep, setForgotStep] = useState<ForgotStep>(1);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resetting, setResetting] = useState(false);

  /* ================= HELPERS ================= */
  const isGmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isPhone = (phone: string) => /^[0-9]{10}$/.test(phone);
  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  const resetMessages = () => {
    setErrors({});
    setSuccess("");
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const errs: Record<string, string> = {};
    if (!loginData.user.trim()) errs.user = "Email or phone required";
    if (!loginData.password.trim()) errs.password = "Password required";
    if (Object.keys(errs).length) return setErrors(errs);

    setLoggingIn(true);
    resetMessages();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!data.success) return setErrors({ user: data.message });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("phone", data.user.phone);
      localStorage.setItem("userId", data.user.userId);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch {
      setErrors({ user: "Login failed. Try again." });
    } finally {
      setLoggingIn(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    const errs: Record<string, string> = {};
    if (!regData.name.trim()) errs.name = "Name required";
    if (!isGmail(regData.email)) errs.email = "Valid Gmail required";
    if (!isPhone(regData.phone)) errs.phone = "Valid phone required";
    if (regData.password.length < 6)
      errs.password = "Min 6 characters";

    if (Object.keys(errs).length) return setErrors(errs);

    setRegistering(true);
    resetMessages();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });
      const data = await res.json();

      if (!data.success) return setErrors({ email: data.message });

      setSuccess("Account created! Please login.");
      setTab("login");
    } catch {
      setErrors({ email: "Registration failed." });
    } finally {
      setRegistering(false);
    }
  };

  /* ================= FORGOT – SEND OTP ================= */
  const sendOtp = async () => {
    if (!isGmail(forgotData.email))
      return setErrors({ email: "Valid Gmail required" });

    setSendingOtp(true);
    resetMessages();

    try {
      const res = await fetch("/api/auth/forgot-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotData.email }),
      });
      const data = await res.json();

      if (!data.success) return setErrors({ email: data.message });

      setSuccess("OTP sent to your email");
      setForgotStep(2);
    } catch {
      setErrors({ email: "Failed to send OTP" });
    } finally {
      setSendingOtp(false);
    }
  };

  /* ================= FORGOT – RESET ================= */
  const resetPassword = async () => {
    const errs: Record<string, string> = {};
    if (!forgotData.otp) errs.otp = "OTP required";
    if (forgotData.newPassword.length < 6)
      errs.newPassword = "Min 6 characters";

    if (Object.keys(errs).length) return setErrors(errs);

    setResetting(true);
    resetMessages();

    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forgotData),
      });
      const data = await res.json();

      if (!data.success) return setErrors({ otp: data.message });

      setSuccess("Password reset successful. Please login.");
      setTab("login");
      setForgotStep(1);
      setForgotData({ email: "", otp: "", newPassword: "" });
    } catch {
      setErrors({ otp: "Reset failed" });
    } finally {
      setResetting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--background)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--accent)]">Welcome</h1>
          <p className="text-[var(--muted)] mt-2">
            {tab === "login"
              ? "Sign in to your account"
              : tab === "register"
              ? "Create a new account"
              : "Reset your password"}
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            {["login", "register", "forgot"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  resetMessages();
                  setTab(t as Tab);
                  if (t !== "forgot") setForgotStep(1);
                }}
                className={`flex-1 py-3 font-semibold transition ${
                  tab === t
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--background)] text-[var(--muted)] hover:bg-[var(--border)]"
                }`}
              >
                {t === "login"
                  ? "Login"
                  : t === "register"
                  ? "Register"
                  : "Forgot"}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex gap-2 text-green-400">
                <CheckCircle size={18} /> {success}
              </div>
            )}

            {/* LOGIN */}
            {tab === "login" && (
              <>
                <Input
                  icon={<Mail size={16} />}
                  placeholder="Email or Phone"
                  value={loginData.user}
                  error={errors.user}
                  onChange={(v: string) =>
                    setLoginData({ ...loginData, user: v })
                  }
                />
                <PasswordInput
                  value={loginData.password}
                  error={errors.password}
                  show={showPassword}
                  toggle={togglePasswordVisibility}
                  onChange={(v: string) =>
                    setLoginData({ ...loginData, password: v })
                  }
                />
                <PrimaryButton
                  loading={loggingIn}
                  text="Sign In"
                  onClick={handleLogin}
                />
              </>
            )}

            {/* REGISTER */}
            {tab === "register" && (
              <>
                <Input
                  icon={<User size={16} />}
                  placeholder="Full Name"
                  value={regData.name}
                  error={errors.name}
                  onChange={(v: string) =>
                    setRegData({ ...regData, name: v })
                  }
                />
                <Input
                  icon={<Mail size={16} />}
                  placeholder="Gmail"
                  value={regData.email}
                  error={errors.email}
                  onChange={(v: string) =>
                    setRegData({ ...regData, email: v })
                  }
                />
                <Input
                  icon={<Phone size={16} />}
                  placeholder="Phone"
                  value={regData.phone}
                  error={errors.phone}
                  onChange={(v: string) =>
                    setRegData({ ...regData, phone: v })
                  }
                />
                <PasswordInput
                  value={regData.password}
                  error={errors.password}
                  show={showPassword}
                  toggle={togglePasswordVisibility}
                  onChange={(v: string) =>
                    setRegData({ ...regData, password: v })
                  }
                />
                <PrimaryButton
                  loading={registering}
                  text="Create Account"
                  onClick={handleRegister}
                />
              </>
            )}

            {/* FORGOT */}
            {tab === "forgot" && (
              <>
                {forgotStep === 1 && (
                  <>
                    <Input
                      icon={<Mail size={16} />}
                      placeholder="Registered Gmail"
                      value={forgotData.email}
                      error={errors.email}
                      onChange={(v: string) =>
                        setForgotData({ ...forgotData, email: v })
                      }
                    />
                    <PrimaryButton
                      loading={sendingOtp}
                      text="Send OTP"
                      onClick={sendOtp}
                    />
                  </>
                )}

                {forgotStep === 2 && (
                  <>
                    <Input
                      icon={<Lock size={16} />}
                      placeholder="OTP"
                      value={forgotData.otp}
                      error={errors.otp}
                      onChange={(v: string) =>
                        setForgotData({ ...forgotData, otp: v })
                      }
                    />
                    <PasswordInput
                      value={forgotData.newPassword}
                      error={errors.newPassword}
                      show={showPassword}
                      toggle={togglePasswordVisibility}
                      onChange={(v: string) =>
                        setForgotData({
                          ...forgotData,
                          newPassword: v,
                        })
                      }
                    />
                    <PrimaryButton
                      loading={resetting}
                      text="Reset Password"
                      onClick={resetPassword}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= UI COMPONENTS ================= */

function Input({ icon, value, onChange, placeholder, error }: any) {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          {icon}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-2.5 pl-9 pr-3 text-sm rounded-xl bg-[var(--background)] border ${
            error
              ? "border-red-400"
              : "border-[var(--border)] focus:border-[var(--accent)]"
          } focus:outline-none`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1 flex gap-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function PasswordInput({ value, onChange, show, toggle, error }: any) {
  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Password"
          className={`w-full py-2.5 px-3 pr-10 text-sm rounded-xl bg-[var(--background)] border ${
            error
              ? "border-red-400"
              : "border-[var(--border)] focus:border-[var(--accent)]"
          } focus:outline-none`}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1 flex gap-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ text, loading, onClick }: any) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--accent)] hover:opacity-90 transition disabled:opacity-60"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}
