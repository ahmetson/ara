import React, { useState, useRef, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/animate-ui/components/radix/popover';
import GalaxyLayoutSettingsPopover from './GalaxyLayoutSettingsPopover';

interface GalaxyLayoutSettingsButtonProps {
  onTestModeChange?: (isTestMode: boolean) => void;
  onCodeGenerated?: (code: string, prompt: string, uris?: string[]) => void;
  onLoadPersonalization?: (personalization: any) => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  isTestMode?: boolean;
}

const GalaxyLayoutSettingsButton: React.FC<GalaxyLayoutSettingsButtonProps> = ({
  onTestModeChange,
  onCodeGenerated,
  onLoadPersonalization,
  buttonRef: externalButtonRef,
  isTestMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRef = externalButtonRef || internalButtonRef;

  // Prevent closing when in test mode
  const handleOpenChange = (open: boolean) => {
    if (isTestMode && !open) {
      // Don't allow closing when in test mode
      return;
    }
    setIsOpen(open);
  };

  // Keep popover open when test mode is active
  useEffect(() => {
    if (isTestMode && !isOpen) {
      setIsOpen(true);
    }
  }, [isTestMode, isOpen]);

  return (
    <div className={`${isTestMode ? 'absolute' : 'fixed'} bottom-32 left-[300px] z-50`}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={buttonRef}
            type="button"
            className="relative w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 
                       flex items-center justify-center
                       shadow-lg hover:shadow-xl transition-shadow
                       border border-blue-400 dark:border-blue-300
                       cursor-pointer
                       animate-pulse"
            aria-label="Galaxy Layout Settings"
            title="Settings of the GalaxyLayoutBody"
            style={{
              boxShadow: '0 0 4px rgba(59, 130, 246, 0.5), 0 0 8px rgba(59, 130, 246, 0.3), 0 0 12px rgba(59, 130, 246, 0.2)',
            }}
          >
            {/* Robot Icon */}
            <svg
              className="w-2 h-2 text-white pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-96 max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-white/20 dark:bg-slate-900/20 border border-blue-500/30 dark:border-blue-400/30 shadow-2xl shadow-blue-500/20 ${isTestMode ? 'pointer-events-auto' : ''}`}
          align="start"
          onPointerDownOutside={(e) => {
            if (isTestMode) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (isTestMode) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (isTestMode) {
              e.preventDefault();
            }
          }}
        >
          <GalaxyLayoutSettingsPopover
            onTestModeChange={onTestModeChange}
            onCodeGenerated={onCodeGenerated}
            onLoadPersonalization={onLoadPersonalization}
            onClose={() => {
              if (!isTestMode) {
                setIsOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GalaxyLayoutSettingsButton;
