
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Button from '../components/Button';
import {
    BriefcaseIcon,
    CalendarDaysIcon,
    ListBulletIcon,
    UserIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftRightIcon,
    DocumentDuplicateIcon,
    DocumentTextIcon,
    BoltIcon,
    CheckIcon
} from '../components/icons';
import { PAGE_GROUPS } from '../constants';
import { useNavigation } from '../contexts/NavigationContext';
import { useMockDB } from '../contexts/MockDatabaseContext';
import { cn } from '../lib/utils';

// Compact Session Widget
const SessionWidget = () => {
    const { currentUser } = useMockDB();
    const { setActivePageId } = useNavigation();

    return (
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm mb-6 shadow-lg">
            <div className="flex items-center">
                <div className="relative">
                    <img src={currentUser?.avatarUrl || "https://i.pravatar.cc/150?u=employee"} alt="User" className="w-12 h-12 rounded-full border border-[#ec028b]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-black border border-[#ec028b] rounded-full"></div>
                </div>
                <div className="ml-4">
                    <h3 className="text-white font-bold">{currentUser?.name}</h3>
                    <p className="text-xs text-[#ec028b] font-medium">Clocked In: 08:00 AM</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => setActivePageId('E-03')}
                    className="px-3 py-1.5 bg-black hover:bg-gray-900 text-xs text-white rounded-md border border-gray-700 hover:border-gray-500 transition-colors"
                >
                    My Info
                </button>
                <button className="px-3 py-1.5 bg-black hover:bg-gray-900 text-xs text-gray-400 hover:text-white rounded-md border border-gray-800 hover:border-gray-600 transition-colors">
                    Clock Out
                </button>
            </div>
        </div>
    );
};

// KPI Stat Card Component
const StatCard = ({ label, value, icon: Icon, trend, loading }: { label: string, value: string, icon: any, trend?: string, loading?: boolean }) => (
    <div className="bg-gray-900/60 border border-gray-700/50 p-4 rounded-xl flex items-center justify-between backdrop-blur-sm hover:border-[#ec028b]/50 transition-all duration-300 group shadow-lg">
        <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-[#ec028b] transition-colors">{label}</p>
            {loading ? (
                <div className="mt-2 h-8 w-16 bg-gray-700/60 rounded animate-pulse" />
            ) : (
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            )}
            {trend && !loading && <p className="text-xs text-gray-500 mt-1 font-medium">{trend}</p>}
            {loading && <div className="mt-1 h-3 w-24 bg-gray-800/60 rounded animate-pulse" />}
        </div>
        <div className="h-12 w-12 rounded-full bg-black/40 border border-gray-700 flex items-center justify-center text-gray-500 group-hover:text-[#ec028b] group-hover:border-[#ec028b]/30 transition-all">
            <Icon className="h-6 w-6" />
        </div>
    </div>
);

const TaskItem = ({ label, initialStatus, badge }: { label: string, initialStatus: boolean, badge?: string }) => {
    const [status, setStatus] = useState(initialStatus);
    return (
        <li
            onClick={() => setStatus(!status)}
            className="flex items-center group cursor-pointer py-2 hover:bg-white/5 px-2 rounded-lg transition-colors"
        >
            <div className={cn(
                "w-5 h-5 border transition-all duration-300 flex items-center justify-center rounded-sm",
                status ? "bg-rhive-pink border-rhive-pink shadow-[0_0_8px_rgba(236,2,139,0.5)]" : "bg-black border-gray-600 group-hover:border-gray-400"
            )}>
                {status && <CheckIcon className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className={cn(
                "ml-3 text-sm transition-all",
                status ? "text-gray-500 line-through" : "text-gray-300 group-hover:text-white"
            )}>{label}</span>
            {badge && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-white bg-red-900/50 border border-red-900 px-2 py-0.5 rounded">{badge}</span>}
        </li>
    );
};

const EmployeeHomepage: React.FC = () => {
    const page = PAGE_GROUPS.flatMap(g => g.pages).find(p => p.id === 'E-01');
    const { setActivePageId } = useNavigation();
    const { currentUser } = useMockDB();

    const [activity, setActivity] = useState<{ user: string; action: string; target: string; time: string }[]>([]);
    const [activityLoading, setActivityLoading] = useState(true);

    const [dashboardStats, setDashboardStats] = useState({
        activeProjects: 0,
        activeProjectsTrend: '',
        tasksDue: 0,
        tasksOverdue: 0,
        pendingQuotesCount: 0,
        pendingQuotesValue: 0,
        unreadMessages: 0,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    const formatQuoteValue = (val: number) => {
        if (val === 0) return '$0';
        if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
        return `$${val.toLocaleString()}`;
    };

    const timeAgo = (dateString: string) => {
        if (!dateString) return 'Just now';
        const diff = Date.now() - new Date(dateString).getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    useEffect(() => {
        const unsubscribe = projectService.subscribeToRecentActivity((projects: any[]) => {
            const sorted = [...projects].sort((a, b) =>
                new Date(b.updated_at || b.created_at || 0).getTime() -
                new Date(a.updated_at || a.created_at || 0).getTime()
            ).slice(0, 5);

            const mapped = sorted.map((p: any) => ({
                user: 'New Lead',
                action: 'submitted project',
                target: p.name || 'Unnamed Project',
                time: timeAgo(p.updated_at || p.created_at),
            }));

            setActivity(mapped);
            setActivityLoading(false);
        });

        const unsubStats = dashboardService.subscribeToStats((stats) => {
            setDashboardStats(stats);
            setStatsLoading(false);
        });

        return () => {
            unsubscribe();
            unsubStats();
        };
    }, []);

    const schedule = [
        { time: '09:00 AM', event: 'Team Standup', type: 'Meeting' },
        { time: '11:30 AM', event: 'Site Visit - Thompson', type: 'Site' },
        { time: '02:00 PM', event: 'Vendor Call - ABC Supply', type: 'Call' },
    ];

    return (
        <PageContainer
            title={page?.name || 'Employee Homepage'}
            description="Welcome back. Here is your daily command center."
            headerAction={
                <div className="flex space-x-3">
                    <button
                        onClick={() => setActivePageId('E-SIM-GUIDE')}
                        className="flex items-center px-4 py-2 bg-gray-900/50 border border-gray-700 text-gray-400 rounded-full hover:bg-[#ec028b]/10 hover:text-[#ec028b] hover:border-[#ec028b]/50 transition-all text-sm font-medium"
                    >
                        <BoltIcon className="w-5 h-5 mr-2" />
                        Simulation Guide
                    </button>
                    <button
                        onClick={() => setActivePageId('E-G-01')}
                        className="group flex items-center px-4 py-2 bg-black/40 border border-[#ec028b] rounded-full hover:bg-[#ec028b] hover:text-white text-[#ec028b] transition-all duration-300 shadow-[0_0_10px_rgba(236,2,139,0.2)] hover:shadow-[0_0_20px_rgba(236,2,139,0.5)]"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                        <span className="font-semibold text-sm">Global Dispatch</span>
                    </button>
                </div>
            }
        >
            {/* --- STATS OVERVIEW --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    label="Active Projects"
                    value={String(dashboardStats.activeProjects)}
                    icon={BriefcaseIcon}
                    trend={dashboardStats.activeProjectsTrend}
                    loading={statsLoading}
                />
                <StatCard
                    label="Tasks Due"
                    value={String(dashboardStats.tasksDue)}
                    icon={ListBulletIcon}
                    trend={dashboardStats.tasksOverdue > 0 ? `${dashboardStats.tasksOverdue} overdue` : 'All on track'}
                    loading={statsLoading}
                />
                <StatCard
                    label="Pending Quotes"
                    value={formatQuoteValue(dashboardStats.pendingQuotesValue)}
                    icon={DocumentTextIcon}
                    trend={`${dashboardStats.pendingQuotesCount} waiting`}
                    loading={statsLoading}
                />
                <StatCard
                    label="Unread Msgs"
                    value={String(dashboardStats.unreadMessages)}
                    icon={ChatBubbleLeftRightIcon}
                    loading={statsLoading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- LEFT COLUMN (Main Feed) --- */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Quick Actions */}
                    <Card title="Quick Actions">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                variant="secondary"
                                className="flex-col h-24 hover:bg-gray-900 hover:border-[#ec028b]/50 hover:shadow-[0_0_15px_rgba(236,2,139,0.15)] transition-all bg-black/40 border-gray-700"
                                onClick={() => setActivePageId('E-02a')}
                            >
                                <UserIcon className="w-6 h-6 mb-2 text-[#ec028b]" />
                                <span className="text-xs uppercase font-bold tracking-wide">New Intake</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-col h-24 hover:bg-gray-900 hover:border-[#ec028b]/50 hover:shadow-[0_0_15px_rgba(236,2,139,0.15)] transition-all bg-black/40 border-gray-700"
                                onClick={() => setActivePageId('E-05')}
                            >
                                <BriefcaseIcon className="w-6 h-6 mb-2 text-[#ec028b]" />
                                <span className="text-xs uppercase font-bold tracking-wide">Sales Hub</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-col h-24 hover:bg-gray-900 hover:border-[#ec028b]/50 hover:shadow-[0_0_15px_rgba(236,2,139,0.15)] transition-all bg-black/40 border-gray-700"
                                onClick={() => setActivePageId('E-PROD')}
                            >
                                <CalendarDaysIcon className="w-6 h-6 mb-2 text-[#ec028b]" />
                                <span className="text-xs uppercase font-bold tracking-wide">Production</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-col h-24 hover:bg-gray-900 hover:border-[#ec028b]/50 hover:shadow-[0_0_15px_rgba(236,2,139,0.15)] transition-all bg-black/40 border-gray-700"
                                onClick={() => setActivePageId('E-RPT')}
                            >
                                <DocumentDuplicateIcon className="w-6 h-6 mb-2 text-[#ec028b]" />
                                <span className="text-xs uppercase font-bold tracking-wide">Reports</span>
                            </Button>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Recent Activity" className="h-full">
                            <ul className="space-y-4">
                                {activity.map((item, index) => (
                                    <li key={index} className="flex items-start text-sm border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                                        <div className="w-2 h-2 rounded-full bg-[#ec028b] mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_5px_#ec028b]"></div>
                                        <div>
                                            <p className="text-gray-300">
                                                <span className="font-semibold text-white">{item.user}</span> {item.action} <span className="text-[#ec028b] font-medium">{item.target}</span>.
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card title="My Tasks" className="h-full">
                            <ul className="space-y-3">
                                <TaskItem label="Follow up with 1927 Thompson" initialStatus={false} badge="Overdue" />
                                <TaskItem label="Submit Q2 Expense Report" initialStatus={false} />
                                <TaskItem label="Finalize material order" initialStatus={true} />
                            </ul>
                        </Card>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Session Widget */}
                    <SessionWidget />

                    {/* Admin Insights (Only for Admin/Super Admin) */}
                    {(currentUser?.role === 'Admin' || currentUser?.role === 'Super Admin') && (
                        <Card className="bg-[#ec028b]/10 border-[#ec028b]/30 group hover:border-[#ec028b]/60 transition-all cursor-pointer overflow-hidden p-6" onClick={() => setActivePageId('A-01')}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheckIcon className="w-6 h-6 text-[#ec028b]" />
                                    <h4 className="font-black text-white uppercase tracking-widest text-sm leading-none">Control Room</h4>
                                </div>
                                <ArrowRightIcon className="w-4 h-4 text-[#ec028b] group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                                Access organization-wide oversight protocols and system status.
                            </p>
                        </Card>
                    )}

                    {/* Agenda */}
                    <Card title="Today's Schedule">
                        <div className="space-y-4">
                            {schedule.map((item, i) => (
                                <div key={i} className="flex items-start">
                                    <div className="w-16 text-xs font-mono text-gray-500 pt-1">{item.time}</div>
                                    <div className="flex-1 pb-4 border-l border-gray-800 pl-4 relative">
                                        <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${item.type === 'Meeting' ? 'bg-white' : item.type === 'Site' ? 'bg-[#ec028b]' : 'bg-gray-600'}`}></div>
                                        <p className="text-sm font-bold text-white">{item.event}</p>
                                        <p className="text-xs text-gray-500 uppercase">{item.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full mt-2 flex items-center justify-center gap-2"
                            onClick={() => setActivePageId('E-04')}
                        >
                            <CalendarDaysIcon className="w-4 h-4" />
                            View Full Calendar
                        </Button>
                    </Card>

                    {/* Pinned/Weather Widget */}
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center">
                            <BoltIcon className="w-8 h-8 text-gray-500 mr-3" />
                            <div>
                                <p className="text-sm font-bold text-white">Storm Alert</p>
                                <p className="text-xs text-gray-400">Hail expected in Denver Area</p>
                            </div>
                        </div>
                        <span className="text-xs bg-black border border-gray-600 text-gray-300 px-2 py-1 rounded">View</span>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default EmployeeHomepage;
