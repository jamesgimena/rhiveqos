
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserIcon,
    Building2,
    Zap,
    Globe,
    Gauge,
    Plus,
    Minus,
    Sun,
    Moon,
    Shield,
    Droplets,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import RhiveHeader from '../components/website/RhiveHeader';

// --- Sub-Components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-16">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-display leading-[0.9]">
            {title}<span className="text-rhive-pink">.</span>
        </h2>
        {subtitle && (
            <p className="text-rhive-pink text-xs font-bold tracking-[0.4em] uppercase mt-4 opacity-80">{subtitle}</p>
        )}
    </div>
);

const TechCard = ({ title, icon: Icon, desc, details, cta, onClick }: any) => (
    <div className="card-tech p-10 group flex flex-col h-full bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] transition-all border-white/5">
        <div className="h-16 w-16 glass flex items-center justify-center mb-10 text-rhive-pink group-hover:scale-110 transition-transform duration-500 shadow-pink-glow-sm">
            <Icon size={32} />
        </div>
        <h3 className="text-2xl font-black mb-6 uppercase font-display tracking-tight text-[var(--text-main)]">{title}</h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">{desc}</p>

        {details && (
            <ul className="space-y-4 mb-10">
                {details.map((item: string, i: number) => (
                    <li key={i} className="flex items-center text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-rhive-pink mr-4 shadow-pink-glow-sm" />
                        {item}
                    </li>
                ))}
            </ul>
        )}

        <button
            onClick={onClick}
            className="inline-flex items-center gap-3 text-[11px] font-black text-rhive-pink uppercase tracking-[0.2em] border-b-2 border-rhive-pink/20 pb-2 group-hover:border-rhive-pink transition-all w-fit"
        >
            {cta || "Configure"}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
);

const StageCard = ({ stage, title, desc, progress, isActive }: any) => (
    <div className={cn(
        "stage-card p-8 transition-all duration-500",
        isActive ? "active scale-[1.02] bg-rhive-pink/[0.03]" : "hover:bg-white/[0.01]"
    )}>
        <div className="flex justify-between items-center mb-3">
            <span className={cn(
                "font-black text-[10px] tracking-[0.4em] uppercase transition-colors",
                isActive ? "text-rhive-pink" : "text-[var(--text-muted)] opacity-50"
            )}>{stage}</span>
            <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)] font-mono text-[10px] opacity-30">{progress}</span>
                {isActive && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 bg-rhive-pink rounded-full shadow-pink-glow" />}
            </div>
        </div>
        <h4 className="text-xl font-black mb-3 uppercase font-display tracking-tight">{title}</h4>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{desc}</p>
    </div>
);

// --- Main Page ---

const PublicHomepage: React.FC = () => {
    const { setActivePageId } = useNavigation();
    const { theme } = useTheme();
    const [activeStage, setActiveStage] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const isDark = theme === 'dark';

    const services = [
        {
            title: "Residential",
            icon: Building2,
            desc: "The highest standard for steep-slope infrastructure. We deploy Owens Corning Duration systems with integrated ice-and-water shields and California Cut valleys.",
            details: ["Lifetime Integrity", "Storm Defense", "Zero-Leak Protocol"],
            cta: "Configure System"
        },
        {
            title: "Commercial",
            icon: Building2,
            desc: "Industrial-grade flat roof deployment. High-tensile PVC and TPO membranes, heat-welded for 100% molecular integration. Built for NDL warranty readiness.",
            details: ["PVC/TPO Membranes", "NDL Guarantees", "Thermal Shield"],
            cta: "Get Specs"
        },
        {
            title: "Gutters",
            icon: Droplets,
            desc: "Custom-extruded 6\" K-Style systems. Precision-mitered corners and high-flow downspouts designed to evacuate max-volume storm events.",
            details: ["Seamless Tech", "Leaf Shielding", "High-Flow Miter"],
            cta: "View Profiles"
        },
        {
            title: "Ice Defense",
            icon: Shield,
            desc: "Thermal protection for critical infrastructure. Industrial heat cables and low-profile snow retention systems designed to prevent ice-dam catastrophe.",
            details: ["Heat Cable Arrays", "Snow Rails", "Thermal Audit"],
            cta: "Fortify Roof"
        }
    ];

    const stages = [
        { stage: "STAGE 01", title: "THE INTAKE & IDENTITY", desc: "Identity resolution via Google Solar API. We analyze your property's geometry, orientation, and obstruction data before we ever speak.", progress: "10%" },
        { stage: "STAGE 02", title: "THE BALLPARK ESTIMATE", desc: "Instant math-driven pricing based on high-resolution aerial datasets. No sales reps, no pressure, just accurate raw data.", progress: "25%" },
        { stage: "STAGE 03", title: "THE DEEP DIVE INSPECTION", desc: "Comprehensive structural audit. We use thermal imaging and high-density drone mapping to identify sub-surface rot or insulation failure.", progress: "40%" },
        { stage: "STAGE 05", title: "THE MATERIAL DROP", desc: "Real-time logistics tracking. You receive a photo-confirmation the moment materials are staged on-site. Zero driveway damage protocols.", progress: "60%" },
        { stage: "STAGE 10", title: "THE TROPHY ROOM", desc: "Handover of your Digital Asset Vault. Lifetime No-Leak certification and automated warranty deployment to your Home Portfolio.", progress: "100%" }
    ];

    const faqs = [
        { q: "Why do you show your cost breakdowns?", a: "Most contractors hide their profit and overhead. At RHIVE, we believe integrity starts with math. You see exactly what we pay for shingles, labor, and what we keep to sustain our guarantee." },
        { q: "What is the \"No-Leak Guarantee\"?", a: "If we installed it and it leaks, we fix it for free. Period. No service fees, no \"administrative costs.\" We follow manufacturer guidelines to the letter so your warranty is ironclad." },
        { q: "Do you offer financing?", a: "Yes. Our automated pipeline allows for rapid pre-approvals via our RPSP credit system, often with 0% APR options for qualified systems." }
    ];

    return (
        <div className="relative min-h-screen w-full font-sans overflow-x-hidden pb-20 bg-[var(--bg-main)] transition-colors duration-500">
            <div className="circuit-overlay" />
            <RhiveHeader />

            {/* HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rhive-pink/10 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="z-10 max-w-7xl relative"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 glass mb-12 border border-rhive-pink/30 shadow-pink-glow-sm">
                        <span className="w-2.5 h-2.5 bg-rhive-pink rounded-full animate-pulse shadow-[0_0_12px_#ec028b]" />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase">Quantum Operating System v2.0 // Active</span>
                    </div>

                    <h1 className="text-7xl md:text-9xl lg:text-[180px] font-black tracking-tighter leading-[0.8] uppercase mb-16 font-display">
                        FINISH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] via-rhive-pink to-[var(--text-main)] animate-gradient-x">ON TOP</span>
                        <span className="text-rhive-pink">.</span>
                    </h1>

                    <p className="text-[var(--text-muted)] max-w-3xl mx-auto text-xl md:text-3xl font-light leading-relaxed mb-16 px-4">
                        The world’s first AI-driven roofing experience.
                        <span className="text-[var(--text-main)] font-bold"> Transparent Pricing.</span>
                        <span className="text-[var(--text-main)] font-bold"> Lifetime Integrity.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center px-6">
                        <button className="btn-tech px-16 py-6 text-xs shadow-pink-glow" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                            Start Intake
                        </button>
                        <button
                            onClick={() => setActivePageId('P-12')}
                            className="btn-tech-outline px-16 py-6 text-xs glass border-white/20"
                        >
                            View Process
                        </button>
                    </div>
                </motion.div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
                    <div className="w-1 h-16 bg-gradient-to-b from-rhive-pink to-transparent rounded-full" />
                </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section id="services" className="py-48 px-6 max-w-[1500px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-32 border-b border-[var(--border-color)] pb-16">
                    <SectionTitle title="Capabilities" subtitle="Residential & Commercial infrastructure" />
                    <div className="hidden lg:flex flex-col items-end pb-16">
                        <div className="flex gap-4 items-center mb-2">
                            <Shield className="text-rhive-pink" size={24} />
                            <span className="text-[12px] font-black tracking-[0.4em] uppercase">Verified Integrity System</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] opacity-50 uppercase">Licensed: Utah | Idaho | Washington</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                        >
                            <TechCard
                                {...service}
                                onClick={() => setActivePageId('P-12')}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* THE PROCESS */}
            <section id="process" className="py-48 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/2 lg:sticky lg:top-48">
                            <SectionTitle title="Protocols" subtitle="The Zero-Friction Fulfillment Engine" />
                            <p className="text-2xl text-[var(--text-muted)] mb-12 font-light leading-relaxed">
                                Traditional construction is plagued by ambiguity. Our OS-managed workflow brings military intelligence to your job site.
                            </p>

                            <div className="p-10 card-tech glass border-rhive-pink/40 bg-rhive-pink/[0.05] shadow-pink-glow-sm">
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-14 h-14 bg-rhive-pink rounded-full flex items-center justify-center text-white font-black text-xl shadow-pink-glow">!</div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-rhive-pink">Deployment Tracker</h4>
                                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] opacity-50 font-mono">Real-Time Sync Active</span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-6 text-[var(--text-main)]">
                                    {stages[activeStage].title}
                                </h3>
                                <p className="text-base text-[var(--text-muted)] leading-relaxed mb-12">
                                    {stages[activeStage].desc}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black tracking-widest uppercase mb-1">
                                        <span>Completion Velocity</span>
                                        <span className="text-rhive-pink">{stages[activeStage].progress}</span>
                                    </div>
                                    <div className="w-full h-2 bg-[var(--border-color)] relative rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute h-full bg-rhive-pink shadow-[0_0_15px_#ec028b]"
                                            initial={{ width: "0%" }}
                                            animate={{ width: stages[activeStage].progress }}
                                            transition={{ duration: 1, ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-6 pt-8">
                            {stages.map((stage, idx) => (
                                <motion.div
                                    key={idx}
                                    onMouseEnter={() => setActiveStage(idx)}
                                    onClick={() => setActiveStage(idx)}
                                    className="cursor-pointer"
                                    whileHover={{ x: 15 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <StageCard {...stage} isActive={activeStage === idx} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FINANCIALS SECTION */}
            <section id="financing" className="py-48 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square"
                    >
                        <div className="absolute inset-0 bg-rhive-pink/15 blur-[120px] animate-pulse" />
                        <div className="card-tech h-full w-full flex flex-col justify-center p-20 glass border-white/10 relative z-10">
                            <h4 className="text-rhive-pink font-black text-xs tracking-[0.5em] uppercase mb-10">Economic Incentive Layer</h4>
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-[120px] font-black tracking-tighter leading-none text-[var(--text-main)]">10</span>
                                <span className="text-6xl font-black text-rhive-pink">%</span>
                            </div>
                            <p className="text-lg font-bold uppercase tracking-[0.3em] mb-16 opacity-60">RPSP Efficiency Credit</p>

                            <div className="space-y-6">
                                {[
                                    { label: "Phase 01: Deposit (Identity Confirmed)", val: "50%" },
                                    { label: "Phase 02: Launch (Site Mobilized)", val: "40%" },
                                    { label: "Phase 03: Final (Asset Handover)", val: "10%" }
                                ].map((step, i) => (
                                    <div key={i} className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest border-b border-white/5 pb-5">
                                        <span className="opacity-50">{step.label}</span>
                                        <span className="text-rhive-pink font-black">{step.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <SectionTitle title="Economics" subtitle="Radical Transparency Capital" />
                        <p className="text-2xl text-[var(--text-muted)] mb-12 font-light leading-relaxed">
                            We’ve eliminated the “Chase Cost.” By converting within the 48-hour data window, we bypass administrative overhead and pass those savings directly to you.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 mb-16">
                            {[
                                { t: "0% APR Financing", d: "Zero interest deployment for qualified residential infrastructure." },
                                { t: "Soft-Pull Pre-Qual", d: "Instant capital verification with zero impact to credit score." },
                                { t: "NDL Readiness", d: "Commercial systems prepared for No Dollar Limit warranty standards." },
                                { t: "Real-Time ROI", d: "Integrated energy audit data via Google Solar API." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-rhive-pink mt-1.5 flex-shrink-0 animate-pulse" />
                                    <div>
                                        <h5 className="font-bold uppercase text-[11px] tracking-widest mb-1">{item.t}</h5>
                                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn-tech px-16 py-5 shadow-pink-glow">Check Rate Protocol</button>
                    </div>
                </div>
            </section>

            {/* ESTIMATOR CTA */}
            <section id="estimate" className="py-48 px-6 bg-[var(--text-main)] transition-colors duration-500 relative isolate">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, var(--bg-main) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-10 font-display italic text-[var(--bg-main)]">
                            INSTANT DATA<span className="text-rhive-pink">.</span>
                        </h2>
                        <p className="text-rhive-pink font-black text-[11px] uppercase tracking-[0.5em] mb-20">
                            // RUNNING GEOSPATIAL ANALYSIS PKG: ESTIMATOR_V2.0
                        </p>

                        <div className="bg-[var(--bg-main)] p-2 rounded-full flex flex-col md:flex-row max-w-3xl mx-auto shadow-[0_30px_100px_rgba(236,2,139,0.3)] group overflow-hidden">
                            <div className="flex-grow flex items-center px-10">
                                <Globe size={20} className="text-rhive-pink animate-spin-slow mr-4" />
                                <input
                                    type="text"
                                    placeholder="INPUT PROPERTY ADDRESS..."
                                    className="bg-transparent text-[var(--text-main)] w-full py-5 outline-none placeholder-[var(--text-muted)] font-black uppercase text-sm tracking-widest font-mono"
                                />
                            </div>
                            <button className="bg-rhive-pink text-white px-16 py-6 rounded-full font-black uppercase text-xs hover:brightness-110 active:scale-95 transition-all tracking-[0.2em] shadow-pink-glow">
                                Analyze Now
                            </button>
                        </div>

                        <div className="mt-16 flex justify-center gap-12 opacity-30 text-[var(--bg-main)]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">95% ACCURACY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">ZERO SALES CALLS</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ / PROTOCOLS */}
            <section id="faq" className="py-48 px-6 max-w-4xl mx-auto">
                <SectionTitle title="Protocols" subtitle="Frequently Accessed Intel" />
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="card-tech transition-all duration-500 border-white/5 bg-white/[0.02]">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full p-8 text-left flex justify-between items-center font-bold uppercase text-xs tracking-[0.2em] group"
                            >
                                <span className={cn("transition-colors duration-300", openFaq === i ? "text-rhive-pink" : "text-[var(--text-main)] group-hover:text-rhive-pink")}>
                                    {faq.q}
                                </span>
                                <div className={cn("w-10 h-10 glass flex items-center justify-center transition-transform duration-500", openFaq === i && "rotate-180 border-rhive-pink/50")}>
                                    {openFaq === i ? <Minus size={18} className="text-rhive-pink" /> : <Plus size={18} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                        className="overflow-hidden bg-black/[0.05] dark:bg-white/[0.01]"
                                    >
                                        <p className="p-10 text-[15px] text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)]">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-32 px-6 border-t border-[var(--border-color)] bg-[var(--rhive-obsidian)] text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-rhive-pink/5 rounded-full blur-[200px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="max-w-[1500px] mx-auto grid md:grid-cols-4 gap-20 relative z-10">
                    <div className="space-y-10">
                        <div className="flex flex-col">
                            <span className="text-4xl font-black tracking-tighter uppercase font-display leading-none">RHIVE<span className="text-rhive-pink">.</span></span>
                            <span className="text-[10px] font-black tracking-[0.5em] text-rhive-pink uppercase mt-2">Quantum Roofing Ecosystem</span>
                        </div>
                        <div className="space-y-4 opacity-40">
                            <p className="text-[10px] leading-loose uppercase tracking-[0.2em] font-mono">
                                44.0682° N, 114.7420° W <br />
                                SILICON SLOPES CLUSTER <br />
                                CONTACT: (435) 417-6637
                            </p>
                            <div className="flex gap-4">
                                {['IG', 'LI', 'TW'].map(s => (
                                    <div key={s} className="w-10 h-10 glass flex items-center justify-center text-[10px] font-black hover:bg-rhive-pink hover:text-white transition-all cursor-pointer">
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-black text-rhive-pink text-[11px] uppercase tracking-[0.4em] mb-12">Architecture</h5>
                        <ul className="text-gray-400 text-xs space-y-6 font-bold uppercase tracking-[0.2em]">
                            <li><a href="#hero" className="hover:text-white transition">The Foundry</a></li>
                            <li><a href="#services" className="hover:text-white transition">Fulfillment Engine</a></li>
                            <li><a href="#process" className="hover:text-white transition">Deployment Logs</a></li>
                            <li><a href="#financing" className="hover:text-white transition">Cap-Ex Optimization</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-black text-rhive-pink text-[11px] uppercase tracking-[0.4em] mb-12">Access Points</h5>
                        <ul className="text-gray-400 text-xs space-y-6 font-bold uppercase tracking-[0.2em]">
                            <li><button onClick={() => setActivePageId('P-06')} className="hover:text-white transition text-left">Client Login</button></li>
                            <li><button onClick={() => setActivePageId('P-09')} className="hover:text-white transition text-left">Contractor Auth</button></li>
                            <li><button onClick={() => setActivePageId('P-10')} className="hover:text-white transition text-left">Career Opportunities</button></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <button className="w-full btn-tech-outline py-5 text-[10px] text-white bg-white/5 border-white/10 hover:border-rhive-pink shadow-none">
                            Network Status: Online
                        </button>
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em] leading-loose">
                                © 2026 RHIVE INDUSTRIES LLC. <br />
                                ALL RIGHTS RESERVED. <br />
                                RADICAL TRANSPARENCY INITIATIVE ACTIVE.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicHomepage;
