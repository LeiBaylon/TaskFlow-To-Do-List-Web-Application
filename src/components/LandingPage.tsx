"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";

const LandingPage: React.FC<{ onGetStarted?: () => void }> = ({
  onGetStarted,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ delay: number; x: number; y: number }>>([]);
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
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated blob background
  const FloatingBlob = ({ delay, size, duration }: { delay: number; size: string; duration: number }) => (
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
  const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
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

  // Feature card with hover effect
  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    index,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
      }}
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
        className="relative z-10 mt-4 inline-flex items-center text-purple-400 text-sm font-semibold"
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
    index,
  }: {
    name: string;
    role: string;
    content: string;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="p-6 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + i * 0.1 }}
            className="text-yellow-400 text-lg"
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <p className="text-gray-200 mb-4 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
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
              {["Features", "Pricing", "About"].map((item) => (
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
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              onClick={onGetStarted}
              className="hidden md:inline-block px-6 py-2 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
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
                  {["Features", "Pricing", "About"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-sm font-medium text-gray-300 hover:text-white py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                  <motion.button
                    onClick={() => {
                      onGetStarted?.();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-blue-500 mt-4"
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
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
                    index >= 3
                      ? "bg-linear-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {word}{" "}
                </motion.span>
              )
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            The ultimate productivity suite combining task management, focus modes, and
            intelligent organization. Stay organized, stay focused, stay motivated.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onGetStarted}
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

      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 px-4 max-w-7xl mx-auto"
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
              description: "Build momentum with daily streaks and motivational achievements.",
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: "Focus Mode",
              description: "Eliminate distractions with immersive focus sessions and timers.",
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
              description: "Drag-and-drop task management with beautiful board views.",
            },
          ].map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See It In Action
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10"
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30 blur"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative bg-black/40 backdrop-blur-md p-8 md:p-12">
              <motion.div
                className="grid md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.2 }}
              >
                {["Plan", "Execute", "Achieve"].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      {i + 1}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 pl-6">{step}</h3>
                    <p className="text-gray-300 pl-6">
                      {i === 0 && "Create and organize tasks with our intuitive interface."}
                      {i === 1 && "Focus with Pomodoro timers and minimal distractions."}
                      {i === 2 && "Celebrate wins and build lasting habits."}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="relative py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-gray-300">See what our users are saying</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Chen",
              role: "Product Manager",
              content:
                "TaskFlow transformed how I manage my daily workflow. The streaks feature keeps me motivated!",
            },
            {
              name: "Sarah Johnson",
              role: "Freelance Designer",
              content:
                "The kanban board is incredibly smooth. It's like they built this specifically for creatives.",
            },
            {
              name: "Michael Park",
              role: "Software Engineer",
              content:
                "Finally, a todo app that actually scales with complexity. Love the focus mode!",
            },
          ].map((testimonial, index) => (
            <TestimonialCard key={index} index={index} {...testimonial} />
          ))}
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
              onClick={onGetStarted}
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                <span className="font-bold text-lg">TaskFlow</span>
              </div>
              <p className="text-sm text-gray-400">
                Productivity redefined for modern teams.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
              {
                title: "Connect",
                links: ["Twitter", "LinkedIn", "GitHub"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2026 TaskFlow. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ y: -3, scale: 1.2 }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-purple-500/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
