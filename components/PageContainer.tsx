import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

interface PageContainerProps {
    title: string;
    description: string;
    children: React.ReactNode;
    headerAction?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, children, headerAction }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="p-6 md:p-10 h-full overflow-y-auto animate-fade-in scrollbar-hide relative">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
            <header className={cn("mb-8 pb-4 border-b flex flex-col md:flex-row md:items-start md:justify-between gap-4 transition-colors duration-500", isDark ? "border-white/5" : "border-black/5")}>
                <div>
                    <h1 className={cn("text-3xl font-extrabold tracking-tight transition-colors duration-500", isDark ? "text-white" : "text-black")}>{title}</h1>
                    <p className={cn("mt-2 max-w-3xl transition-colors duration-500", isDark ? "text-gray-400" : "text-gray-600")}>{description}</p>
                </div>
                {headerAction && (
                    <div className="flex-shrink-0">
                        {headerAction}
                    </div>
                )}
            </header>
            <div className="space-y-6 pb-10">
                {children}
            </div>
        </div>
    );
};

export default PageContainer;