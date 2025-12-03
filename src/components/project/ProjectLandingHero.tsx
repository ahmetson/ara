import React from 'react';
import BlurText from '@/components/BlurText';
import { ProjectInfoProps } from './ProjectLink';
import { getIcon } from '@/components/icon';
import NumberFlow from '@number-flow/react';

interface ProjectLandingHeroProps {
  projectData: ProjectInfoProps;
}

const ProjectLandingHero: React.FC<ProjectLandingHeroProps> = ({ projectData }) => {
  const { title, rating, description } = projectData;
  const { sunshines, stars } = rating;

  // Calculate energy percentage (same logic as ProjectRating)
  const sunshinesToStar = 360;
  const totalSunshines = sunshines || 0;
  const totalStars = stars || 0;
  const shinesInStars = totalStars * sunshinesToStar;
  const energyPercentage = totalSunshines > 0 ? ((shinesInStars / totalSunshines) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      {/* Project Title with Blur Text Animation */}
      <div className="w-full max-w-4xl">
        <BlurText
          text={title}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-800 dark:text-slate-200 justify-center"
          animateBy="words"
          direction="top"
          delay={100}
        />
      </div>

      {/* Icons for Sunshines, Stars, and Energy */}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {sunshines !== undefined && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/20">
            {getIcon({ iconType: 'sunshine', className: 'w-6 h-6 text-yellow-500' })}
            <NumberFlow
              value={sunshines}
              locales="en-US"
              format={{ style: 'decimal', maximumFractionDigits: 0 }}
              className="text-lg font-semibold text-slate-800 dark:text-slate-200"
            />
          </div>
        )}
      </div>

      {/* Description as Subtitle */}
      {description && (
        <div className="w-full max-w-2xl">
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectLandingHero;

