import React from 'react';
import { CredentialItem } from '../data/portfolioData.ts';
import { ShieldCheck, Award, ExternalLink, Calendar, CheckCircle, Clock } from 'lucide-react';
import { MotionCard } from './ScrollReveal.tsx';

interface CredentialBadgeCardProps {
  credential: CredentialItem;
  onClick: () => void;
}

export const CredentialBadgeCard: React.FC<CredentialBadgeCardProps> = ({ credential, onClick }) => {
  const isCertificate = credential.type === 'certificate';

  // Render authentic badge emblem
  const renderEmblem = () => {
    switch (credential.badgeTheme) {
      case 'redhat':
        return (
          <div className="relative w-full h-36 bg-gradient-to-b from-slate-900 to-[#121622] rounded-xl border border-slate-700/80 p-3 flex flex-col items-center justify-between overflow-hidden shadow-inner">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600 inline-block shadow-sm" />
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Red Hat</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>Pending</span>
              </span>
            </div>

            <div className="text-center my-auto">
              <div className="text-xs font-semibold text-slate-100 font-display">Red Hat Academy</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Course Attendance</div>
            </div>

            <div className="w-full py-1 bg-red-700/90 text-white text-[10px] font-semibold text-center rounded tracking-tight shadow-xs">
              Red Hat System Administration I
            </div>
          </div>
        );

      case 'cisco-round':
        return (
          <div className="relative w-full h-36 bg-gradient-to-b from-slate-900 to-[#0e1424] rounded-xl border border-slate-700/80 flex flex-col items-center justify-center p-3 overflow-hidden shadow-inner">
            <div className="w-20 h-20 rounded-full bg-[#0a1628] border-2 border-cyan-400/60 shadow-lg flex flex-col items-center justify-center text-center p-1 relative">
              <span className="text-[8px] font-mono font-bold text-cyan-300 tracking-tight leading-none mb-0.5">
                CISCO
              </span>
              <span className="text-[8px] text-slate-300 leading-tight">Learn-A-Thon</span>
              <div className="w-full my-0.5 py-0.5 bg-cyan-700/70 text-[8px] font-bold text-white uppercase tracking-wider">
                Participant
              </div>
              <span className="text-[7px] text-slate-400 leading-none">NetAcad</span>
              <span className="text-amber-400 text-[10px] leading-none mt-0.5">★</span>
            </div>
          </div>
        );

      case 'cisco-diploma':
        return (
          <div className="relative w-full h-36 bg-gradient-to-b from-slate-900 to-[#0b141e] rounded-xl border border-emerald-500/40 p-3 flex flex-col items-center justify-between overflow-hidden shadow-inner">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Certificado</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CURSO</span>
            </div>

            {/* Diploma Certificate Icon Graphic */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-16 h-12 rounded-lg border-2 border-emerald-500/60 bg-[#091512] flex items-center justify-center relative shadow-sm">
                <Award className="w-6 h-6 text-emerald-400" />
                <div className="absolute -bottom-1.5 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                  ✓
                </div>
              </div>
            </div>

            <div className="w-full text-center text-[11px] font-semibold text-emerald-300 font-mono truncate">
              Cisco Networking Academy
            </div>
          </div>
        );

      case 'cisco-green':
      case 'cisco-olive':
      case 'cisco-blue':
      case 'cisco-cyan':
      default: {
        const waveColor =
          credential.badgeTheme === 'cisco-green'
            ? 'from-emerald-600 via-teal-500 to-green-700'
            : credential.badgeTheme === 'cisco-olive'
            ? 'from-emerald-700 via-lime-600 to-teal-800'
            : credential.badgeTheme === 'cisco-blue'
            ? 'from-blue-600 via-indigo-500 to-sky-700'
            : 'from-cyan-500 via-sky-500 to-blue-600';

        const textColor =
          credential.badgeTheme === 'cisco-green'
            ? 'text-emerald-400'
            : credential.badgeTheme === 'cisco-olive'
            ? 'text-lime-300'
            : credential.badgeTheme === 'cisco-blue'
            ? 'text-blue-400'
            : 'text-cyan-300';

        return (
          <div className="relative w-full h-36 bg-gradient-to-b from-slate-900 to-[#0e1424] rounded-xl border border-slate-700/80 flex flex-col justify-between p-2.5 overflow-hidden shadow-inner">
            {/* Cisco NetAcad Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 px-1 pt-0.5">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white tracking-wider">CISCO</span>
                <span className="text-slate-400 text-[9px]">Networking Academy</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                Verified
              </span>
            </div>

            {/* Stylized Waves matching authentic badge graphics */}
            <div className="relative h-16 w-full rounded-lg overflow-hidden my-auto flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-r ${waveColor} opacity-75`} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/40" />
              <svg className="absolute bottom-0 w-full h-10 opacity-60" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,20 C30,40 70,0 100,20 L100,40 L0,40 Z" fill="rgba(0,0,0,0.4)" />
                <path d="M0,30 C40,10 60,35 100,15 L100,40 L0,40 Z" fill="rgba(255,255,255,0.15)" />
              </svg>
              <span className="relative z-10 text-[11px] font-bold text-white drop-shadow-md text-center px-2 line-clamp-1">
                {credential.title}
              </span>
            </div>

            {/* Bottom Label */}
            <div className="text-center">
              <span className={`text-[10px] font-mono ${textColor} font-semibold truncate block`}>
                {credential.category}
              </span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <MotionCard
      hoverY={-4}
      onClick={onClick}
      className={`group relative rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer backdrop-blur-md h-full overflow-hidden shadow-lg ${
        isCertificate
          ? 'bg-[#0a1219]/90 border-emerald-500/30 hover:border-emerald-400/60 hover:bg-[#0c1822]'
          : 'bg-[#0b101d]/90 border-slate-800 hover:border-blue-500/50 hover:bg-[#0f172a]'
      }`}
    >
      <div>
        {/* Emblem visual slot */}
        <div className="mb-4">
          {renderEmblem()}
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-200 transition-colors line-clamp-2 leading-snug mb-1.5">
          {credential.title}
        </h3>

        {/* Issuer and Category */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="font-semibold text-slate-300">{credential.issuer}</span>
          <span>·</span>
          <span className="truncate">{credential.category}</span>
        </div>

        <p className="text-xs text-slate-300/80 leading-relaxed mb-4 line-clamp-2">
          {credential.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3 h-3 text-slate-500" />
          <span>{credential.issuedDate}</span>
        </div>

        <span className="text-blue-400 group-hover:underline flex items-center gap-1 font-sans font-medium text-xs">
          <span>Ver Ficha</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </MotionCard>
  );
};
