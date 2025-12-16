import React, { useState, useEffect, useRef } from 'react';
import BlurText from '@/components/BlurText';
import { getIcon } from '@/components/icon';
import NumberFlow from '@number-flow/react';
import Tooltip from '@/components/custom-ui/Tooltip';
import { actions } from 'astro:actions';
import { type AllStarStats } from '@/types/all-stars';
import { demoExists } from '@/client-side/demo';
import { DEMO_EVENT_TYPES } from '@/types/demo';
import { getCommunityLinks } from '@/types/ara';
import SocialLink from '@/components/utilitified_decorations/SocialLink';

/**
 * Custom hook to fetch and poll all star stats every 10 seconds
 */
function useAllStarStats(): AllStarStats {
    const [stats, setStats] = useState<AllStarStats>({
        totalGalaxies: 0,
        totalStars: 0,
        totalUsers: 0,
        totalSunshines: 0,
    });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial fetch
        const fetchStats = async () => {
            try {
                const result = await actions.allStarStats({});

                if (result.error) {
                    console.error('Error fetching all star stats:', result.error);
                    return;
                }

                if (result.data) {
                    setStats((prevStats) => {
                        // Deep comparison to check if stats changed
                        const hasChanged =
                            prevStats.totalGalaxies !== result.data.totalGalaxies ||
                            prevStats.totalStars !== result.data.totalStars ||
                            prevStats.totalUsers !== result.data.totalUsers ||
                            prevStats.totalSunshines !== result.data.totalSunshines;

                        if (hasChanged) {
                            return result.data;
                        }
                        return prevStats;
                    });
                }
            } catch (error) {
                console.error('Error fetching all star stats:', error);
            }
        };

        // Fetch immediately
        fetchStats();

        // Set up polling every 10 seconds
        intervalRef.current = setInterval(fetchStats, 10000);

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return stats;
}

const UniverseHero: React.FC = () => {
    const stats = useAllStarStats();
    const { totalGalaxies, totalStars, totalUsers, totalSunshines = 0 } = stats;
    const [showDemoCta, setShowDemoCta] = useState(false);

    // Check if demo exists and listen for demo creation events
    useEffect(() => {
        // Check initial state
        if (demoExists()) {
            setShowDemoCta(true);
        }

        // Listen for USER_CREATED event
        const handleDemoUserCreated = () => {
            setShowDemoCta(true);
        };

        window.addEventListener(DEMO_EVENT_TYPES.USER_CREATED, handleDemoUserCreated as EventListener);

        return () => {
            window.removeEventListener(DEMO_EVENT_TYPES.USER_CREATED, handleDemoUserCreated as EventListener);
        };
    }, []);

    // Calculate funds amount from sunshines
    const fundsAmount = totalSunshines / 1.80;
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
            {/* Ara Title with Blur Text Animation */}
            <div className="w-full max-w-4xl relative">
                {getIcon({ iconType: 'ara', className: 'w-26 h-26 text-blue-500 absolute top-0 left-1/2 -translate-x-48' })}
                <BlurText
                    text="Ara"
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-800 dark:text-slate-200 justify-center "
                    animateBy="words"
                    direction="top"
                    delay={100}
                />
            </div>

            {/* Universe Stats */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
                <Tooltip content="open-source projects total amount">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/20 cursor-help">
                        {getIcon({ iconType: 'project', className: 'w-5 h-5 text-blue-500' })}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-600 dark:text-slate-400">Galaxies</span>
                            <NumberFlow
                                value={totalGalaxies}
                                locales="en-US"
                                format={{ style: 'decimal', maximumFractionDigits: 0 }}
                                className="text-lg font-semibold text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                </Tooltip>

                <Tooltip content="collaboration rewards">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/20 cursor-help">
                        {getIcon({ iconType: 'star', className: 'w-5 h-5 text-yellow-500' })}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-600 dark:text-slate-400">Stars</span>
                            <NumberFlow
                                value={totalStars}
                                locales="en-US"
                                format={{ style: 'decimal', maximumFractionDigits: 2 }}
                                className="text-lg font-semibold text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                </Tooltip>

                <Tooltip content="demo users (who created 3 demo)">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/20 cursor-help">
                        {getIcon({ iconType: 'user', className: 'w-5 h-5 text-blue-500' })}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-600 dark:text-slate-400">Users</span>
                            <NumberFlow
                                value={totalUsers}
                                locales="en-US"
                                format={{ style: 'decimal', maximumFractionDigits: 0 }}
                                className="text-lg font-semibold text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                </Tooltip>

                <Tooltip
                    content={
                        <div className="text-sm">
                            Total amount of funds (about{' '}
                            <NumberFlow
                                value={fundsAmount}
                                locales="en-US"
                                format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
                                className="inline font-semibold"
                            />
                            )
                        </div>
                    }
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/20 cursor-help">
                        {getIcon({ iconType: 'sunshine', className: 'w-5 h-5 text-yellow-400' })}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-600 dark:text-slate-400">Sunshines</span>
                            <NumberFlow
                                value={totalSunshines}
                                locales="en-US"
                                format={{ style: 'decimal', maximumFractionDigits: 0 }}
                                className="text-lg font-semibold text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                </Tooltip>
            </div>

            <div className="w-full max-w-4xl">
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    This is the All Stars. <br />
                    The galactic universe of the open-source projects.<br />
                    Donate, collaborate, and become the owner of the project.
                </p>
            </div>

            {/* Demo CTA - shown when demo panel is hidden */}
            {showDemoCta && (
                <div className="w-full max-w-2xl mt-6 space-y-4">
                    <div className="backdrop-blur-md bg-white/20 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-700/40 rounded-lg p-6 text-center">
                        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            This is a Demo. Join our community to get early version. We will appreciate your feedback as well.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            {getCommunityLinks().map((link) => (
                                <SocialLink
                                    key={link.type}
                                    link={link}
                                    className="flex items-center justify-center rounded-lg w-10 h-10 backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-700/40 hover:bg-white/40 dark:hover:bg-slate-900/40 transition-all"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniverseHero;

