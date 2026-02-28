import React, { useState } from 'react';
import Card from '../components/Card';
import { BuildingStorefrontIcon, UserIcon, GutterIcon, SnowflakeIcon, ArrowRightIcon } from '../components/icons';
import { useNavigation } from '../contexts/NavigationContext';
import ServicesHero from '../components/ServicesHero';
import ServicesLightbox from '../components/ServicesLightbox';

const ServiceCard = ({ title, icon: Icon, details, image, cta, onClick, secondaryCta, onSecondaryClick }: any) => (
    <div className="flex flex-col h-full group relative overflow-hidden bg-black border border-white/10 shadow-2xl transition-all duration-500 hover:border-[var(--rhive-pink)]/30 hover:shadow-[0_0_40px_rgba(236,2,139,0.1)]"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}
    >
        {/* Image Header */}
        <div className="relative h-64 w-full overflow-hidden bg-black">
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10"></div>

            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
            />

            {/* Top Right Tech Accent */}
            <div className="absolute top-6 right-6 z-20 flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-[var(--rhive-pink)] rounded-full animate-pulse shadow-[0_0_8px_rgba(236,2,139,0.8)]"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
            </div>

            {/* Icon Positioning */}
            <div className="absolute bottom-6 left-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-16 h-16 bg-black/80 backdrop-blur-xl flex items-center justify-center border border-[var(--rhive-pink)]/40 text-[var(--rhive-pink)] shadow-[0_0_20px_rgba(236,2,139,0.2)]"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                    <Icon className="w-7 h-7" />
                </div>
            </div>
        </div>

        <div className="flex-grow p-8 bg-gradient-to-b from-[#0a0a0a] to-black relative z-20 border-t border-white/5">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6 font-display group-hover:text-[var(--rhive-pink)] transition-colors duration-300">{title}</h3>
            <ul className="space-y-4">
                {details.map((d: string, i: number) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start font-serif group-hover:text-gray-300 transition-colors">
                        <span className="text-[var(--rhive-pink)] mr-3 mt-1 text-[10px] transform group-hover:scale-125 transition-transform duration-300">■</span>
                        <span className="leading-relaxed">{d}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="relative z-20 pt-6 border-t border-white/5 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-black">
            <button
                onClick={onClick}
                className="flex-[1.5] bg-transparent hover:bg-[var(--rhive-pink)] text-white py-5 font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-3 relative overflow-hidden group/btn"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--rhive-pink)] to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity z-0"></div>
                <span className="relative z-10">{cta}</span>
                <ArrowRightIcon className="w-4 h-4 inline-block relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
            {secondaryCta && (
                <button
                    onClick={onSecondaryClick}
                    className="flex-1 bg-[#111] hover:bg-white text-gray-400 hover:text-black py-5 font-black uppercase tracking-widest text-[10px] transition-colors flex items-center justify-center gap-2"
                >
                    {secondaryCta}
                </button>
            )}
        </div>
    </div>
);

import CommercialLightbox from '../components/CommercialLightbox';
import GuttersLightbox from '../components/GuttersLightbox';
import IceLightbox from '../components/IceLightbox';

const OurServicesPage: React.FC = () => {
    const { setActivePageId } = useNavigation();
    const [activeLightbox, setActiveLightbox] = useState<'residential' | 'commercial' | 'gutters' | 'ice' | null>(null);

    const services = [
        {
            title: "Residential Roofing",
            icon: UserIcon,
            image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1000&auto=format&fit=crop", // Dark architectural home
            details: [
                "Owens Corning Duration® Series",
                "California Cut Valley installation",
                "Strict No-Layover policy",
                "SureNail® technology implementation",
                "Lifetime No-Leak Guarantee"
            ],
            cta: "Get Quote",
            onClick: () => setActivePageId('P-12'),
            secondaryCta: "Compare Packages",
            onSecondaryClick: () => setActiveLightbox('residential')
        },
        {
            title: "Commercial Solutions",
            icon: BuildingStorefrontIcon,
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop", // Modern commercial building
            details: [
                "GAF PVC & TPO Membrane Systems",
                "NDL (No Dollar Limit) Warranty",
                "Energy-efficient insulation boards",
                "Heat-welded seam integrity",
                "Complex drainage engineering"
            ],
            cta: "Schedule Site Assessment",
            onClick: () => setActivePageId('P-12'),
            secondaryCta: "Compare Systems",
            onSecondaryClick: () => setActiveLightbox('commercial')
        },
        {
            title: "Gutter Systems",
            icon: GutterIcon,
            image: "https://images.unsplash.com/photo-1605814578130-10b27acdfb6e?q=80&w=1000&auto=format&fit=crop", // Sleek exterior detail
            details: [
                "5\" and 6\" Seamless Aluminum",
                "K-Style, Half-Round & Box Square",
                "Premium Leaf Guard integration",
                "Custom mitered corners",
                "High-capacity downspout options"
            ],
            cta: "Add Gutter Estimate",
            onClick: () => setActivePageId('P-12'),
            secondaryCta: "Gutter Options",
            onSecondaryClick: () => setActiveLightbox('gutters')
        },
        {
            title: "Ice Management",
            icon: SnowflakeIcon,
            image: "https://images.unsplash.com/photo-1549480665-2dfb94fd4ac5?q=80&w=1000&auto=format&fit=crop", // Snow/freeze macro
            details: [
                "Commercial-grade Heat Cables",
                "Automated sensor integration",
                "Prevents ice-dam backup",
                "Eave and Valley protection",
                "Snow retention systems"
            ],
            cta: "Protect My Roof",
            onClick: () => setActivePageId('P-12'),
            secondaryCta: "Ice Defense Options",
            onSecondaryClick: () => setActiveLightbox('ice')
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--rhive-bg)] animate-fade-in flex flex-col relative overflow-x-hidden">
            {/* H-02: Services Hero */}
            <ServicesHero />

            {/* L-02 Phase Lightboxes */}
            <ServicesLightbox isOpen={activeLightbox === 'residential'} onClose={() => setActiveLightbox(null)} />
            {activeLightbox === 'commercial' && <CommercialLightbox isOpen={true} onClose={() => setActiveLightbox(null)} />}
            {activeLightbox === 'gutters' && <GuttersLightbox isOpen={true} onClose={() => setActiveLightbox(null)} />}
            {activeLightbox === 'ice' && <IceLightbox isOpen={true} onClose={() => setActiveLightbox(null)} />}

            <div className="max-w-[85rem] mx-auto px-6 pb-24 pt-4 w-full relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--rhive-text)] uppercase font-display">Specialized Capabilities<span className="text-[var(--rhive-pink)]">.</span></h1>
                    <p className="mt-4 max-w-2xl text-[var(--rhive-text-muted)] font-serif text-lg leading-relaxed">
                        Precision engineering for extreme weather environments. From rapid-response residential replacement to multi-acre commercial NDL deployments.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((s, i) => (
                        <ServiceCard key={i} {...s} />
                    ))}
                </div>

                <div
                    className="mt-20 p-12 bg-black border border-white/10 relative overflow-hidden group"
                    style={{ clipPath: 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)' }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--rhive-pink)]/5 rounded-full blur-[80px] group-hover:bg-[var(--rhive-pink)]/10 transition-all duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-grow">
                            <h4 className="text-3xl font-black text-white uppercase mb-4 font-display">The RHIVE Quality Standard</h4>
                            <p className="text-gray-400 font-serif leading-relaxed">
                                Unlike "budget" contractors who mix-and-match materials, RHIVE utilizes only manufacturer-certified
                                integrated systems to safeguard your full warranty protection. Every single component is tracked and verified.
                            </p>
                            <div className="flex gap-4 flex-wrap mt-8">
                                <div className="px-4 py-2 border border-white/10 text-[10px] font-bold text-[var(--rhive-pink)] uppercase tracking-widest bg-white/5">0 Layovers</div>
                                <div className="px-4 py-2 border border-white/10 text-[10px] font-bold text-[var(--rhive-pink)] uppercase tracking-widest bg-white/5">CA Valley Cut</div>
                                <div className="px-4 py-2 border border-white/10 text-[10px] font-bold text-[var(--rhive-pink)] uppercase tracking-widest bg-white/5">NDL Warranty</div>
                            </div>
                        </div>
                        <button
                            className="bg-[var(--rhive-pink)] text-white px-8 py-4 font-black uppercase tracking-widest text-xs min-w-[200px] hover:bg-white hover:text-black transition-colors"
                            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                            onClick={() => setActivePageId('P-12')}
                        >
                            Open Estimator
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServicesPage;
