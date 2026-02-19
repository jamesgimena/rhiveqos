
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Gauge,
    X,
    ChevronRight,
    Home,
    CheckCircle2,
    MapPin,
    ArrowRight,
    Search,
    Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

type Step = 'address' | 'specs' | 'lead' | 'result';

export const FloatingEstimator: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<Step>('address');
    const [address, setAddress] = useState('');

    const steps = [
        { id: 'address', label: 'Identity' },
        { id: 'specs', label: 'Specs' },
        { id: 'lead', label: 'Lead' },
        { id: 'result', label: 'Quote' }
    ];

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setStep('address');
    };

    return (
        <>
            {/* 1. SIDE TAB BUTTON */}
            <motion.button
                onClick={toggleDrawer}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-[600] flex items-center gap-3 bg-[var(--text-main)] text-[var(--bg-main)] px-4 py-8 rounded-l-2xl shadow-[0_0_30px_rgba(236,2,139,0.3)] hover:pr-6 transition-all group"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="flex flex-col items-center gap-1">
                    <Gauge size={18} className="text-rhive-pink animate-pulse" />
                    <span className="[writing-mode:vertical-lr] font-black text-[9px] uppercase tracking-[0.4em] rotate-180">
                        Instant Estimate
                    </span>
                </div>
            </motion.button>

            {/* 2. OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[700]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleDrawer}
                    />
                )}
            </AnimatePresence>

            {/* 3. SLIDE-OUT DRAWER */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full max-w-lg bg-[var(--bg-main)] z-[800] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-[var(--border-color)] overflow-hidden flex flex-col pt-12"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-rhive-pink/10">
                            <motion.div
                                className="h-full bg-rhive-pink shadow-pink-glow"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: step === 'address' ? '25%' :
                                        step === 'specs' ? '50%' :
                                            step === 'lead' ? '75%' : '100%'
                                }}
                            />
                        </div>

                        {/* Header */}
                        <div className="p-8 flex justify-between items-center border-b border-[var(--border-color)]">
                            <div className="flex flex-col">
                                <span className="text-rhive-pink font-black text-[9px] uppercase tracking-[0.4em] mb-1">Estimator Engine v2.0</span>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--text-main)] italic">Property Portal<span className="text-rhive-pink">.</span></h2>
                            </div>
                            <button onClick={toggleDrawer} className="p-3 glass rounded-full hover:text-rhive-pink transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-grow p-8 overflow-y-auto">
                            {step === 'address' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Where are we <br /> deploying?</h3>
                                        <p className="text-[var(--text-muted)] text-sm">Input your address to initialize geospatial mapping and high-resolution aerial analysis.</p>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-rhive-pink transition-colors">
                                            <Search size={22} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="STREET ADDRESS..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full bg-[var(--bg-card-solid)] border-2 border-[var(--border-color)] py-6 pl-16 pr-8 text-sm font-black uppercase tracking-widest outline-none focus:border-rhive-pink transition-all placeholder-[var(--text-muted)]/50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: MapPin, label: "Geospatial Data" },
                                            { icon: Home, label: "Roof Geometry" },
                                        ].map((item, i) => (
                                            <div key={i} className="glass p-4 border-white/5 flex flex-col items-center gap-2 opacity-50">
                                                <item.icon size={20} className="text-rhive-pink" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setStep('specs')}
                                        disabled={!address}
                                        className="w-full btn-tech py-6 text-xs shadow-pink-glow disabled:opacity-20 disabled:grayscale transition-all"
                                    >
                                        Initialize Analysis
                                    </button>
                                </motion.div>
                            )}

                            {step === 'specs' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">Select Your Infrastructure<span className="text-rhive-pink">.</span></h3>

                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Shingle Profile</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Duration', 'Designer', 'Metal', 'Slate'].map(s => (
                                                    <button key={s} className="p-4 glass border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-rhive-pink transition-all">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Pitch Assessment</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Low', 'Medium', 'Steep'].map(p => (
                                                    <button key={p} className="p-3 glass border-white/5 text-[9px] font-black uppercase tracking-widest hover:border-rhive-pink transition-all">
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep('lead')}
                                        className="w-full btn-tech py-6 text-xs shadow-pink-glow"
                                    >
                                        Generate Range
                                    </button>
                                </motion.div>
                            )}

                            {step === 'lead' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">Secure My Quote<span className="text-rhive-pink">.</span></h3>
                                    <p className="text-[var(--text-muted)] text-sm">Where should we deliver the detailed technical analysis and NDL warranty certification?</p>

                                    <div className="space-y-4">
                                        <input type="text" placeholder="FULL NAME" className="w-full bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-5 text-xs font-bold uppercase tracking-widest outline-none focus:border-rhive-pink transition-all" />
                                        <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-5 text-xs font-bold uppercase tracking-widest outline-none focus:border-rhive-pink transition-all" />
                                        <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-[var(--bg-card-solid)] border border-[var(--border-color)] p-5 text-xs font-bold uppercase tracking-widest outline-none focus:border-rhive-pink transition-all" />
                                    </div>

                                    <button
                                        onClick={() => setStep('result')}
                                        className="w-full btn-tech py-6 text-xs shadow-pink-glow"
                                    >
                                        Execute Delivery
                                    </button>
                                </motion.div>
                            )}

                            {step === 'result' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-10 py-10"
                                >
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 bg-rhive-pink rounded-full flex items-center justify-center text-white shadow-pink-glow animate-pulse">
                                            <CheckCircle2 size={48} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-5xl font-black uppercase tracking-tighter italic">Analysis <br /> Complete<span className="text-rhive-pink">.</span></h3>
                                        <p className="text-rhive-pink font-black text-[10px] uppercase tracking-[0.4em]">Integrated Estimate Ready</p>
                                    </div>

                                    <div className="glass p-10 border-rhive-pink/30 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rhive-pink to-transparent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 block">Calculated Result Range</span>
                                        <div className="text-6xl font-black tracking-tighter text-[var(--text-main)] mb-2">
                                            $14.2K - $16.8K
                                        </div>
                                        <div className="text-rhive-pink text-[9px] font-bold uppercase tracking-widest">Includes 10% RPSP Efficiency Credit</div>
                                    </div>

                                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                        Your detailed PDF breakdown has been sent. A local engineer will confirm the drone mapping data within 24 hours.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="btn-tech py-4 text-[10px]">Call Support</button>
                                        <button onClick={toggleDrawer} className="btn-tech-outline py-4 text-[10px]">Finish</button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Status */}
                        <div className="p-6 bg-black/40 border-t border-[var(--border-color)] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-40">OS Channel Sec-1</span>
                            </div>
                            <span className="text-[8px] font-mono text-[var(--text-muted)] opacity-30 italic">Encryption: AES-256 Enabled</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
