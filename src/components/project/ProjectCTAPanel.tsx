import React, { useMemo } from 'react';
import ProjectCTAStepPanel from './ProjectCTAStepPanel';
import { authClient } from '@/client-side/auth';

interface ProjectCTAPanelProps {
  galaxyId: string;
  projectName: string;
}

const ProjectCTAPanel: React.FC<ProjectCTAPanelProps> = ({ galaxyId, projectName }) => {
  const { isPending } = authClient.useSession();

  // Define steps content
  const stepsContent = useMemo(() => [
    {
      // Step 1: Create Issue
      title: 'Create an issue',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Create an issue to collaborate with the maintainer on the project.</p>
        </div>
      ),
      hintText: (
        <>
          Create an issue for '{projectName}' project.
        </>
      ),
      buttonText: 'Go to Issues',
      buttonLoadingText: 'Loading...',
      uri: `/project/issues?galaxy=${galaxyId}`,
    },
    {
      // Step 2: Assign Contributor
      title: 'Assign a contributor',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>As a maintainer, assign a contributor to work on the issue you created.</p>
        </div>
      ),
      hintText: (
        <>
          Assign a contributor to work on '{projectName}' issues.
        </>
      ),
      buttonText: 'Go to Issues',
      buttonLoadingText: 'Loading...',
      uri: `/project/issues?galaxy=${galaxyId}`,
    },
    {
      // Step 3: Create Version
      title: 'Create version',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Create a new version in the roadmap to organize your work.</p>
        </div>
      ),
      hintText: (
        <>
          Create a version for '{projectName}' project.
        </>
      ),
      buttonText: 'Go to Roadmap',
      buttonLoadingText: 'Loading...',
      uri: `/project/roadmap?galaxy=${galaxyId}`,
    },
    {
      // Step 4: Patch Issue
      title: 'Patch issue',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Move the issue to the patcher to create a patch for it.</p>
        </div>
      ),
      hintText: (
        <>
          Patch issue for '{projectName}' project.
        </>
      ),
      buttonText: 'Go to Roadmap',
      buttonLoadingText: 'Loading...',
      uri: `/project/roadmap?galaxy=${galaxyId}`,
    },
    {
      // Step 5: Complete Version
      title: 'Complete version',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Mark all patches as complete and mark the version as complete.</p>
        </div>
      ),
      hintText: (
        <>
          Complete '{projectName}' version.
        </>
      ),
      buttonText: 'Go to Roadmap',
      buttonLoadingText: 'Loading...',
      uri: `/project/roadmap?galaxy=${galaxyId}`,
    },
    {
      // Step 6: Test Version
      title: 'Test version',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Test the patched issue in the version.</p>
        </div>
      ),
      hintText: (
        <>
          Test the '{projectName}' version.
        </>
      ),
      buttonText: 'Go to Roadmap',
      buttonLoadingText: 'Loading...',
      uri: `/project/roadmap?galaxy=${galaxyId}`,
    },
    {
      // Step 7: Release
      title: 'Release',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Release the tested version to make it available.</p>
        </div>
      ),
      hintText: (
        <>
          Release '{projectName}' version.
        </>
      ),
      buttonText: 'Go to Roadmap',
      buttonLoadingText: 'Loading...',
      uri: `/project/roadmap?galaxy=${galaxyId}`,
    },
    {
      // Step 8: Place Star in Galaxy
      title: 'Place your star in the galaxy',
      tooltipContent: (
        <div className="text-sm max-w-xs">
          <p>Place your star in the galaxy to show your contribution.</p>
        </div>
      ),
      hintText: (
        <>
          Place your star in the '{projectName}' galaxy.
        </>
      ),
      buttonText: 'Place Star',
      buttonLoadingText: 'Loading...',
      uri: `/project?galaxy=${galaxyId}&place=true`,
    },
  ], [galaxyId, projectName]);

  // For now, show the first step (Create Issue)
  // In the future, this could be based on user progress
  const stepContent = stepsContent[0];

  // Don't render if still loading session
  if (isPending) {
    return (
      <div className="w-full max-w-md mx-auto mt-1 p-6 text-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {stepContent && (
        <ProjectCTAStepPanel
          title={stepContent.title}
          tooltipContent={stepContent.tooltipContent}
          hintText={stepContent.hintText}
          buttonText={stepContent.buttonText}
          buttonLoadingText={stepContent.buttonLoadingText}
          uri={stepContent.uri}
          isLoading={false}
          disabled={false}
        />
      )}

    </>
  );
};

export default ProjectCTAPanel;
