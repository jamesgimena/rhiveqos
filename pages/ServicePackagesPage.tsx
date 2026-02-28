import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';

const ServicePackagesPage: React.FC = () => {
    const { setActivePageId } = useNavigation();

    // Helper for anchor scrolling
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const roofComponents = [
        { name: "Full Metal Pipe Flashings", desc: "All jackets replaced, sealed, and painted to avoid oxidation. Plastic boots not recognized for lifetime longevity.", icon: "⬡" },
        { name: "O.C. Pro Armor Underlayment", desc: "Provides a synthetic water-shedding barrier under shingles to guard against wind-driven rain.", icon: "⬢" },
        { name: "O.C. Weatherlock Ice & Water", desc: "Helps protect the roof where water collects or flows, including valleys, eaves, and chimneys.", icon: "❆" },
        { name: "O.C. Starter Strip+", desc: "Ensures a straight edge and effective seal along the eaves and rake-areas vulnerable to high winds.", icon: "▤" },
        { name: "Premium Asphalt Shingles", desc: "Engineered for 130 MPH winds and exceptional durability. Lifetime warranty protection.", icon: "☗" },
        { name: "O.C. Hip and Ridge Cap", desc: "Extra protection and stylish dimension along the hips and ridges. Matches and complements shingles.", icon: "⌂" },
        { name: "Advanced Ventilation", desc: "Exhaust and Intake vents protect the interior components of the roofing system from heat and moisture damage.", icon: "♒" },
        { name: "28G Steel Drip Metal", desc: "Installed on entire perimeter as per manufacturer specification to ensure optimal water runoff.", icon: "↴" },
    ];

    const warningSigns = [
        "Curling or missing shingles",
        "Leaks or water stains in ceilings",
        "Visible sagging or dark patches",
        "Light coming through the attic",
        "Roof is 15+ years old"
    ];

    return (
        <div className="min-h-screen bg-[var(--rhive-bg)] animate-fade-in flex flex-col relative overflow-x-hidden pt-24 text-[var(--rhive-text)]">

            {/* Page Header (H-04 Extracted from Live Site) */}
            <div className="w-full px-6 md:px-12 py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/80 z-10"></div>
                <div className="absolute inset-0 bg-tech-grid bg-[length:40px_40px] opacity-20 pointer-events-none z-0"></div>

                {/* Neon Accents */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[var(--rhive-pink)]/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[var(--rhive-blue)]/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-20 max-w-5xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 border border-[var(--rhive-pink)]/30 bg-[var(--rhive-pink)]/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-[var(--rhive-pink)] rounded-full animate-pulse shadow-[0_0_8px_rgba(236,2,139,0.8)]"></span>
                        <span className="text-[10px] uppercase tracking-widest text-[var(--rhive-pink)] font-bold font-mono">Master System Specifications</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 font-display drop-shadow-2xl leading-tight">
                        Roofing Done Right:<br /> <span className="text-[var(--rhive-pink)]">Innovation Meets Integrity.</span>
                    </h1>

                    <p className="text-gray-300 font-serif text-lg md:text-xl max-w-3xl mx-auto leading-relaxed border-l-4 border-[var(--rhive-pink)] pl-6 text-left">
                        We’re not just another roofing company—we’re a trailblazing force transforming the roofing industry with AI-optimized processes, manufacturer-certified materials, and lifetime no-leak guarantees.
                    </p>
                </div>
            </div>

            {/* Sticky Sub-Navigation */}
            <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-y border-white/10 w-full p-4 flex justify-center gap-4 flex-wrap shadow-2xl">
                <button onClick={() => scrollToSection('anatomy')} className="px-6 py-2 border border-white/10 hover:border-white text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                    Anatomy of a Roof
                </button>
                <button onClick={() => scrollToSection('residential')} className="px-6 py-2 border border-white/10 hover:border-[var(--rhive-pink)] text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[var(--rhive-pink)] transition-colors">
                    Residential Systems
                </button>
                <button onClick={() => scrollToSection('commercial')} className="px-6 py-2 border border-white/10 hover:border-[var(--rhive-blue)] text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[var(--rhive-blue)] transition-colors">
                    Commercial Flat
                </button>
                <button onClick={() => scrollToSection('gutters')} className="px-6 py-2 border border-white/10 hover:border-white text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                    Gutter Defense
                </button>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 py-20 space-y-32 relative z-10">

                {/* Anatomy of a Roof Section */}
                <section id="anatomy" className="scroll-mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-white uppercase font-display tracking-tight mb-4">Know Your Roof: <br />What's Really Over Your Head?</h2>
                        <p className="text-gray-400 font-serif max-w-2xl mx-auto">
                            Understanding your roof helps you make smarter decisions—and spot problems before they become costly. Here’s a quick breakdown of your roof’s anatomy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {roofComponents.map((comp, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/10 p-6 relative group hover:bg-white/5 transition-all" style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }}>
                                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-[var(--rhive-pink)]/10 text-[var(--rhive-pink)] border-l border-b border-[var(--rhive-pink)]/30">
                                    {comp.icon}
                                </div>
                                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2 pr-8">{comp.name}</h4>
                                <p className="text-xs text-gray-500 font-serif leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                                    {comp.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-r from-[var(--rhive-pink)]/20 to-transparent border border-[var(--rhive-pink)]/30 p-8 flex flex-col md:flex-row gap-8 items-center" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}>
                        <div className="flex-1">
                            <h3 className="text-2xl font-black text-white uppercase font-display mb-2">Signs You Might Need a New Roof</h3>
                            <p className="text-gray-400 font-serif text-sm mb-4">Don't wait for a catastrophic failure. Let RHIVE inspect it—free of charge.</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {warningSigns.map((sign, i) => (
                                    <li key={i} className="flex items-center text-sm font-bold text-white tracking-wide">
                                        <span className="text-[var(--rhive-pink)] mr-3">⚠</span> {sign}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-auto">
                            <button onClick={() => setActivePageId('P-12')} className="w-full md:w-auto px-8 py-4 bg-[var(--rhive-pink)] text-white hover:bg-white hover:text-black font-black text-xs uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(236,2,139,0.3)]" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                Request Free Inspection
                            </button>
                        </div>
                    </div>
                </section>

                {/* 1. Residential */}
                <section id="residential" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-4">
                        <div className="w-12 h-12 bg-[var(--rhive-pink)]/20 border border-[var(--rhive-pink)] flex items-center justify-center rounded-sm">
                            <span className="text-[var(--rhive-pink)] font-black text-xl">01</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase font-display tracking-tight">Residential Asphalt Systems</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Duration Card Detail */}
                        <div className="bg-black/60 border border-white/10 p-10 hover:border-[var(--rhive-pink)]/50 transition-colors shadow-xl" style={{ clipPath: 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)' }}>
                            <div className="text-[12px] text-[var(--rhive-pink)] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--rhive-pink)] animate-pulse"></span>
                                Standard RHIVE Baseline
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase mb-4 font-display">Duration Package</h3>
                            <p className="text-gray-300 font-serif text-base mb-8 leading-relaxed">
                                The industry standard, engineered for 130 MPH winds and equipped with patented SureNail® Technology.
                                Backed by a lifetime workmanship warranty to secure your legacy.
                            </p>

                            <div className="bg-white/5 p-6 mb-8 border border-white/5">
                                <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">System Specifications</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-gray-400 text-sm">Shingle Technology</span>
                                        <span className="text-white font-bold text-sm text-right">Owens Corning Duration®<br /><span className="text-[10px] text-[var(--rhive-pink)]">w/ SureNail®</span></span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-gray-400 text-sm">Underlayment Barrier</span>
                                        <span className="text-white font-bold text-sm text-right">ProArmor Synthetic</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-gray-400 text-sm">Ice & Water Shield</span>
                                        <span className="text-white font-bold text-sm text-right">WeatherLock G (6ft Min)</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-gray-400 text-sm">Warranty Target</span>
                                        <span className="text-white font-bold text-sm text-right">Lifetime No-Leak</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setActivePageId('P-12')} className="w-full py-4 bg-transparent border border-[var(--rhive-pink)] text-[var(--rhive-pink)] hover:bg-[var(--rhive-pink)] hover:text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                Configure Duration Package <span>→</span>
                            </button>
                        </div>

                        {/* Flex Card Detail */}
                        <div className="bg-black/60 relative border border-[var(--rhive-pink)] p-10 shadow-[0_0_40px_rgba(236,2,139,0.15)] group" style={{ clipPath: 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--rhive-pink)]/10 to-transparent z-0 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 bg-[var(--rhive-pink)] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 shadow-lg z-10">
                                Highest Value Selection
                            </div>

                            <div className="relative z-10">
                                <div className="text-[12px] text-[var(--rhive-pink)] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[var(--rhive-pink)] shadow-[0_0_10px_#ec028b]"></span>
                                    Premium Tier Protection
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase mb-4 font-display">Flex Package</h3>
                                <p className="text-gray-300 font-serif text-base mb-8 leading-relaxed">
                                    Class 4 Impact Resistant SBS modified asphalt. Withstands massive hail and extreme weather while potentially slashing your home insurance premiums by up to 30%.
                                </p>

                                <div className="bg-[var(--rhive-pink)]/5 p-6 mb-8 border border-[var(--rhive-pink)]/30">
                                    <h4 className="text-[10px] text-[var(--rhive-pink)] font-bold uppercase tracking-widest mb-4">Advanced System Specifications</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-[var(--rhive-pink)]/20 pb-2">
                                            <span className="text-gray-300 text-sm">Shingle Technology</span>
                                            <span className="text-white font-bold text-sm text-right">OC Duration FLEX®<br /><span className="text-[10px] text-[var(--rhive-pink)]">SBS Rubberized Asphalt</span></span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-[var(--rhive-pink)]/20 pb-2">
                                            <span className="text-gray-300 text-sm">Impact Rating</span>
                                            <span className="text-white font-bold text-sm text-right">Class 4 (Highest Rating)</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-[var(--rhive-pink)]/20 pb-2">
                                            <span className="text-gray-300 text-sm">Wind Resistance</span>
                                            <span className="text-white font-bold text-sm text-right">130 MPH Rating</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-[var(--rhive-pink)]/20 pb-2">
                                            <span className="text-gray-300 text-sm">Cold Weather Install</span>
                                            <span className="text-white font-bold text-sm text-right">10% Better Flexibility</span>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => setActivePageId('P-12')} className="w-full py-4 bg-[var(--rhive-pink)] text-white hover:bg-white hover:text-black font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                    Build Your Flex System <span>→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Commercial */}
                <section id="commercial" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                        <div className="w-12 h-12 bg-[var(--rhive-blue)]/20 border border-[var(--rhive-blue)] flex items-center justify-center rounded-sm">
                            <span className="text-[var(--rhive-blue)] font-black text-xl">02</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase font-display tracking-tight">Commercial Roofing Services</h2>
                    </div>
                    <p className="text-gray-400 font-serif text-lg mb-12 max-w-3xl">
                        Specializing in flat roofs and membrane systems, RHIVE serves commercial clients with precision, speed, and compliance—from HOA complexes to sprawling office parks.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'TPO Membrane', desc: 'Thermoplastic Polyolefin systems with hot-air welded seams. Exceptional Title 24 energy efficiency and UV resistance.', color: 'var(--rhive-blue)', icon: '🏢' },
                            { title: 'PVC Extrusion', desc: 'Superior chemical resistance and flexibility. Self-extinguishing fire rating makes it ideal for restaurants and industrial sites.', color: 'var(--rhive-blue)', icon: '🏭' },
                            { title: 'Modified Bitumen', desc: 'Multi-ply APP/SBS membrane offering proven asphalt technology, high puncture resistance, and cold weather flex.', color: 'gray-500', icon: '🏬' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/10 p-8 hover:border-white/30 transition-colors relative group" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}>
                                <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                                <h4 className="text-2xl font-black uppercase text-white mb-2">{item.title}</h4>
                                <div className="w-12 h-1 mb-6" style={{ backgroundColor: item.color }}></div>
                                <p className="text-sm text-gray-400 font-serif mb-8 leading-relaxed">
                                    {item.desc}
                                </p>
                                <button onClick={() => setActivePageId('P-12')} className="text-xs uppercase font-bold text-white hover:text-[var(--rhive-blue)] transition-colors flex items-center gap-2">
                                    View Full Extrusion Data <span>→</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Gutters & Ice */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <section id="gutters" className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="w-12 h-12 bg-white/5 border border-white/20 flex items-center justify-center rounded-sm">
                                <span className="text-white font-black text-xl">03</span>
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase font-display tracking-tight">Gutter Systems & Defense</h2>
                        </div>
                        <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/20 p-8" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}>
                            <h3 className="text-2xl font-black text-white uppercase mb-4 font-display">6" Seamless High-Capacity</h3>
                            <p className="text-gray-300 font-serif text-sm mb-6 leading-relaxed">
                                Oversized K-Style gutters offering 40% more water capacity. Custom mitered corners and hidden hanger fasteners ensure a flawless, architectural look.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="text-sm font-bold text-gray-400"><span className="text-white mr-2">▪</span> .032 Gauge Heavy Aluminum</li>
                                <li className="text-sm font-bold text-gray-400"><span className="text-white mr-2">▪</span> Oversized 3x4 Downspouts</li>
                                <li className="text-sm font-bold text-gray-400"><span className="text-white mr-2">▪</span> Premium Leaf Guard Integration</li>
                            </ul>
                            <button onClick={() => setActivePageId('P-12')} className="w-full py-3 bg-white text-black hover:bg-gray-200 font-black text-xs uppercase tracking-widest transition-colors" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                Configure Gutters
                            </button>
                        </div>
                    </section>

                    <section id="ice" className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="w-12 h-12 bg-[#0ee]/10 border border-[#0ee]/30 flex items-center justify-center rounded-sm">
                                <span className="text-[#0ee] font-black text-xl">04</span>
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase font-display tracking-tight">Ice Management</h2>
                        </div>
                        <div className="bg-gradient-to-br from-[#0ee]/10 to-transparent border border-[#0ee]/30 p-8" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}>
                            <h3 className="text-2xl font-black text-white uppercase mb-4 font-display">Automated Heat Trace</h3>
                            <p className="text-gray-300 font-serif text-sm mb-6 leading-relaxed">
                                Commercial-grade ambient temperature sensors that automatically activate heating elements to prevent ice dam backing and structural fatigue.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="text-sm font-bold text-gray-400"><span className="text-[#0ee] mr-2">▪</span> Self-Regulating Cables</li>
                                <li className="text-sm font-bold text-gray-400"><span className="text-[#0ee] mr-2">▪</span> Eave & Extrusion Protection</li>
                                <li className="text-sm font-bold text-gray-400"><span className="text-[#0ee] mr-2">▪</span> Custom Snow Retention Systems</li>
                            </ul>
                            <button onClick={() => setActivePageId('P-12')} className="w-full py-3 bg-transparent border border-[#0ee] text-[#0ee] hover:bg-[#0ee] hover:text-black font-black text-xs uppercase tracking-widest transition-colors" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                Configure Ice Defense
                            </button>
                        </div>
                    </section>
                </div>

                <div className="text-center pt-20 border-t border-white/10">
                    <div className="inline-block p-1 bg-gradient-to-r from-[var(--rhive-pink)] to-[var(--rhive-blue)] rounded-sm mb-8" style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }}>
                        <div className="bg-black px-12 py-8" style={{ clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)' }}>
                            <h3 className="text-3xl font-black text-white uppercase font-display mb-4">Your Roof. Our Legacy.</h3>
                            <p className="text-gray-400 font-serif max-w-xl mx-auto mb-6">
                                RHIVE Roofing is more than shingles and sealants. It’s a movement of trust, transformation, and transparency. Whether you're protecting your home, your business, or your legacy—you’re part of the Hive now.
                            </p>
                            <button onClick={() => setActivePageId('P-12')} className="px-8 py-4 bg-white text-black hover:bg-[var(--rhive-pink)] hover:text-white font-black text-xs uppercase tracking-widest transition-colors" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                                Join The Hive Today
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServicePackagesPage;
