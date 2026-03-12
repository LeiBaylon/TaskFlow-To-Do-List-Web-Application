"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Zap,
  Target,
  Flame,
} from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";

// ─── Animated mesh gradient background ──────────────────────────────
const MeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      const { width, height } = canvas;

      // Dark base
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, width, height);

      // Animated gradient orbs
      const orbs = [
        {
          x: width * (0.3 + 0.15 * Math.sin(time * 0.7)),
          y: height * (0.3 + 0.2 * Math.cos(time * 0.5)),
          r: Math.min(width, height) * 0.5,
          color: "rgba(139, 92, 246, 0.12)",
        },
        {
          x: width * (0.7 + 0.1 * Math.cos(time * 0.6)),
          y: height * (0.6 + 0.15 * Math.sin(time * 0.8)),
          r: Math.min(width, height) * 0.45,
          color: "rgba(59, 130, 246, 0.1)",
        },
        {
          x: width * (0.5 + 0.2 * Math.sin(time * 0.4)),
          y: height * (0.8 + 0.1 * Math.cos(time * 0.9)),
          r: Math.min(width, height) * 0.35,
          color: "rgba(236, 72, 153, 0.08)",
        },
      ];

      for (const orb of orbs) {
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r,
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

// ─── Floating geometric shapes ──────────────────────────────────────
const FloatingShapes = () => {
  const [shapes, setShapes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      rotation: number;
      type: "circle" | "square" | "triangle" | "ring";
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    setShapes(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * 360,
        type: (["circle", "square", "triangle", "ring"] as const)[i % 4],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
      })),
    );
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          animate={{
            y: [0, -40, 20, -30, 0],
            x: [0, 20, -15, 10, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0.03, 0.08, 0.04, 0.07, 0.03],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "circle" && (
            <div
              className="rounded-full border border-purple-400/20"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "square" && (
            <div
              className="rounded-md border border-blue-400/20"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "triangle" && (
            <div
              className="border-l border-r border-b border-pink-400/20"
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
              }}
            />
          )}
          {shape.type === "ring" && (
            <div
              className="rounded-full border-2 border-violet-400/15"
              style={{ width: shape.size * 1.2, height: shape.size * 1.2 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Interactive particles that follow cursor ───────────────────────
const CursorParticles = () => {
  const [trails, setTrails] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const id = nextId.current++;
      setTrails((prev) => [
        ...prev.slice(-12),
        { id, x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <AnimatePresence>
        {trails.map((t) => (
          <motion.div
            key={t.id}
            className="absolute w-2 h-2 rounded-full bg-purple-400/40"
            style={{ left: t.x - 4, top: t.y - 4 }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Auth Page ─────────────────────────────────────────────────
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode =
    searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Animate the card entrance direction
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const switchMode = (newMode: "login" | "register") => {
    setSlideDir(newMode === "register" ? 1 : -1);
    setMode(newMode);
    setError(null);
    setNotice(null);
    setSuccess(false);
  };

  const mapAuthError = (
    err: unknown,
    errMode: "login" | "register" | "google" | "reset" | "verify",
  ) => {
    const code = (err as FirebaseError | undefined)?.code ?? "";
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try signing in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return errMode === "login" ?
            "Invalid email or password."
          : "Could not verify your credentials.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was canceled.";
      case "auth/popup-blocked":
        return "Popup was blocked by your browser. Trying redirect…";
      case "auth/unauthorized-domain":
        return "This domain is not authorized for sign-in. The site admin needs to add it in Firebase Console → Authentication → Settings → Authorized domains.";
      case "auth/cancelled-popup-request":
        return "Sign-in was canceled. Please try again.";
      case "auth/operation-not-allowed":
        return "Google sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method.";
      default:
        if (errMode === "register") return "Could not create your account.";
        if (errMode === "google")
          return "Google sign-in failed. Please try again.";
        if (errMode === "reset") return "Could not send reset email.";
        if (errMode === "verify") return "Could not send verification email.";
        return "Could not sign you in.";
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
    if (score <= 3) return { score, label: "Medium", color: "bg-amber-400" };
    return { score, label: "Strong", color: "bg-emerald-400" };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Authentication is not configured.");
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password,
        );
        if (form.name.trim()) {
          await updateProfile(cred.user, { displayName: form.name.trim() });
        }
        await sendEmailVerification(cred.user);
        await signOut(auth);
        setSuccess(true);
        setNotice(
          "Account created! Check your email for verification, then sign in.",
        );
        setTimeout(() => {
          switchMode("login");
          setSuccess(false);
        }, 3000);
      } else {
        const cred = await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password,
        );
        if (!cred.user.emailVerified) {
          await sendEmailVerification(cred.user);
          await signOut(auth);
          setNotice(
            "Please verify your email first. We sent a new verification link.",
          );
          return;
        }
        setSuccess(true);
        setTimeout(() => router.push("/"), 800);
      }
    } catch (err) {
      setError(mapAuthError(err, mode));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!auth) return;
    const email = form.email.trim();
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setNotice("Password reset email sent!");
    } catch (err) {
      setError(mapAuthError(err, "reset"));
    } finally {
      setBusy(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth) return;
    const email = form.email.trim();
    if (!email || !form.password) {
      setError("Enter email and password, then click resend.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, form.password);
      if (cred.user.emailVerified) {
        setNotice("Email already verified! You can sign in.");
        return;
      }
      await sendEmailVerification(cred.user);
      await signOut(auth);
      setNotice("Verification email resent!");
    } catch (err) {
      setError(mapAuthError(err, "verify"));
    } finally {
      setBusy(false);
    }
  };

  // Handle redirect result on page load (fallback from popup)
  useEffect(() => {
    if (!auth) return;
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setSuccess(true);
          setTimeout(() => router.push("/"), 800);
        }
      })
      .catch((err) => {
        const code = (err as FirebaseError | undefined)?.code ?? "";
        if (code && code !== "auth/popup-closed-by-user") {
          setError(mapAuthError(err, "google"));
        }
      });
  }, []);

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      setError("Google sign-in is not configured.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess(true);
      setTimeout(() => router.push("/"), 800);
    } catch (err) {
      const code = (err as FirebaseError | undefined)?.code ?? "";
      // If popup was blocked, fall back to redirect
      if (code === "auth/popup-blocked") {
        try {
          await signInWithRedirect(auth, googleProvider);
          return; // will redirect, no cleanup needed
        } catch (redirectErr) {
          setError(mapAuthError(redirectErr, "google"));
        }
      } else {
        setError(mapAuthError(err, "google"));
      }
    } finally {
      setBusy(false);
    }
  };

  // ── Features showcase on the left panel ──
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      desc: "Real-time sync across all devices",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Focus Mode",
      desc: "Immersive distraction-free sessions",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Streak Tracking",
      desc: "Build momentum with daily streaks",
    },
  ];

  const [featureIndex, setFeatureIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setFeatureIndex((i) => (i + 1) % features.length),
      3000,
    );
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <MeshBackground />
      <FloatingShapes />
      <CursorParticles />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Back to home */}
      <motion.button
        onClick={() => router.push("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-5xl mx-4 grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5"
      >
        {/* ── Left Panel: Brand showcase ── */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-linear-to-br from-purple-950/80 to-slate-950/90 backdrop-blur-xl border-r border-white/5 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">TaskFlow</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Flow into productivity</p>
          </motion.div>

          {/* Animated feature carousel */}
          <div className="relative z-10 my-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-purple-300"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {features[featureIndex].icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {features[featureIndex].title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {features[featureIndex].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel indicators */}
            <div className="flex gap-2 mt-6">
              {features.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setFeatureIndex(i)}
                  className="relative h-1.5 rounded-full overflow-hidden"
                  animate={{ width: i === featureIndex ? 32 : 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`absolute inset-0 rounded-full ${
                      i === featureIndex ?
                        "bg-linear-to-r from-purple-400 to-blue-400"
                      : "bg-white/20"
                    }`}
                  />
                  {i === featureIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/30"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex -space-x-2">
                {[
                  "from-purple-500 to-indigo-500",
                  "from-pink-500 to-rose-500",
                  "from-blue-500 to-cyan-500",
                  "from-amber-500 to-orange-500",
                ].map((grad, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-linear-to-br ${grad} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["A", "S", "M", "J"][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400 ml-1">+50k users</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-2">
                4.9/5 from 2,000+ reviews
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Right Panel: Auth form ── */}
        <div className="relative p-8 md:p-10 bg-slate-950/80 backdrop-blur-xl overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskFlow</span>
          </div>

          {/* Success overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 mx-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-white"
                >
                  {mode === "register" ? "Account Created!" : "Welcome Back!"}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-gray-400 mt-2"
                >
                  {mode === "register" ?
                    "Check your email for verification"
                  : "Redirecting you..."}
                </motion.p>
                {/* Confetti particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: "50%",
                      top: "40%",
                      background: [
                        "#a855f7",
                        "#3b82f6",
                        "#ec4899",
                        "#10b981",
                        "#f59e0b",
                      ][i % 5],
                    }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: 0,
                      scale: Math.random() * 2,
                      rotate: Math.random() * 720,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: slideDir * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir * -30 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {mode === "login" ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-gray-400">
                {mode === "login" ?
                  "Enter your credentials to access your workspace"
                : "Start your productivity journey today"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Google sign-in */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={busy}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/15 to-transparent" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (register only) */}
            <AnimatePresence>
              {mode === "register" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        activeField === "name" ? "text-purple-400" : (
                          "text-gray-500"
                        )
                      }`}
                    >
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Full name"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        activeField === "name" ?
                          "border-purple-400/50 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                        : "border-white/10 hover:border-white/20"
                      }`}
                      required={mode === "register"}
                    />
                    {activeField === "name" && (
                      <motion.div
                        layoutId="fieldGlow"
                        className="absolute inset-0 rounded-xl border border-purple-400/30 pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  activeField === "email" ? "text-purple-400" : "text-gray-500"
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                  activeField === "email" ?
                    "border-purple-400/50 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                  : "border-white/10 hover:border-white/20"
                }`}
                required
              />
              {activeField === "email" && (
                <motion.div
                  layoutId="fieldGlow"
                  className="absolute inset-0 rounded-xl border border-purple-400/30 pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    activeField === "password" ? "text-purple-400" : (
                      "text-gray-500"
                    )
                  }`}
                >
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField(null)}
                  placeholder="At least 6 characters"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                    activeField === "password" ?
                      "border-purple-400/50 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                    : "border-white/10 hover:border-white/20"
                  }`}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ?
                    <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />}
                </button>
                {activeField === "password" && (
                  <motion.div
                    layoutId="fieldGlow"
                    className="absolute inset-0 rounded-xl border border-purple-400/30 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>

              {/* Password strength */}
              {mode === "register" && form.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <motion.div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          passwordStrength.score >= level ?
                            passwordStrength.color
                          : "bg-white/10"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: level * 0.05 }}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {passwordStrength.label}
                  </p>
                </motion.div>
              )}

              {/* Login helpers */}
              {mode === "login" && (
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={busy}
                    className="text-xs text-purple-300 hover:text-purple-200 transition-colors disabled:opacity-60"
                  >
                    Forgot password?
                  </button>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={busy}
                    className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors disabled:opacity-60"
                  >
                    Resend verification
                  </button>
                </div>
              )}
            </div>

            {/* Notice */}
            <AnimatePresence>
              {notice && (
                <motion.p
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 rounded-xl"
                >
                  {notice}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={busy}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="relative w-full px-4 py-3.5 rounded-xl font-semibold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {/* Button gradient bg */}
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all" />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {busy ?
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                : <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                }
              </span>
            </motion.button>
          </form>

          {/* Mode switcher */}
          <motion.p
            className="mt-6 text-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {mode === "login" ?
              "Don\u2019t have an account?"
            : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === "login" ? "register" : "login")
              }
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </motion.p>

          {/* Terms */}
          <p className="mt-4 text-center text-[11px] text-gray-600">
            By continuing, you agree to TaskFlow&apos;s Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#050510]">
          <motion.div
            className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
