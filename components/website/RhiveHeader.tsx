
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigation } from '../../contexts/NavigationContext';
import { useTheme } from '../../contexts/ThemeContext';

const RhiveHeader: React.FC = () => {
    const { setActivePageId, activePageId } = useNavigation();
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    const navLinks = [
        { label: 'ABOUT', target: 'hero' },
        { label: 'SERVICES', target: 'services' },
        { label: 'PROCESS', target: 'process' },
        { label: 'FINANCING', target: 'financing' },
    ];

    const scrollToSection = (id: string) => {
        // If we are not on the homepage, navigate there first
        if (activePageId !== 'P-00' && activePageId !== 'P-01') {
            setActivePageId('P-00');
            // Give it a moment to mount before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[500] glass h-24 flex items-center px-12 border-b border-[var(--border-color)] transition-all duration-300">
            <nav className="flex-1 flex justify-end gap-10">
                {navLinks.slice(0, 2).map((link) => (
                    <button
                        key={link.target}
                        onClick={() => scrollToSection(link.target)}
                        className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)] hover:text-rhive-pink transition-colors"
                    >
                        {link.label}
                    </button>
                ))}
            </nav>

            {/* CENTRAL LOGO (Hexagonal "R") */}
            <div className="mx-14 relative flex items-center gap-5">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePageId('P-00')}
                    className="relative w-14 h-14 bg-[var(--text-main)] flex items-center justify-center isolate group shadow-pink-glow-sm"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                    <span className="text-[var(--bg-main)] font-black text-2xl relative z-10 transition-transform group-hover:scale-110">R</span>
                    <div className="absolute inset-0 bg-rhive-pink opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.button>
                <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter uppercase leading-none text-[var(--text-main)]">RHIVE<span className="text-rhive-pink">.</span></span>
                    <span className="text-[9px] font-black tracking-[0.5em] text-rhive-pink uppercase mt-1">OS 2.0</span>
                </div>
            </div>

            <nav className="flex-1 flex justify-start gap-10 items-center">
                {navLinks.slice(2).map((link) => (
                    <button
                        key={link.target}
                        onClick={() => scrollToSection(link.target)}
                        className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)] hover:text-rhive-pink transition-colors"
                    >
                        {link.label}
                    </button>
                ))}

                <div className="h-6 w-[1px] bg-[var(--border-color)] mx-6 opacity-30" />

                <button
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    className="p-2.5 rounded-full glass hover:text-rhive-pink transition-all group relative border-white/5"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                            initial={false}
                            animate={{ scale: isDark ? 0 : 1, rotate: isDark ? 90 : 0, opacity: isDark ? 0 : 1 }}
                            className="absolute"
                        >
                            <Sun size={20} />
                        </motion.div>
                        <motion.div
                            initial={false}
                            animate={{ scale: isDark ? 1 : 0, rotate: isDark ? 0 : -90, opacity: isDark ? 1 : 0 }}
                            className="absolute"
                        >
                            <Moon size={20} />
                        </motion.div>
                    </div>
                </button>
            </nav>
        </header>
    );
};

export default RhiveHeader;
