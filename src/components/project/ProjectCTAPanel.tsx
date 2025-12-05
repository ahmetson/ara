import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Button from '@/components/custom-ui/Button';
import Tooltip from '@/components/custom-ui/Tooltip';
import Badge from '@/components/badge/Badge';
import { getIcon } from '@/components/icon';
import { cn } from '@/lib/utils';
import DemoAuthPanel from '@/demo-runtime-cookies/components/DemoAuthPanel';
import { getDemo, changeRole } from '@/demo-runtime-cookies/client-side';
import { actions } from 'astro:actions';
import ObtainSunshinesDialog from './ObtainSunshinesDialog';
import NumberFlow from '@number-flow/react';

interface ProjectCTAPanelProps {
  galaxyId: string;
  projectName: string;
}

const ProjectCTAPanel: React.FC<ProjectCTAPanelProps> = ({ galaxyId, projectName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [demoStep, setDemoStep] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState<{
    sunshines: number;
    totalSunshines: number;
    galaxyId: string;
    projectName: string;
    uri: string;
  } | null>(null);

  const tooltipContent = (
    <div className="text-sm max-w-xs">
      <p>- Obtain sunshines, collaborate with maintainer on project issues. <br />
        - Turn sunshines to stars.<br />
        - Grow stars and turn it into a community owned project.<br />
        - The project will be owned by the community when it reaches 100 stars.</p>
    </div>
  );

  // Fetch demo step on mount
  useEffect(() => {
    const fetchDemoStep = async () => {
      const demo = getDemo();
      if (demo.email) {
        try {
          const result = await actions.getDemoStep({ email: demo.email });
          if (result.data?.success) {
            setDemoStep(result.data.step);
          }
        } catch (error) {
          console.error('Error fetching demo step:', error);
        } finally {
          setIsLoadingStep(false);
        }
      } else {
        setIsLoadingStep(false);
      }
    };

    fetchDemoStep();
  }, []);

  const handleObtainSunshines = async () => {
    setIsLoading(true);
    try {
      const demo = getDemo();
      if (!demo.email || !demo.users) {
        console.error('Demo not found');
        setIsLoading(false);
        return;
      }

      // Check and change role to 'user' if needed
      if (demo.role !== 'user') {
        changeRole('user');
      }

      // Get current user (user role or first user)
      const currentUser = demo.users.find(u => u.role === 'user') || demo.users[0];
      if (!currentUser || !currentUser._id) {
        console.error('User not found');
        setIsLoading(false);
        return;
      }

      // Get galaxy ID
      const uri = `/project/issues?galaxy=${galaxyId}`;

      // Call obtain sunshines action
      const result = await actions.obtainSunshines({
        galaxyId,
        userId: currentUser._id.toString(),
        email: demo.email,
      });

      if (result.data?.success && result.data) {
        setDialogData({
          sunshines: result.data.sunshines || 0,
          totalSunshines: result.data.totalSunshines || 0,
          galaxyId,
          projectName,
          uri,
        });
        setShowDialog(true);
        // Update step in local state
        setDemoStep(1);
      } else {
        const error = result.data?.error || result.error || 'Failed to obtain sunshines';
        console.error('Failed to obtain sunshines:', error);
        alert(error);
      }
    } catch (error) {
      console.error('Error obtaining sunshines:', error);
      alert('An error occurred while obtaining sunshines');
    } finally {
      setIsLoading(false);
    }
  };

  // Show "Obtain Sunshines" if step is undefined or 0
  const shouldShowObtainSunshines = demoStep === undefined || demoStep === 0;

  // Don't render if still loading step
  if (isLoadingStep) {
    return (
      <DemoAuthPanel>
        <div className="w-full max-w-md mx-auto mt-1 p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </DemoAuthPanel>
    );
  }

  return (
    <>
      {shouldShowObtainSunshines && <DemoAuthPanel>
        <motion.div
          className={cn(
            "relative w-full max-w-md mx-auto mt-1",
            "backdrop-blur-md bg-white/20 dark:bg-slate-900/20",
            "border border-slate-200/30 dark:border-slate-700/30",
            "rounded-lg p-6",
            "transition-all duration-300",
            "hover:bg-white/30 dark:hover:bg-slate-900/30",
            "hover:border-slate-300/50 dark:hover:border-slate-600/50",
            "hover:shadow-xl hover:shadow-blue-500/20"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            scale: isHovered ? 1.02 : 1,
            y: isHovered ? -4 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Animated gradient overlay on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Title with Info Badge */}
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                Join this open source project
              </h3>
              <Tooltip content={tooltipContent}>
                <span className="flex items-center gap-1 cursor-help">
                  {getIcon({ iconType: 'info', className: 'w-4 h-4' })}
                </span>
              </Tooltip>
            </div>

            {/* Hint text with badge */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 h-6">
              <Badge>demo</Badge> donating
              <NumberFlow value={50} locales="en-US" format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }} /> to '{projectName}' maintainer.
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full text-shadow-lg"
              onClick={handleObtainSunshines}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Obtain Sunshines'}
            </Button>
          </div>
        </motion.div>
      </DemoAuthPanel>}

      {/* Success Dialog */}
      {showDialog && dialogData && (
        <ObtainSunshinesDialog
          isOpen={showDialog}
          sunshines={dialogData.sunshines}
          totalSunshines={dialogData.totalSunshines}
          galaxyId={dialogData.galaxyId}
          projectName={dialogData.projectName}
          uri={dialogData.uri}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default ProjectCTAPanel;

