
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
    onLogin: (role: UserType) => void;
}

const PortalButton: React.FC<{
    role: string;
    icon: React.ReactNode;
    onClick: () => void;
    isDark: boolean;
}> = ({ role, icon, onClick, isDark }) => {
    const c = 20;

    return (
        <div
            onClick={onClick}
            className={cn(
                "relative group cursor-pointer transition-all duration-500 h-36 flex flex-col items-center justify-center p-6 isolate hover:scale-[1.04]",
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

            {/* SVG Border Layer */}
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
                        </div>
                    </div>

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
