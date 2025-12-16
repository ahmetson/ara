import React, { useState, useEffect } from 'react';
import Button from '@/components/custom-ui/Button';
import {
  getPersonalizations,
  generatePersonalizationCode,
  deletePersonalization,
} from '@/client-side/personalization';
import type { Personalization } from '@/types/personalization';

const GALAXY_LAYOUT_ELEMENTS = [
  { name: 'GalaxyZoomControls', description: 'Zoom controls for the galaxy view' },
  { name: 'GalacticMeasurements', description: 'Measurements and grid display' },
  { name: 'GalaxyNavigationDialog', description: 'Navigation dialog when zoomed out' },
  { name: 'AllStarsLink', description: 'Link to all stars page' },
];

interface GalaxyLayoutSettingsPopoverProps {
  onTestModeChange?: (isTestMode: boolean) => void;
  onCodeGenerated?: (code: string, prompt: string, uris?: string[]) => void;
  onLoadPersonalization?: (personalization: Personalization) => void;
  onClose?: () => void;
}

const GalaxyLayoutSettingsPopover: React.FC<GalaxyLayoutSettingsPopoverProps> = ({
  onTestModeChange,
  onCodeGenerated,
  onLoadPersonalization,
  onClose,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<Personalization[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const personalizations = await getPersonalizations('GalaxyLayoutBody');
    setHistory(personalizations);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const componentStructure = GALAXY_LAYOUT_ELEMENTS.map((e) => e.name);
      const result = await generatePersonalizationCode(
        prompt,
        'GalaxyLayoutBody',
        componentStructure
      );

      if (result.success && result.code) {
        onCodeGenerated?.(result.code, prompt, result.uris);
        onTestModeChange?.(true);
        setPrompt('');
      } else {
        setError(result.error || 'Failed to generate code');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (personalizationId: string) => {
    const success = await deletePersonalization(personalizationId);
    if (success) {
      loadHistory();
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Futuristic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-lg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Galaxy Layout Settings
        </h3>

        {/* Element List */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-blue-300 dark:text-blue-400">Available Elements:</h4>
          <div className="space-y-2">
            {GALAXY_LAYOUT_ELEMENTS.map((element) => (
              <div
                key={element.name}
                className="text-xs p-3 backdrop-blur-sm bg-white/10 dark:bg-slate-800/30 rounded-lg border border-blue-500/20 dark:border-blue-400/20 hover:bg-white/20 dark:hover:bg-slate-800/40 transition-all"
              >
                <div className="font-mono font-semibold text-blue-200 dark:text-blue-300">{element.name}</div>
                <div className="text-slate-300 dark:text-slate-400 mt-1">
                  {element.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-blue-300 dark:text-blue-400">Customize with AI:</h4>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., set zoom at 50% by default, but if I see the 'Ara App' project, then set the zoom at 10%"
            className="w-full p-3 border border-blue-500/30 dark:border-blue-400/30 rounded-lg text-sm resize-none backdrop-blur-sm bg-white/10 dark:bg-slate-800/30 text-slate-200 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            rows={3}
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="mt-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-none shadow-lg shadow-blue-500/30"
          >
            {isGenerating ? 'Generating...' : 'Generate Code'}
          </Button>
          {error && (
            <div className="mt-2 text-sm text-red-400 dark:text-red-300 bg-red-500/10 border border-red-500/30 rounded p-2">
              {error}
            </div>
          )}
        </div>

        {/* History */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-blue-300 dark:text-blue-400">History:</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No saved customizations</div>
            ) : (
              history.map((item) => (
                <div
                  key={item._id}
                  className="p-3 backdrop-blur-sm bg-white/10 dark:bg-slate-800/30 rounded-lg border border-blue-500/20 dark:border-blue-400/20 hover:bg-white/20 dark:hover:bg-slate-800/40 transition-all text-xs"
                >
                  <button
                    onClick={() => onLoadPersonalization?.(item)}
                    className="font-semibold mb-1 text-blue-200 dark:text-blue-300 hover:text-blue-100 dark:hover:text-blue-200 cursor-pointer text-left w-full hover:underline transition-colors"
                  >
                    {item.prompt}
                  </button>
                  <div className="text-slate-300 dark:text-slate-400 mb-1">
                    {new Date(item.createdTime).toLocaleString()}
                  </div>
                  <div className="text-slate-300 dark:text-slate-400 mb-2">
                    URIs: {item.uris.join(', ')}
                  </div>
                  <Button
                    onClick={() => item._id && handleDelete(item._id)}
                    variant="secondary"
                    size="sm"
                    className="text-xs bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyLayoutSettingsPopover;
