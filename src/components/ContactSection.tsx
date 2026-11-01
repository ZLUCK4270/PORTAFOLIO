import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check, MessageSquare, ArrowRight, User, AtSign, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

export const ContactSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const isCrimson = accentTheme === 'crimson';
  const textAccent = isCrimson ? 'text-red-400' : 'text-cyan-400';
  const btnPrimary = isCrimson
    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 pulse-red-button'
    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-cyan-500/20';
  const focusBorder = isCrimson ? 'focus:border-red-500/80' : 'focus:border-cyan-500/80';

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'luciano37017@gmail.com';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Por favor ingresa tu nombre completo.';
    }
    if (!formData.email.trim()) {
      errs.email = 'El correo electrónico es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Por favor ingresa un correo electrónico válido.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Por favor especifica el motivo o asunto.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate interactive transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 relative bg-[#060407] border-t border-red-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Channels with gentle reveal */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal direction="up" distance={28} duration={0.7}>
              <div>
                <div className={`text-xs font-mono ${textAccent} mb-2 uppercase tracking-wider`}>
                  Contacto Directo
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
                  Iniciemos una Conversación
                </h2>
                <p className="text-sm text-slate-300/85 leading-relaxed mb-8">
                  Abierto a oportunidades de prácticas preprofesionales, proyectos de ingeniería de software, desarrollo de inteligencia artificial y soluciones full-stack. ¡Hablemos!
                </p>

                {/* Direct Email Card with One-Click Copy & Crimson Relief */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#12070a]/90 via-[#0a0507]/90 to-[#050305]/95 backdrop-blur-md border border-red-950/60 hover:border-red-500/60 transition-all shadow-xl shadow-black/60 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">CORREO PRINCIPAL</div>
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${emailAddress}`}
                      className={`text-sm sm:text-base font-mono ${textAccent} hover:underline font-medium truncate`}
                    >
                      {emailAddress}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 px-3 rounded-xl bg-gradient-to-br from-red-950/60 to-black/80 backdrop-blur-xs border border-red-900/40 text-slate-300 hover:text-white hover:border-red-500/50 transition-all flex items-center gap-1.5 text-xs font-mono shrink-0 cursor-pointer shadow-sm"
                      title="Copiar correo"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Channels List with Crimson Relief */}
                <div className="space-y-3 mb-8">
                  <a
                    href="https://github.com/ZLUCK4270"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-b from-[#10070a]/80 via-[#090507]/80 to-[#050305]/90 backdrop-blur-md border border-red-950/50 hover:border-red-500/50 hover:bg-[#16080d]/90 transition-all text-xs sm:text-sm text-slate-300 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                      <div>
                        <span className="font-medium">Perfil de GitHub</span>
                        <span className="block text-[11px] font-mono text-slate-500">@ZLUCK4270</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/lucianoac25"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-b from-[#10070a]/80 via-[#090507]/80 to-[#050305]/90 backdrop-blur-md border border-red-950/50 hover:border-red-500/50 hover:bg-[#16080d]/90 transition-all text-xs sm:text-sm text-slate-300 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-red-400" />
                      <div>
                        <span className="font-medium">Conexión en LinkedIn</span>
                        <span className="block text-[11px] font-mono text-slate-500">in/lucianoac25</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-b from-[#10070a]/80 via-[#090507]/80 to-[#050305]/90 backdrop-blur-md border border-red-950/50 text-xs sm:text-sm text-slate-300 shadow-md">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-rose-400" />
                      <span>Ubicación / Modalidad</span>
                    </div>
                    <span className="text-xs font-mono text-slate-300">Lima, Perú · Híbrido / Remoto</span>
                  </div>
                </div>

                {/* Academic Credential badge with Frosted Glass */}
                <div className="pt-6 border-t border-red-950/50 text-xs text-slate-400 flex items-center">
                  <span className="font-mono text-red-400 font-semibold px-2 py-0.5 rounded-md bg-red-950/50 border border-red-500/40 backdrop-blur-xs">SENATI</span>
                  <span className="mx-2.5 text-slate-600">/</span>
                  <span>Ingeniería de Software con Inteligencia Artificial</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Contact Form with Glassmorphism & ScrollReveal */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" distance={28} duration={0.7} delay={0.15}>
              <div className="bg-gradient-to-b from-[#12070a]/90 via-[#0a0507]/90 to-[#050305]/95 backdrop-blur-md border border-red-950/60 rounded-3xl p-6 sm:p-8 relative shadow-2xl shadow-black/70">
            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mb-6">
                  Muchas gracias por comunicarte, Zenón Luciano responderá a la brevedad a tu correo electrónico.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer shadow-lg shadow-cyan-400/20"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                  <span>Formulario de Contacto</span>
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    NOMBRE COMPLETO *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c0709]/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border rounded-xl focus:outline-none transition-all shadow-inner ${
                        errors.name
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : focusBorder
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    CORREO ELECTRÓNICO *
                  </label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu.nombre@empresa.com"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c0709]/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border rounded-xl focus:outline-none transition-all shadow-inner ${
                        errors.email
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : focusBorder
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    ASUNTO / PROPUESTA *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ej. Oportunidad de Prácticas / Desarrollo IA"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c0709]/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border rounded-xl focus:outline-none transition-all shadow-inner ${
                        errors.subject
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : focusBorder
                      }`}
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    MENSAJE DETALLADO *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe los detalles de la consulta, proyecto o propuesta..."
                    className={`w-full p-3 text-xs font-sans bg-[#0c0709]/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border rounded-xl focus:outline-none transition-all resize-none shadow-inner ${
                      errors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : focusBorder
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 text-xs font-bold disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${btnPrimary}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                        <span>Enviando mensaje...</span>
                      </div>
                    ) : (
                      <>
                        <span>Enviar Mensaje</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

