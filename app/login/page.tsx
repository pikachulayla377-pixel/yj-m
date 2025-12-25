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

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);

  /* ---------- VALIDATION ---------- */
  const isGmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const errs: Record<string, string> = {};
    if (!loginData.user.trim()) errs.user = "Email or Phone is required";
    if (!loginData.password.trim()) errs.password = "Password is required";
    if (Object.keys(errs).length) return setErrors(errs);

    setLoggingIn(true);
    setErrors({});
    setSuccess("");

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
      setErrors({ user: "Something went wrong. Try again." });
    } finally {
      setLoggingIn(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    const errs: Record<string, string> = {};

    if (!regData.name.trim()) errs.name = "Name is required";
    if (!regData.email.trim() || !isGmail(regData.email))
      errs.email = "Valid Gmail required";
    if (!regData.phone.trim() || !isPhone(regData.phone))
      errs.phone = "Valid 10 digit phone required";
    if (!regData.password.trim() || regData.password.length < 6)
      errs.password = "Min 6 characters";

    if (Object.keys(errs).length) return setErrors(errs);

    setRegistering(true);
    setErrors({});
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      const data = await res.json();
      if (!data.success) return setErrors({ email: data.message });

      setSuccess("Account created! Please log in.");
      setTab("login");
    } catch {
      setErrors({ email: "Registration failed." });
    } finally {
      setRegistering(false);
    }
  };

  return (
    <section className="
      min-h-screen flex items-center justify-center px-5 py-2
      bg-gradient-to-br
      from-[var(--background)]
      via-[var(--card)]
      to-[var(--background)]
      text-[var(--foreground)]
    ">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--accent)]">
            Welcome to Yuji
          </h1>
          <p className="text-[var(--muted)] mt-2">
            {tab === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setErrors({});
                  setSuccess("");
                  setTab(t as any);
                }}
                className={`flex-1 py-3 font-semibold transition ${
                  tab === t
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--background)] text-[var(--muted)] hover:bg-[var(--border)]"
                }`}
              >
                {t === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {/* Success */}
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex gap-2 text-green-400">
                <CheckCircle size={18} /> {success}
              </div>
            )}

            {/* LOGIN */}
            {tab === "login" && (
              <>
                {/* User */}
                <Input
                  icon={<Mail size={16} />}
                  placeholder="Email or Phone"
                  value={loginData.user}
                  error={errors.user}
                  onChange={(v: any) => setLoginData({ ...loginData, user: v })}
                />

                {/* Password */}
                <PasswordInput
                  value={loginData.password}
                  error={errors.password}
                  show={showPassword}
                  toggle={togglePasswordVisibility}
                  onChange={(v: any) =>
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
                  onChange={(v: any) => setRegData({ ...regData, name: v })}
                />

                <Input
                  icon={<Mail size={16} />}
                  placeholder="Gmail Address"
                  value={regData.email}
                  error={errors.email}
                  onChange={(v: any) => setRegData({ ...regData, email: v })}
                />

                <Input
                  icon={<Phone size={16} />}
                  placeholder="Phone Number"
                  value={regData.phone}
                  error={errors.phone}
                  onChange={(v: any) => setRegData({ ...regData, phone: v })}
                />

                <PasswordInput
                  value={regData.password}
                  error={errors.password}
                  show={showPassword}
                  toggle={togglePasswordVisibility}
                  onChange={(v: any) =>
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
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          {tab === "login" ? "No account?" : "Already registered?"}{" "}
          <button
            onClick={() => setTab(tab === "login" ? "register" : "login")}
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            {tab === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

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
          className={`w-full py-2.5 pl-9 pr-3 text-sm rounded-xl
          bg-[var(--background)] border
          ${
            error
              ? "border-red-400"
              : "border-[var(--border)] focus:border-[var(--accent)]"
          }
          focus:outline-none`}
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
          className={`w-full py-2.5 px-3 pr-10 text-sm rounded-xl
          bg-[var(--background)] border
          ${
            error
              ? "border-red-400"
              : "border-[var(--border)] focus:border-[var(--accent)]"
          }
          focus:outline-none`}
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
      className="w-full py-3 rounded-xl font-semibold text-white
      bg-[var(--accent)] hover:opacity-90 transition"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}
