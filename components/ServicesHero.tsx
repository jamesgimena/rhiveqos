import React from 'react';

export const ServicesHero: React.FC = () => {
    return (
        <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[var(--rhive-obsidian)] border-b border-white/10">
            {/* Background Texture Layers */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="absolute inset-0 bg-tech-grid bg-[length:40px_40px] opacity-20 pointer-events-none z-0"></div>

            {/* Neon Accent Glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--rhive-pink)]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
                <div className="inline-flex items-center justify-center gap-2 mb-6 border border-[var(--rhive-pink)]/30 bg-[var(--rhive-pink)]/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span className="w-1.5 h-1.5 bg-[var(--rhive-pink)] rounded-full animate-pulse shadow-[0_0_8px_rgba(236,2,139,0.8)]"></span>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--rhive-pink)] font-bold font-mono">Precision System Engineering</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 font-display drop-shadow-2xl">
                    Our Services<span className="text-[var(--rhive-pink)]">.</span>
                </h1>

                <p className="text-gray-300 font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Uncompromising execution and premium materials. Every roof, gutter, and ice management system is built to the absolute highest industry standard.
                </p>
            </div>
        </section>
    );
};

export default ServicesHero;
