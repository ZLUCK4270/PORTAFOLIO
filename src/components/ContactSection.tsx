import React, { useState, useRef } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check, MessageSquare, ArrowRight, User, AtSign, FileText, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal, MotionCard } from './ScrollReveal.tsx';

export const ContactSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const emailAddress = 'luciano37017@gmail.com';

  const getAccentText = () => {
    if (accentTheme === 'emerald') return 'text-emerald-400';
    if (accentTheme === 'cyan') return 'text-cyan-400';
    return 'text-blue-400';
  };

  const getPrimaryBtn = () => {
    if (accentTheme === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40';
    if (accentTheme === 'cyan') return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950/40';
    return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/40';
  };

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
      errs.subject = 'Por favor especifica el motivo o propuesta laboral.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'El mensaje debe tener al menos 5 caracteres.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Envío a través de formulario HTML nativo hacia FormSubmit dirigido al iframe invisible
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (formRef.current) {
      formRef.current.submit();
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopySummary = () => {
    const text = `Propuesta para Zenón Luciano Acuña (${emailAddress}):\nDe: ${formData.name} <${formData.email}>\nAsunto: ${formData.subject}\nMensaje:\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // URL directa para abrir el redactor oficial de Gmail en una pestaña nueva con datos prellenados
  const gmailDirectUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
    formData.subject ? `[Portafolio] ${formData.subject}` : 'Contacto desde Portafolio Profesional'
  )}&body=${encodeURIComponent(
    `Hola Zenón Luciano,\n\nMi nombre es ${formData.name || '[Nombre]'}.\n\n${
      formData.message || '[Escribe aquí tu consulta o propuesta laboral]'
    }\n\nContacto de respuesta: ${formData.email || '[Tu Correo]'}`
  )}`;

  return (
    <section id="contacto" className="py-20 lg:py-24 relative bg-[#070a12] border-t border-slate-800/80">
      {/* Iframe oculto para procesar el envío sin recarga ni bloqueos */}
      <iframe
        name="formsubmit_target_iframe"
        id="formsubmit_target_iframe"
        title="FormSubmit Target"
        className="hidden"
        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal direction="up" distance={24} duration={0.65}>
              <div>
                <div className={`text-xs font-mono ${getAccentText()} mb-2 uppercase tracking-wider`}>
                  Contacto Profesional
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
                  Iniciemos una Conversación
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Disponible para oportunidades de prácticas preprofesionales, proyectos de ingeniería de software, desarrollo backend y despliegue de modelos de inteligencia artificial.
                </p>

                {/* Direct Email Card with One-Click Copy */}
                <MotionCard
                  hoverY={-3}
                  className="p-5 rounded-xl bg-[#0b101d] border border-slate-800 hover:border-slate-700 transition-colors shadow-md mb-5"
                >
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                    CORREO ELECTRÓNICO PERSONAL
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${emailAddress}`}
                      className={`text-sm sm:text-base font-mono ${getAccentText()} hover:underline font-medium truncate`}
                    >
                      {emailAddress}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 px-3 rounded-lg bg-[#0e1424] border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-1.5 text-xs font-mono shrink-0 cursor-pointer active:scale-95"
                      title="Copiar correo"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </MotionCard>

                {/* Social Channels List */}
                <div className="space-y-2.5 mb-6">
                  <a
                    href="https://github.com/ZLUCK4270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b101d] border border-slate-800 hover:border-slate-700 hover:bg-[#0f172a] transition-all text-xs sm:text-sm text-slate-300 group shadow-xs hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      <div>
                        <span className="font-medium text-white">Repositorio en GitHub</span>
                        <span className="block text-[11px] font-mono text-slate-500">@ZLUCK4270</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/lucianoac25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b101d] border border-slate-800 hover:border-slate-700 hover:bg-[#0f172a] transition-all text-xs sm:text-sm text-slate-300 group shadow-xs hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <div>
                        <span className="font-medium text-white">Perfil en LinkedIn</span>
                        <span className="block text-[11px] font-mono text-slate-500">in/lucianoac25</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b101d] border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-xs">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      <span>Ubicación & Disponibilidad</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Lima, Perú · Híbrido / Remoto</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" distance={24} duration={0.65} delay={0.1}>
              <div className="bg-[#0b101d]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="py-6 text-center flex flex-col items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-white mb-2">
                        ¡Formulario Procesado hacia {emailAddress}!
                      </h3>
                      <p className="text-sm text-slate-300 max-w-md mb-5 leading-relaxed">
                        El mensaje ha sido emitido hacia tu dirección de correo electrónico.
                      </p>

                      {/* Guía clara sobre la activación en Gmail / Spam */}
                      <div className="text-left w-full max-w-lg p-4 rounded-xl bg-[#0e1424] border border-blue-500/30 text-xs text-slate-300 mb-6 space-y-2">
                        <div className="flex items-center gap-1.5 font-semibold text-blue-300">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>¿No ves el correo de prueba en tu bandeja de entrada?</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          1. <strong>Revisa tu carpeta de SPAM / Correo no deseado</strong> en Gmail.
                        </p>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          2. Como es la primera vez que se envía un formulario, el servicio te envía un correo titulado: <strong className="text-white">"Action Required: Activate FormSubmit"</strong>.
                        </p>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          3. Al pulsar el botón <strong className="text-emerald-400">"Activate Form"</strong> dentro de ese correo, tu cuenta queda vinculada permanentemente y todos los siguientes mensajes entrarán directamente a tu bandeja principal.
                        </p>
                      </div>

                      {/* Acciones directas e infalibles */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                        <a
                          href={gmailDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Enviar copia directa desde Gmail</span>
                        </a>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            setFormData({ name: '', email: '', subject: '', message: '' });
                          }}
                          className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                        >
                          Nuevo mensaje
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      ref={formRef}
                      action={`https://formsubmit.co/${emailAddress}`}
                      method="POST"
                      target="formsubmit_target_iframe"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                    {/* Campos de configuración FormSubmit */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                      type="hidden"
                      name="_subject"
                      value={formData.subject ? `[Portafolio] ${formData.subject} - De: ${formData.name}` : `[Portafolio] Nuevo mensaje de contacto`}
                    />
                    <input type="hidden" name="_replyto" value={formData.email} />

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-white">
                          Formulario de Contacto Directo
                        </h3>
                        <span className="text-xs text-slate-400">
                          Recepción en tiempo real en {emailAddress}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Buzón Verificado</span>
                      </span>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        NOMBRE COMPLETO *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="Nombre_Completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej. Ing. Carlos Mendoza"
                          className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c1220] text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all shadow-inner"
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
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contacto@empresa.com"
                          className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c1220] text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        ASUNTO / PROPUESTA LABORAL *
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="Asunto"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Ej. Oportunidad de Prácticas Preprofesionales / Desarrollo IA"
                          className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c1220] text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all shadow-inner"
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
                        name="Mensaje"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe los requerimientos del puesto, consulta técnica o detalles del proyecto..."
                        className="w-full p-3 text-xs font-sans bg-[#0c1220] text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                      />
                      {errors.message && (
                        <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Acciones de envío duales */}
                    <div className="pt-2 space-y-2.5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 text-xs font-bold disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${getPrimaryBtn()}`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Despachando a {emailAddress}...</span>
                          </div>
                        ) : (
                          <>
                            <span>Enviar Mensaje al Correo</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {/* Opción infalible con 1 clic: abrir directamente en Gmail oficial */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href={gmailDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                          <span>Enviar directo desde Gmail</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="py-2.5 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copiar propuesta completa</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
