import React, { useEffect, useState } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, FloatingPortal } from '@floating-ui/react';
import Button from '@/components/custom-ui/Button';
import EditableCodeBlock from './EditableCodeBlock';
import { generatePersonalizationCode } from '@/client-side/personalization';

interface GalaxyLayoutTestModePopoverProps {
  isOpen: boolean;
  code: string;
  prompt: string;
  uris?: string[];
  onCodeChange: (code: string) => void;
  onUrisChange: (uris: string[]) => void;
  onRegenerate?: (code: string, uris: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
  anchorElement?: HTMLElement | null;
}

const GalaxyLayoutTestModePopover: React.FC<GalaxyLayoutTestModePopoverProps> = ({
  isOpen,
  code,
  prompt,
  uris = [],
  onCodeChange,
  onUrisChange,
  onRegenerate,
  onSave,
  onCancel,
  anchorElement,
}) => {
  const [editableUris, setEditableUris] = useState<string[]>(uris);
  const [newUri, setNewUri] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: 'right-start',
    whileElementsMounted: isOpen ? autoUpdate : undefined,
    middleware: [
      offset({ mainAxis: 420, crossAxis: 0 }), // Position to the right of settings popover (settings is ~400px wide)
      flip(),
      shift({ padding: 8 }),
    ],
  });

  useEffect(() => {
    setEditableUris(uris);
  }, [uris]);

  useEffect(() => {
    if (anchorElement && isOpen) {
      refs.setReference(anchorElement);
    }
  }, [anchorElement, isOpen, refs]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  const handleAddUri = () => {
    if (newUri.trim() && !editableUris.includes(newUri.trim())) {
      const updated = [...editableUris, newUri.trim()];
      setEditableUris(updated);
      onUrisChange(updated);
      console.log('URI added:', newUri.trim(), 'Updated URIs:', updated);
      setNewUri('');
    }
  };

  const handleRemoveUri = (uriToRemove: string) => {
    const updated = editableUris.filter(uri => uri !== uriToRemove);
    setEditableUris(updated);
    onUrisChange(updated);
    console.log('URI removed:', uriToRemove, 'Updated URIs:', updated);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const componentStructure = ['GalaxyZoomControls', 'GalacticMeasurements', 'GalaxyNavigationDialog', 'AllStarsLink'];
      const result = await generatePersonalizationCode(
        prompt,
        'GalaxyLayoutBody',
        componentStructure
      );

      if (result.success && result.code) {
        const newUris = result.uris || editableUris;
        setEditableUris(newUris);
        onCodeChange(result.code);
        onUrisChange(newUris);
        if (onRegenerate) {
          onRegenerate(result.code, newUris);
        }
      }
    } catch (error) {
      console.error('Error regenerating code:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!isOpen || !anchorElement) return null;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="absolute z-[100] pointer-events-auto"
      >
        <div
          className="w-[500px] max-h-[80vh] p-6 backdrop-blur-xl bg-white/20 dark:bg-slate-900/20 border border-blue-500/30 dark:border-blue-400/30 shadow-2xl shadow-blue-500/20 rounded-lg overflow-y-auto relative"
        >
          {/* Futuristic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-lg pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-blue-300 dark:text-blue-400 mb-2">
                Your setting
              </h3>
            </div>

            {/* Prompt Display */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-blue-300 dark:text-blue-400">
                Prompt:
              </h4>
              <div className="p-3 bg-slate-800/50 dark:bg-slate-900/50 border border-blue-500/30 dark:border-blue-400/30 rounded-lg text-sm text-slate-200 dark:text-slate-300">
                {prompt}
              </div>
            </div>

            {/* Regenerate Button */}
            <div>
              <Button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                variant="secondary"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                {isRegenerating ? 'Regenerating...' : 'Regenerate Code'}
              </Button>
            </div>

            {/* Editable Code Block */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-blue-300 dark:text-blue-400">
                JavaScript Code:
              </h4>
              <EditableCodeBlock
                code={code}
                language="javascript"
                onCodeChange={onCodeChange}
                onApply={onCodeChange}
              />
            </div>

            {/* Editable URIs List */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-blue-300 dark:text-blue-400">
                Applies to:
              </h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {editableUris.map((uri, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-500/20 dark:bg-blue-400/20 border border-blue-500/30 dark:border-blue-400/30 rounded text-blue-200 dark:text-blue-300 flex items-center gap-1"
                    >
                      {uri}
                      <button
                        onClick={() => handleRemoveUri(uri)}
                        className="ml-1 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Remove URI"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUri}
                    onChange={(e) => setNewUri(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddUri();
                      }
                    }}
                    placeholder="Add URI (e.g., /project or /all-stars)"
                    className="flex-1 px-3 py-1.5 text-xs border border-blue-500/30 dark:border-blue-400/30 rounded-lg backdrop-blur-sm bg-white/10 dark:bg-slate-800/30 text-slate-200 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  />
                  <Button
                    onClick={handleAddUri}
                    variant="secondary"
                    size="sm"
                    className="bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={onSave}
                variant="primary"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                Save
              </Button>
              <Button
                onClick={onCancel}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default GalaxyLayoutTestModePopover;
