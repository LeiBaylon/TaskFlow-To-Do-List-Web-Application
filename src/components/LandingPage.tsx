"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Zap,
  CheckCircle2,
  Calendar,
  Flame,
  Sparkles,
  ArrowRight,
  BarChart3,
  Clock,
  Target,
  Users,
  MessageSquare,
  Lightbulb,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Star,
  Shield,
  Layers,
  Trophy,
  Eye,
  Layout,
  Quote,
  Monitor,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";

const LandingPage: React.FC<{ onGetStarted?: () => void }> = ({
  onGetStarted,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ delay: number; x: number; y: number }>
  >([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleArray = [...Array(15)].map((_, i) => ({
      delay: i * 0.2,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    onGetStarted?.();
    setAuthMode("register");
    setAuthError(null);
    setAuthNotice(null);
    setAuthModalOpen(true);
  };

  const openAuthModal = (mode: "login" | "register") => {
    onGetStarted?.();
    setAuthMode(mode);
    setAuthError(null);
    setAuthNotice(null);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    if (authBusy) return;
    setAuthModalOpen(false);
    setAuthError(null);
    setAuthNotice(null);
  };

  const mapAuthError = (
    err: unknown,
    mode: "login" | "register" | "google" | "reset" | "verify",
  ) => {
    const code = (err as FirebaseError | undefined)?.code ?? "";
    switch (code) {
      case "auth/email-already-in-use":
        return "Register failed: this email is already in use. Try logging in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Register failed: password is too weak. Use at least 6 characters.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return mode === "login" ?
            "Login failed: invalid email or password."
          : "Could not verify your credentials.";
      case "auth/too-many-requests":
        return "Too many attempts right now. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact support.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was canceled before completion.";
      default:
        if (mode === "register")
          return "Could not create your account right now.";
        if (mode === "google")
          return "Google sign-in failed. Please try again.";
        if (mode === "reset") return "Could not send reset email right now.";
        if (mode === "verify")
          return "Could not send verification email right now.";
        return "Could not sign you in right now.";
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "bg-white/10" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
    if (score <= 3) return { score, label: "Medium", color: "bg-amber-400" };
    return { score, label: "Strong", color: "bg-emerald-400" };
  };

  const passwordStrength = getPasswordStrength(authForm.password);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
      setAuthError("Authentication is not configured yet.");
      return;
    }

    setAuthBusy(true);
    setAuthError(null);
    setAuthNotice(null);
    try {
      if (authMode === "register") {
        const cred = await createUserWithEmailAndPassword(
          auth,
          authForm.email.trim(),
          authForm.password,
        );
        const displayName = authForm.name.trim();
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
        await sendEmailVerification(cred.user);
        await signOut(auth);

        setAuthMode("login");
        setAuthForm((prev) => ({ ...prev, password: "" }));
        setAuthNotice(
          "Account created. We sent a verification email. Please verify before logging in.",
        );
      } else {
        const cred = await signInWithEmailAndPassword(
          auth,
          authForm.email.trim(),
          authForm.password,
        );

        if (!cred.user.emailVerified) {
          await sendEmailVerification(cred.user);
          await signOut(auth);
          setAuthNotice(
            "Please verify your email first. We just sent a new verification link.",
          );
          return;
        }

        setAuthModalOpen(false);
        setAuthForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setAuthError(mapAuthError(err, authMode));
    } finally {
      setAuthBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!auth) {
      setAuthError("Authentication is not configured yet.");
      return;
    }
    const email = authForm.email.trim();
    if (!email) {
      setAuthError("Enter your email above first, then click Forgot password.");
      return;
    }

    setAuthBusy(true);
    setAuthError(null);
    setAuthNotice(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setAuthNotice("Password reset email sent. Check your inbox.");
    } catch (err) {
      setAuthError(mapAuthError(err, "reset"));
    } finally {
      setAuthBusy(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth) {
      setAuthError("Authentication is not configured yet.");
      return;
    }
    const email = authForm.email.trim();
    const password = authForm.password;
    if (!email || !password) {
      setAuthError(
        "Enter your email and password, then click Resend verification.",
      );
      return;
    }

    setAuthBusy(true);
    setAuthError(null);
    setAuthNotice(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.emailVerified) {
        setAuthNotice("Your email is already verified. You can log in now.");
        return;
      }
      await sendEmailVerification(cred.user);
      await signOut(auth);
      setAuthNotice("Verification email sent again. Please check your inbox.");
    } catch (err) {
      setAuthError(mapAuthError(err, "verify"));
    } finally {
      setAuthBusy(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      setAuthError("Google sign-in is not configured yet.");
      return;
    }
    setAuthBusy(true);
    setAuthError(null);
    setAuthNotice(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setAuthModalOpen(false);
    } catch (err) {
      setAuthError(mapAuthError(err, "google"));
    } finally {
      setAuthBusy(false);
    }
  };

  // Animated blob background
  const FloatingBlob = ({
    delay,
    size,
    duration,
  }: {
    delay: number;
    size: string;
    duration: number;
  }) => (
    <motion.div
      className={`absolute ${size} rounded-full blur-3xl opacity-20 pointer-events-none`}
      style={{
        background: `linear-gradient(135deg, 
          rgba(168, 85, 247, 0.5) 0%, 
          rgba(59, 130, 246, 0.3) 50%, 
          rgba(16, 185, 129, 0.2) 100%)`,
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  // Particle effect
  const Particle = ({
    delay,
    x,
    y,
  }: {
    delay: number;
    x: number;
    y: number;
  }) => (
    <motion.div
      className="absolute w-1 h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
      }}
    />
  );

  // Counter animation component
  const AnimatedCounter = ({
    end,
    duration = 2,
  }: {
    end: number;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration * 60);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, [end, duration]);

    return <span>{count}</span>;
  };

  // Feature details data
  const featureDetails: Record<
    string,
    {
      title: string;
      fullDescription: string;
      benefits: string[];
      icon: React.ReactNode;
      color: string;
    }
  > = {
    "Lightning Fast": {
      title: "Lightning Fast",
      icon: <Zap className="w-10 h-10" />,
      color: "from-yellow-500/30 to-orange-500/30",
      fullDescription:
        "Experience seamless task management with real-time synchronization across all your devices. Never worry about losing a task again - everything syncs instantly whether you're on your phone, tablet, or desktop.",
      benefits: [
        "Instant sync across devices",
        "Zero data loss",
        "Offline mode support",
        "Cloud backup",
      ],
    },
    "Smart Scheduling": {
      title: "Smart Scheduling",
      icon: <Calendar className="w-10 h-10" />,
      color: "from-blue-500/30 to-cyan-500/30",
      fullDescription:
        "Let AI help you manage your time better. Our intelligent calendar integration analyzes your habits and automatically suggests optimal deadlines and reminders based on your productivity patterns.",
      benefits: [
        "AI-powered deadline suggestions",
        "Calendar integration",
        "Smart reminders",
        "Intelligent task ordering",
      ],
    },
    "Streak Tracking": {
      title: "Streak Tracking",
      icon: <Flame className="w-10 h-10" />,
      color: "from-orange-500/30 to-red-500/30",
      fullDescription:
        "Build unstoppable momentum with daily streaks and motivational achievements. Track your progress visually and celebrate milestones as you develop consistent productivity habits.",
      benefits: [
        "Daily streak counter",
        "Achievement badges",
        "Progress visualization",
        "Motivation boost",
      ],
    },
    "Focus Mode": {
      title: "Focus Mode",
      icon: <Target className="w-10 h-10" />,
      color: "from-emerald-500/30 to-teal-500/30",
      fullDescription:
        "Eliminate distractions with immersive focus sessions. Set customizable timers, block notifications, and create a distraction-free zone to maximize your deep work sessions.",
      benefits: [
        "Pomodoro timers",
        "Distraction blocking",
        "Focus analytics",
        "Background sounds",
      ],
    },
    Analytics: {
      title: "Analytics",
      icon: <BarChart3 className="w-10 h-10" />,
      color: "from-violet-500/30 to-purple-500/30",
      fullDescription:
        "Gain deep insights into your productivity patterns and progress. Beautiful visualizations show your habits, completion rates, and trends to help you optimize your workflow.",
      benefits: [
        "Productivity metrics",
        "Completion charts",
        "Time tracking",
        "Weekly reports",
      ],
    },
    "Kanban Boards": {
      title: "Kanban Boards",
      icon: <Layout className="w-10 h-10" />,
      color: "from-pink-500/30 to-rose-500/30",
      fullDescription:
        "Visualize your workflow with customizable Kanban boards. Drag-and-drop tasks between columns, create multiple boards for different projects, and collaborate with team members.",
      benefits: [
        "Drag-and-drop interface",
        "Custom columns",
        "Team collaboration",
        "Project management",
      ],
    },
  };

  // Feature card with hover effect
  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    index,
    onClick,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
    onClick?: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
      }}
      onClick={onClick}
      className="group relative p-6 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer"
    >
      {/* Gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Icon with glow effect */}
      <motion.div
        className="relative z-10 text-4xl mb-4 inline-block p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-blue-500/20"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        {Icon}
      </motion.div>

      <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
        {title}
      </h3>
      <p className="relative z-10 text-gray-300 text-sm leading-relaxed">
        {description}
      </p>

      {/* Arrow animation */}
      <motion.div
        className="relative z-10 mt-4 inline-flex items-center text-purple-400 text-sm font-semibold hover:text-purple-300 active:text-purple-500 transition-colors"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        Learn more <ArrowRight className="ml-2 w-4 h-4" />
      </motion.div>
    </motion.div>
  );

  // Testimonial card
  const TestimonialCard = ({
    name,
    role,
    content,
    avatar,
    rating,
    index,
  }: {
    name: string;
    role: string;
    content: string;
    avatar: { initials: string; from: string; to: string };
    rating: number;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative p-6 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-purple-500/10 to-blue-500/10" />
      {/* Decorative quote watermark */}
      <div className="absolute -top-2 -right-2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Quote className="w-24 h-24 text-white" />
      </div>
      <div className="relative z-10">
        {/* Star rating */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + i * 0.08 }}
            >
              <Star
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-gray-100/95 mb-6 italic leading-relaxed text-[15px]">
          &ldquo;{content}&rdquo;
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <motion.div
            className={`w-11 h-11 rounded-full bg-linear-to-br ${avatar.from} ${avatar.to} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            {avatar.initials}
          </motion.div>
          <div>
            <p className="font-semibold text-white text-sm">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingBlob delay={0} size="w-96 h-96" duration={8} />
        <FloatingBlob delay={1} size="w-72 h-72" duration={10} />
        <FloatingBlob delay={2} size="w-80 h-80" duration={12} />

        {/* Particles */}
        {particles.map((particle, i) => (
          <Particle
            key={i}
            delay={particle.delay}
            x={particle.x}
            y={particle.y}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="w-8 h-8 text-purple-400" />
              TaskFlow
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {["About", "Features", "Pricing", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ?
                <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
            </motion.button>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                onClick={() => openAuthModal("login")}
                className="px-4 py-2 rounded-lg font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => openAuthModal("register")}
                className="px-5 py-2 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10"
              >
                <div className="py-4 space-y-3 px-4">
                  {["About", "Features", "Pricing", "Contact"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-sm font-medium text-gray-300 hover:text-white py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <motion.button
                      onClick={() => {
                        openAuthModal("login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        openAuthModal("register");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-blue-500"
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">
              ✨ Your Productivity Supercharged
            </span>
          </motion.div>

          {/* Main heading with word-by-word animation */}
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {["Master", "Your", "Tasks", "Like", "Never", "Before"].map(
              (word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                  }}
                  className={
                    index >= 3 ?
                      "bg-linear-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
                    : ""
                  }
                >
                  {word}{" "}
                </motion.span>
              ),
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            The ultimate productivity suite combining task management, focus
            modes, and intelligent organization. Stay organized, stay focused,
            stay motivated.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-xl font-bold bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 rounded-xl font-bold border-2 border-purple-400/50 text-white hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Active Users", value: 50000 },
              { label: "Tasks Completed", value: 1000000 },
              { label: "Hours Saved", value: 500000 },
              { label: "Streak Records", value: 100000 },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <motion.div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} />+
                </motion.div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating UI Preview */}
        <motion.div
          className="absolute bottom-0 right-0 w-48 h-48 opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-lg bg-linear-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/10" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="pointer-events-none absolute -top-10 right-10 h-36 w-36 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-8 md:p-12 backdrop-blur-md mb-18 overflow-hidden"
        >
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <span className="inline-flex items-center rounded-full border border-purple-300/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-purple-200 mb-4">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Why teams choose TaskFlow
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-5">
                About TaskFlow
              </h2>
              <p className="text-gray-100/95 text-lg max-w-2xl leading-relaxed mb-6">
                TaskFlow was designed for people who want momentum, not just
                checklists. We blend planning, focus, and reflection into one
                elegant workspace so your goals stay visible and your days stay
                intentional.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Enterprise-grade security
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  Cross-platform
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  Mobile ready
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    label: "Weekly Active",
                    value: "50k+",
                    icon: <Users className="w-4 h-4 text-purple-300" />,
                  },
                  {
                    label: "Tasks Closed",
                    value: "1M+",
                    icon: <CheckCircle2 className="w-4 h-4 text-emerald-300" />,
                  },
                  {
                    label: "Avg. Focus",
                    value: "92 min",
                    icon: <Clock className="w-4 h-4 text-blue-300" />,
                  },
                  {
                    label: "Satisfaction",
                    value: "4.9/5",
                    icon: <Star className="w-4 h-4 text-yellow-300" />,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-xl border border-white/15 bg-white/5 p-3 text-center"
                  >
                    <div className="flex justify-center mb-1.5">
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <p className="text-xs text-gray-400">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* App Preview Mockup */}
            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Browser mockup */}
                <div className="rounded-xl border border-white/15 bg-slate-900/90 shadow-2xl shadow-purple-500/10 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-6 rounded-md bg-white/5 border border-white/10 flex items-center px-3">
                        <span className="text-[10px] text-gray-500">
                          taskflow.app/dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* App content mockup */}
                  <div className="p-4 space-y-3">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-semibold text-white">
                          My Tasks
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
                          <Layers className="w-3 h-3 text-purple-300" />
                        </div>
                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                          <BarChart3 className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    {/* Task items */}
                    {[
                      {
                        text: "Design review for Q4 launch",
                        done: true,
                        tag: "Design",
                        tagColor: "bg-pink-500/20 text-pink-300",
                      },
                      {
                        text: "Update API documentation",
                        done: true,
                        tag: "Dev",
                        tagColor: "bg-blue-500/20 text-blue-300",
                      },
                      {
                        text: "Sprint planning meeting",
                        done: false,
                        tag: "Meeting",
                        tagColor: "bg-amber-500/20 text-amber-300",
                      },
                      {
                        text: "Review pull requests",
                        done: false,
                        tag: "Dev",
                        tagColor: "bg-blue-500/20 text-blue-300",
                      },
                    ].map((task, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            task.done ?
                              "border-emerald-400 bg-emerald-400/20"
                            : "border-gray-500"
                          }`}
                        >
                          {task.done && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          )}
                        </div>
                        <span
                          className={`text-xs flex-1 ${task.done ? "line-through text-gray-500" : "text-gray-200"}`}
                        >
                          {task.text}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full ${task.tagColor}`}
                        >
                          {task.tag}
                        </span>
                      </motion.div>
                    ))}
                    {/* Streak bar */}
                    <div className="mt-2 p-2.5 rounded-lg bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-[10px] font-semibold text-white">
                            12-day streak!
                          </span>
                        </div>
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "78%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="h-full rounded-full bg-linear-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating notification card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-slate-900 border border-white/15 shadow-xl shadow-purple-500/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white">
                        Achievement Unlocked!
                      </p>
                      <p className="text-[9px] text-gray-400">
                        Task Master: 100 tasks done
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-gray-200 mb-4">
            Trusted globally
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-gray-300">See what our users are saying</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Chen",
              role: "Product Manager at Stripe",
              content:
                "TaskFlow transformed how I manage my daily workflow. The streaks feature keeps me motivated and my team aligned!",
              avatar: {
                initials: "AC",
                from: "from-purple-500",
                to: "to-indigo-500",
              },
              rating: 5,
            },
            {
              name: "Sarah Johnson",
              role: "Freelance Designer",
              content:
                "The kanban board is incredibly smooth. It's like they built this specifically for creatives. Absolute game changer.",
              avatar: {
                initials: "SJ",
                from: "from-pink-500",
                to: "to-rose-500",
              },
              rating: 5,
            },
            {
              name: "Michael Park",
              role: "Software Engineer at Google",
              content:
                "Finally, a todo app that actually scales with complexity. Love the focus mode and analytics dashboard!",
              avatar: {
                initials: "MP",
                from: "from-blue-500",
                to: "to-cyan-500",
              },
              rating: 5,
            },
          ].map((testimonial, index) => (
            <TestimonialCard key={index} index={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to organize your life and boost productivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Lightning Fast",
              description:
                "Real-time synchronization across all your devices. Never lose a task again.",
            },
            {
              icon: <Calendar className="w-6 h-6" />,
              title: "Smart Scheduling",
              description:
                "Intelligent calendar integration with automatic deadline suggestions.",
            },
            {
              icon: <Flame className="w-6 h-6" />,
              title: "Streak Tracking",
              description:
                "Build momentum with daily streaks and motivational achievements.",
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: "Focus Mode",
              description:
                "Eliminate distractions with immersive focus sessions and timers.",
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Analytics",
              description:
                "Visual insights into your productivity patterns and progress.",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Kanban Boards",
              description:
                "Drag-and-drop task management with beautiful board views.",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              {...feature}
              onClick={() => {
                setSelectedFeature(feature.title);
                setFeatureModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pricing That Scales With You
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Start free, then upgrade when your workflow needs more power.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$0",
              subtitle: "Perfect for personal productivity",
              perks: [
                "Unlimited tasks",
                "List + Calendar views",
                "Daily streak tracking",
              ],
            },
            {
              name: "Pro",
              price: "$9",
              subtitle: "For focused professionals",
              perks: [
                "Everything in Starter",
                "Kanban + advanced analytics",
                "Priority support",
              ],
            },
            {
              name: "Team",
              price: "$19",
              subtitle: "Built for collaborative teams",
              perks: [
                "Everything in Pro",
                "Shared workspaces",
                "Team productivity dashboard",
              ],
            },
          ].map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-6 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-2 bg-linear-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                {plan.price}
                <span className="text-base text-gray-300">/mo</span>
              </div>
              <p className="text-sm text-gray-300 mb-5">{plan.subtitle}</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-200">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-300 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full rounded-xl px-4 py-2.5 font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions, feature requests, or partnership ideas? Send us a
            message and we will get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-6 md:p-8 backdrop-blur-md"
          >
            <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
            <p className="text-gray-300 mb-6">
              We usually reply within 24 hours on business days.
            </p>

            <div className="space-y-4 text-sm">
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <p className="text-gray-400 mb-1">Email</p>
                <a
                  href="mailto:hello@taskflow.app"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  hello@taskflow.app
                </a>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <p className="text-gray-400 mb-1">Support</p>
                <a
                  href="mailto:support@taskflow.app"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  support@taskflow.app
                </a>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <p className="text-gray-400 mb-1">Office</p>
                <p className="text-white">Remote-first, Worldwide</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-6 md:p-8 backdrop-blur-md space-y-4"
          >
            <h3 className="text-2xl font-bold mb-1">Send a Message</h3>
            <p className="text-sm text-gray-300 mb-4">
              This form is UI-only for now.
            </p>

            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl px-4 py-2.5 font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-linear-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of users who are already organizing their tasks and
              building better habits.
            </p>

            <motion.button
              onClick={handleGetStarted}
              className="px-10 py-4 rounded-xl font-bold text-lg bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-6 h-6" />
              </span>
            </motion.button>

            <p className="mt-4 text-sm text-gray-400">
              No credit card required • 7-day free trial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative border-t border-white/10 bg-black/40 backdrop-blur-md py-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                <span className="font-bold text-lg">TaskFlow</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Productivity redefined for modern teams.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { label: "About", href: "#about" },
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "#contact" },
                ],
              },
              {
                title: "Connect",
                links: [
                  { label: "Twitter", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "GitHub", href: "#" },
                ],
              },
            ].map((col, i) => (
              <div key={i} className="md:col-span-2 lg:col-span-2">
                <h4 className="font-semibold mb-4 tracking-wide">
                  {col.title}
                </h4>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © 2026 TaskFlow. All rights reserved.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ y: -3, scale: 1.2 }}
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-purple-500/20 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {authModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={closeAuthModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/15 bg-linear-to-br from-slate-900/95 to-purple-900/80 p-6 md:p-7"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-bold">
                  {authMode === "login" ? "Welcome Back" : "Create Account"}
                </h3>
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-5 rounded-xl bg-white/5 p-1 grid grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError(null);
                    setAuthNotice(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    authMode === "login" ?
                      "bg-white/15 text-white"
                    : "text-gray-300"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("register");
                    setAuthError(null);
                    setAuthNotice(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    authMode === "register" ?
                      "bg-white/15 text-white"
                    : "text-gray-300"
                  }`}
                >
                  Register
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <div>
                    <label
                      htmlFor="auth-name"
                      className="block text-sm text-gray-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="auth-name"
                      type="text"
                      value={authForm.name}
                      onChange={(e) =>
                        setAuthForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Jane Doe"
                      className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                      required={authMode === "register"}
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="auth-email"
                    className="block text-sm text-gray-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    value={authForm.email}
                    onChange={(e) =>
                      setAuthForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="auth-password"
                    className="block text-sm text-gray-300 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    value={authForm.password}
                    onChange={(e) =>
                      setAuthForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                    minLength={6}
                    required
                  />
                  {authMode === "register" && authForm.password && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all`}
                          style={{
                            width: `${Math.max(20, passwordStrength.score * 25)}%`,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-300">
                        Password strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                  {authMode === "login" && (
                    <div className="mt-2 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={authBusy}
                        className="text-xs text-purple-300 hover:text-purple-200 transition-colors disabled:opacity-60"
                      >
                        Forgot password?
                      </button>
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={authBusy}
                        className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors disabled:opacity-60"
                      >
                        Resend verification
                      </button>
                    </div>
                  )}
                </div>

                {authNotice && (
                  <p className="text-sm text-cyan-200 bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-lg">
                    {authNotice}
                  </p>
                )}

                {authError && (
                  <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={authBusy}
                  className="w-full rounded-xl px-4 py-2.5 font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {authBusy ?
                    "Please wait..."
                  : authMode === "login" ?
                    "Login"
                  : "Create Account"}
                </button>
              </form>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px bg-white/15 flex-1" />
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  or
                </span>
                <div className="h-px bg-white/15 flex-1" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={authBusy}
                className="w-full rounded-xl px-4 py-2.5 font-medium border border-white/20 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Feature Modal */}
        {featureModalOpen &&
          selectedFeature &&
          featureDetails[selectedFeature] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-80 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
              onClick={() => setFeatureModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl bg-linear-to-br from-slate-900 to-slate-950 border border-white/15 shadow-2xl overflow-hidden"
              >
                {/* Hero banner with icon */}
                <div
                  className={`relative px-8 pt-8 pb-6 bg-linear-to-br ${featureDetails[selectedFeature].color}`}
                >
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/80" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.1,
                        }}
                        className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                      >
                        {featureDetails[selectedFeature].icon}
                      </motion.div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">
                          {featureDetails[selectedFeature].title}
                        </h2>
                        <div className="h-1 w-16 bg-linear-to-r from-purple-400 to-blue-400 rounded mt-2" />
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setFeatureModalOpen(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <p className="text-gray-200 text-lg leading-relaxed mb-8">
                    {featureDetails[selectedFeature].fullDescription}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Key Benefits
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {featureDetails[selectedFeature].benefits.map(
                        (benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-gray-200 text-sm">
                              {benefit}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      setFeatureModalOpen(false);
                      openAuthModal("register");
                    }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3.5 rounded-xl font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-white flex items-center justify-center gap-2"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
