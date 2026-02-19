import React from 'react';
import { useMockDB } from '../contexts/MockDatabaseContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useTheme } from '../contexts/ThemeContext';
import { PAGE_GROUPS } from '../constants';
import { PageGroup } from '../types';
import {
    RhiveLogo,
    HomeIcon,
    ChartBarIcon,
    UserIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
    CalculatorIcon,
    PriceTagIcon,
    DocumentTextIcon,
    ListBulletIcon,
    BuildingStorefrontIcon,
    MapPinIcon,
    BriefcaseIcon,
    TruckIcon,
    WrenchIcon,
    BoltIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    SearchIcon,
    ClockIcon,
    KeyIcon,
    SparklesIcon
} from './icons';
import { cn } from '../lib/utils';

// Helper to get icon by page ID
const getIconForPage = (id: string) => {
    // PUBLIC
    if (id === 'P-01') return <UserIcon className="h-5 w-5" />;
    if (id === 'P-02') return <BuildingStorefrontIcon className="h-5 w-5" />;
    if (id === 'P-03') return <ListBulletIcon className="h-5 w-5" />;
    if (id === 'P-04') return <CurrencyDollarIcon className="h-5 w-5" />;
    if (id === 'P-05') return <MapPinIcon className="h-5 w-5" />;
    if (id === 'P-07') return <KeyIcon className="h-5 w-5" />;
    if (id === 'P-09') return <BuildingStorefrontIcon className="h-5 w-5" />;
    if (id === 'P-10') return <BoltIcon className="h-5 w-5" />;
    if (id === 'P-11') return <DocumentTextIcon className="h-5 w-5" />;
    if (id === 'P-12') return <CalculatorIcon className="h-5 w-5" />;
    if (id === 'P-00') return <SparklesIcon className="h-5 w-5" />;
    if (id === 'P-00a') return <BoltIcon className="h-5 w-5" />;

    // ADMIN (A-Series)
    if (id.startsWith('A-')) return <ShieldCheckIcon className="h-5 w-5" />;

    // EMPLOYEE (E-Series)
    if (id === 'E-01') return <HomeIcon className="h-5 w-5" />;
    if (id === 'E-02') return <SearchIcon className="h-5 w-5" />;
    if (id === 'E-02a') return <UserIcon className="h-5 w-5" />;
    if (id === 'E-03') return <BoltIcon className="h-5 w-5" />;
    if (id === 'E-04' || id === 'E-22') return <CalendarDaysIcon className="h-5 w-5" />;
    if (id === 'E-05') return <ListBulletIcon className="h-5 w-5" />;
    if (id === 'E-06') return <MapPinIcon className="h-5 w-5" />;
    if (id === 'E-16') return <CurrencyDollarIcon className="h-5 w-5" />;
    if (id === 'E-17') return <ChartBarIcon className="h-5 w-5" />;
    if (id === 'E-18') return <DocumentTextIcon className="h-5 w-5" />;
    if (id === 'E-23') return <PriceTagIcon className="h-5 w-5" />;
    if (id === 'E-27' || id === 'P-12') return <CalculatorIcon className="h-5 w-5" />;
    if (id === 'E-38') return <BoltIcon className="h-5 w-5" />;
    if (id === 'E-39') return <SparklesIcon className="h-5 w-5" />;
    if (id === 'E-29') return <ShieldCheckIcon className="h-5 w-5" />;
    if (id === 'E-32') return <WrenchIcon className="h-5 w-5" />;
    if (id === 'E-34') return <CurrencyDollarIcon className="h-5 w-5" />;

    // CUSTOMER
    if (id === 'C-01') return <HomeIcon className="h-5 w-5" />;
    if (id === 'C-02') return <ListBulletIcon className="h-5 w-5" />;
    if (id === 'C-03') return <BriefcaseIcon className="h-5 w-5" />;
    if (id.startsWith('C-')) return <UserIcon className="h-5 w-5" />;

    // CONTRACTOR
    if (id === 'CO-01') return <HomeIcon className="h-5 w-5" />;
    if (id === 'CO-06') return <ListBulletIcon className="h-5 w-5" />;
    if (id === 'CO-08') return <MapPinIcon className="h-5 w-5" />;
    if (id.startsWith('CO-')) return <BuildingStorefrontIcon className="h-5 w-5" />;

    // SUPPLIER
    if (id === 'S-04') return <UserIcon className="h-5 w-5" />;
    if (id.startsWith('S-')) return <TruckIcon className="h-5 w-5" />;

    return <BriefcaseIcon className="h-5 w-5" />;
};

interface SidebarProps {
    pageGroups?: PageGroup[];
}

export const Sidebar: React.FC<SidebarProps> = ({ pageGroups }) => {
    const { currentUser, logout } = useMockDB();
    const { activePageId, setActivePageId } = useNavigation();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    if (!currentUser) return null;

    // Filter groups based on user role
    const sourceGroups = pageGroups || PAGE_GROUPS;
    const userGroups = sourceGroups.filter(group =>
        group.userType === 'All' || group.userType === currentUser.role
    );

    return (
        <aside className={cn(
            "w-64 border-r backdrop-blur-md flex flex-col flex-shrink-0 h-full relative z-50 transition-colors duration-500",
            isDark ? "bg-black/80 border-white/5" : "bg-white/80 border-black/5"
        )}>
            <div className={cn("p-6 border-b flex items-center justify-center transition-colors duration-500", isDark ? "border-white/5" : "border-black/5")}>
                <RhiveLogo className={cn("h-8 transition-colors duration-500", isDark ? "text-white" : "text-black")} />
            </div>

            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                {userGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="mb-6 px-4">
                        <div className="space-y-1">
                            {group.pages.map(page => (
                                <button
                                    key={page.id}
                                    onClick={() => setActivePageId(page.id)}
                                    className={cn(
                                        "flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                        activePageId === page.id
                                            ? "bg-[#ec028b]/20 text-[#ec028b] border border-[#ec028b]/30"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <span className="mr-3 opacity-80">
                                        {getIconForPage(page.id)}
                                    </span>
                                    <span className="truncate">{page.name}</span>
                                </button>
                            ))}
                        </div>
                        {groupIdx < userGroups.length - 1 && (
                            <div className="my-4 border-t border-gray-800/50 mx-2" />
                        )}
                    </div>
                ))}
            </div>

            <div className={cn("p-4 border-t transition-colors duration-500", isDark ? "border-white/5 bg-black/40" : "border-black/5 bg-white/40")}>
                <div className="flex items-center mb-4 px-2">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-colors", isDark ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-200")}>
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className={cn("text-sm font-medium truncate transition-colors", isDark ? "text-white" : "text-black")}>{currentUser.name}</p>
                        <p className="text-xs text-[#ec028b] truncate">{currentUser.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full py-2 px-4 bg-gray-900 hover:bg-red-900/20 border border-gray-700 hover:border-red-500/50 rounded-lg text-gray-400 hover:text-red-400 text-sm transition-all"
                >
                    Sign Out
                </button>
            </div>
        </aside>
    );
};
