
import React from 'react';
import {
    UserIcon,
    BriefcaseIcon,
    BuildingStorefrontIcon,
    TruckIcon,
    RhiveLogo,
    FingerPrintIcon,
    ZohoIcon,
    GlobeAlt as GlobeAltIcon
} from '../components/icons';
import { UserType } from '../types';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginPageProps {
    onLogin: (role: UserType, password?: string, email?: string) => Promise<any>;
}

// ─── Clipped-corner portal card ──────────────────────────────────────────────
const PortalButton: React.FC<{
    role: string;
    icon: React.ReactNode;
    label: string;
    selected: boolean;
    onClick: () => void;
    isDark: boolean;
}> = ({ role, icon, onClick, isDark }) => {
    const c = 20;

    return (
        <div
            onClick={onClick}
            className={cn(
                'relative group cursor-pointer transition-all duration-400 flex flex-col items-center justify-center p-5 gap-3 isolate hover:scale-[1.03]',
                selected && 'scale-[1.03]'
            )}
        >
            {/* Glassmorphic Background */}
            <div
                className={cn(
                    "absolute inset-0 transition-all duration-700 z-[-2] backdrop-blur-md group-hover:backdrop-blur-xl border transition-colors",
                    isDark
                        ? "bg-white/5 border-white/10 group-hover:bg-white/15 group-hover:border-rhive-pink/50"
                        : "bg-black/5 border-black/10 group-hover:bg-black/10 group-hover:border-rhive-pink/50"
                )}
                style={{
                    clipPath: `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`
                }}
            />
            {/* Corner SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <g stroke={isDark ? "#374151" : "#D1D5DB"} strokeWidth="1.5" className="transition-all duration-500 group-hover:stroke-rhive-pink group-hover:drop-shadow-[0_0_8px_#ec028b]">
                    <line x1={`${c}px`} y1="0.5px" x2={`calc(100% - ${c}px)`} y2="0.5px" />
                    <line x1={`calc(100% - ${c}px)`} y1="0.5px" x2="calc(100% - 0.5px)" y2={`${c}px`} />
                    <line x1="calc(100% - 0.5px)" y1={`${c}px`} x2="calc(100% - 0.5px)" y2={`calc(100% - ${c}px)`} />
                    <line x1="calc(100% - 0.5px)" y1={`calc(100% - ${c}px)`} x2={`calc(100% - ${c}px)`} y2="calc(100% - 0.5px)" />
                    <line x1={`calc(100% - ${c}px)`} y1="calc(100% - 0.5px)" x2={`${c}px`} y2="calc(100% - 0.5px)" />
                    <line x1={`${c}px`} y1="calc(100% - 0.5px)" x2="0.5px" y2={`calc(100% - ${c}px)`} />
                    <line x1="0.5px" y1={`calc(100% - ${c}px)`} x2="0.5px" y2={`${c}px`} />
                    <line x1="0.5px" y1={`${c}px`} x2={`${c}px`} y2="0.5px" />
                </g>
            </svg>

            <div className={cn(
                "relative z-10 flex flex-col items-center gap-3 transition-all duration-300",
                isDark ? "text-rhive-pink group-hover:text-white" : "text-rhive-pink group-hover:text-rhive-pink"
            )}>
                <div className="w-10 h-10 drop-shadow-[0_0_10px_rgba(236,2,139,0.3)]">
                    {icon}
                </div>
                <span className={cn(
                    "font-extrabold text-[10px] uppercase tracking-[0.3em] font-sans transition-colors",
                    isDark ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-black"
                )}>{role}</span>
            </div>
        </div>
    );
};

// ─── Floating label input ─────────────────────────────────────────────────────
const FloatingInput: React.FC<{
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    icon: React.ReactNode;
    rightEl?: React.ReactNode;
    autoFocus?: boolean;
}> = ({ id, type, label, value, onChange, icon, rightEl, autoFocus }) => (
    <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-rhive-pink transition-colors z-10">
            {icon}
        </div>
        <input
            id={id}
            type={type}
            placeholder=" "
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus={autoFocus}
            className="peer w-full bg-black/60 border border-gray-800 focus:border-rhive-pink outline-none text-white pl-12 pr-12 pt-5 pb-3 rounded-xl text-sm font-mono tracking-wide transition-all placeholder-transparent"
        />
        <label
            htmlFor={id}
            className="absolute left-12 top-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-rhive-pink transition-all pointer-events-none"
        >
            {label}
        </label>
        {rightEl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                {rightEl}
            </div>
        )}
    </div>
);

// ─── Main Login Page ──────────────────────────────────────────────────────────
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === 'dark';
    const mainC = 40;

    const portals = [
        { role: 'Employee', icon: <BriefcaseIcon className="w-full h-full" />, type: 'Employee' as UserType },
        { role: 'Customer', icon: <UserIcon className="w-full h-full" />, type: 'Customer' as UserType },
        { role: 'Contractor', icon: <BuildingStorefrontIcon className="w-full h-full" />, type: 'Contractor' as UserType },
        { role: 'Supplier', icon: <TruckIcon className="w-full h-full" />, type: 'Supplier' as UserType },
    ];

    return (
        <div className="flex items-center justify-center p-4 font-sans selection:bg-rhive-pink/40">
            <div className="w-full max-w-4xl flex flex-col items-center">
                <RhiveLogo className="h-14 w-auto mb-10 transition-all hover:scale-105" />

                <div className="w-full relative p-12 animate-fade-in isolate text-center">
                    {/* Background Plate */}
                    <div
                        className={cn(
                            "absolute inset-0 backdrop-blur-xl z-[-2] transition-colors duration-500",
                            isDark ? "bg-black/60 shadow-2xl" : "bg-white/80 shadow-2xl border border-white/20"
                        )}
                        style={{ clipPath: `polygon(${mainC}px 0, calc(100% - ${mainC}px) 0, 100% ${mainC}px, 100% calc(100% - ${mainC}px), calc(100% - ${mainC}px) 100%, ${mainC}px 100%, 0 calc(100% - ${mainC}px), 0 ${mainC}px)` }}
                    />

                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <g stroke={isDark ? "#4b5563" : "#D1D5DB"} strokeWidth="1" className="opacity-50 transition-colors">
                            <line x1={`${mainC}px`} y1="0.5px" x2={`calc(100% - ${mainC}px)`} y2="0.5px" />
                            <line x1={`calc(100% - ${mainC}px)`} y1="0.5px" x2="calc(100% - 0.5px)" y2={`${mainC}px`} />
                            <line x1="calc(100% - 0.5px)" y1={`${mainC}px`} x2="calc(100% - 0.5px)" y2={`calc(100% - ${mainC}px)`} />
                            <line x1="calc(100% - 0.5px)" y1={`calc(100% - ${mainC}px)`} x2={`calc(100% - ${mainC}px)`} y2="calc(100% - 0.5px)" />
                            <line x1={`calc(100% - ${mainC}px)`} y1="calc(100% - 0.5px)" x2={`${mainC}px`} y2="calc(100% - 0.5px)" />
                            <line x1={`${mainC}px`} y1="calc(100% - 0.5px)" x2="0.5px" y2={`calc(100% - ${mainC}px)`} />
                            <line x1="0.5px" y1={`calc(100% - ${mainC}px)`} x2="0.5px" y2={`${mainC}px`} />
                            <line x1="0.5px" y1={`${mainC}px`} x2={`${mainC}px`} y2="0.5px" />
                        </g>
                        <line x1="0" y1={mainC} x2={mainC} y2="0" stroke="#ec028b" strokeWidth="3" className="drop-shadow-[0_0_8px_#ec028b]" />
                        <line x1="calc(100% - 0.5px)" y1={`calc(100% - ${mainC}px)`} x2={`calc(100% - ${mainC}px)`} y2="calc(100% - 0.5px)" stroke="#ec028b" strokeWidth="3" className="drop-shadow-[0_0_8px_#ec028b]" />
                    </svg>

                    <div className="mb-10 relative z-20">
                        <h2 className={cn(
                            "text-4xl font-black tracking-[0.25em] uppercase mb-2",
                            isDark ? "text-white" : "text-black"
                        )}>
                            {t('gateway_title')}
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className={cn("h-[1px] w-12 bg-gradient-to-r from-transparent", isDark ? "to-gray-700" : "to-gray-300")} />
                            <p className={cn("text-[10px] font-bold uppercase tracking-[0.4em]", isDark ? "text-gray-500" : "text-gray-400")}>Quantum Operating System v2.0</p>
                            <div className={cn("h-[1px] w-12 bg-gradient-to-l from-transparent", isDark ? "to-gray-700" : "to-gray-300")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12 relative z-20">
                        {portals.map((p) => (
                            <PortalButton
                                key={p.role}
                                role={p.role}
                                icon={p.icon}
                                onClick={() => onLogin(p.type)}
                                isDark={isDark}
                            />
                        ))}
                    </div>

                    <div className="relative z-20 max-w-md mx-auto">
                        <div className={cn("grid grid-cols-2 gap-4 pt-8 border-t", isDark ? "border-gray-800/50" : "border-gray-200")}>
                            <button className={cn(
                                "flex items-center justify-center gap-3 p-4 border text-[9px] font-bold uppercase tracking-[0.3em] transition-all rounded-lg group",
                                isDark
                                    ? "bg-white/5 border-white/10 text-white/40 hover:border-rhive-pink/50 hover:text-white"
                                    : "bg-black/5 border-black/10 text-black/40 hover:border-rhive-pink/50 hover:text-black"
                            )}>
                                <ZohoIcon className="w-4 h-4 group-hover:text-rhive-pink transition-colors" />
                                {t('login_zoho')}
                            </button>
                            <button className={cn(
                                "flex items-center justify-center gap-3 p-4 border text-[9px] font-bold uppercase tracking-[0.3em] transition-all rounded-lg group",
                                isDark
                                    ? "bg-white/5 border-white/10 text-white/40 hover:border-rhive-pink/50 hover:text-white"
                                    : "bg-black/5 border-black/10 text-black/40 hover:border-rhive-pink/50 hover:text-black"
                            )}>
                                <FingerPrintIcon className="w-4 h-4 group-hover:text-rhive-pink transition-colors" />
                                {t('login_biometrics')}
                            </button>

                            <Button
                                onClick={() => onLogin('Public')}
                                className="w-full h-12 text-sm font-black tracking-[0.3em] transition-all duration-500 uppercase border-rhive-pink/30 bg-black/30 text-gray-500 hover:bg-rhive-pink/10 hover:text-rhive-pink hover:border-rhive-pink/50"
                            >
                                <span>Continue as Guest</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    )}

                    {/* ════════════════════════════════════════════════════════
                        VIEW: PORTAL LOGIN (Customer / Contractor / Supplier)
                    ════════════════════════════════════════════════════════ */}
                    {view === 'portal-login' && (
                        <div className="relative z-20 animate-slide-up">
                            {/* Role switcher */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {publicPortals.map((p) => (
                                    <PortalButton
                                        key={p.role}
                                        role={p.role}
                                        icon={p.icon}
                                        label={p.label}
                                        selected={selectedPortalRole === p.role}
                                        onClick={() => setSelectedPortalRole(p.role)}
                                    />
                                ))}
                            </div>

                            <form onSubmit={handlePortalSubmit} className="space-y-4">
                                <FloatingInput
                                    id="portal-email"
                                    type="email"
                                    label="Email Address"
                                    value={portalEmail}
                                    onChange={setPortalEmail}
                                    icon={<EnvelopeIcon className="w-5 h-5" />}
                                    autoFocus
                                />
                                <FloatingInput
                                    id="portal-password"
                                    type={showPortalPwd ? 'text' : 'password'}
                                    label="Password"
                                    value={portalPassword}
                                    onChange={setPortalPassword}
                                    icon={<KeyIcon className="w-5 h-5" />}
                                    rightEl={
                                        <button
                                            type="button"
                                            onClick={() => setShowPortalPwd(!showPortalPwd)}
                                            className="text-gray-600 hover:text-rhive-pink transition-colors"
                                        >
                                            {showPortalPwd
                                                ? <EyeSlashIcon className="w-4 h-4" />
                                                : <EyeIcon className="w-4 h-4" />
                                            }
                                        </button>
                                    }
                                />

                                {error && (
                                    <p className="text-rhive-pink text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
                                        {error}
                                    </p>
                                )}

                                <div className="flex gap-3 pt-1">
                                    <Button
                                        type="button"
                                        onClick={resetToGateway}
                                        className="flex-none px-5 h-12 bg-gray-900 border-gray-800 text-gray-500 hover:bg-gray-800 hover:text-white rounded-xl uppercase tracking-widest text-[10px] font-black"
                                    >
                                        <XIcon className="w-4 h-4 mr-1" />
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!selectedPortalRole || !portalEmail || !portalPassword || loading}
                                        className="flex-1 h-12 bg-rhive-pink hover:bg-[#ff039a] text-white rounded-xl uppercase tracking-widest text-[10px] font-black shadow-[0_0_30px_rgba(236,2,139,0.3)] disabled:opacity-40"
                                    >
                                        {loading ? 'Verifying…' : 'Sign In'}
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ════════════════════════════════════════════════════════
                        VIEW: ADMIN LOGIN (password-only, Admin role only)
                    ════════════════════════════════════════════════════════ */}
                    {view === 'admin-login' && (
                        <div className="relative z-20 animate-slide-up max-w-sm mx-auto">
                            {/* Admin badge */}
                            <div className="flex items-center justify-center gap-3 mb-6 p-4 rounded-xl border border-rhive-pink/30 bg-rhive-pink/10">
                                <ShieldCheckIcon className="w-8 h-8 text-rhive-pink" />
                                <div>
                                    <p className="text-white text-xs font-black uppercase tracking-widest">Admin Terminal</p>
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest">Restricted Access — Authorized Personnel Only</p>
                                </div>
                            </div>

                            <form onSubmit={handleAdminSubmit} className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-rhive-pink transition-colors">
                                        <KeyIcon className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="STATION SECURITY KEY"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        className="w-full bg-black/60 border border-gray-800 focus:border-rhive-pink outline-none text-white px-12 py-4 rounded-xl text-xs font-mono tracking-widest transition-all placeholder:text-gray-700"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <p className="text-rhive-pink text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
                                        {error}
                                    </p>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        onClick={resetToGateway}
                                        className="flex-none px-5 h-12 bg-gray-900 border-gray-800 text-gray-500 hover:bg-gray-800 hover:text-white rounded-xl uppercase tracking-widest text-[10px] font-black"
                                    >
                                        <XIcon className="w-4 h-4 mr-1" />
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!adminPassword || loading}
                                        className="flex-1 h-12 bg-rhive-pink hover:bg-[#ff039a] text-white rounded-xl uppercase tracking-widest text-[10px] font-black shadow-[0_0_30px_rgba(236,2,139,0.3)] disabled:opacity-40"
                                    >
                                        {loading ? 'Verifying…' : 'Establish Link'}
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="mt-12 text-center relative z-20">
                        <p className={cn("text-[9px] font-bold uppercase tracking-[0.5em] opacity-50", isDark ? "text-gray-600" : "text-gray-400")}>
                            {t('restricted_access')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
