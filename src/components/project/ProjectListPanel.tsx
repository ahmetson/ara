import React from 'react'
import FilterableList from '@/components/list/FilterableList'
import ProjectCard, { type ProjectInfoProps } from '@/components/project/ProjectLink'
import Badge from '../badge/Badge'
import { FilterOption } from '@/components/list/FilterToggle'
import BasePanel from '../panel/Panel'
import { getIcon } from '../icon'

interface Props {
  projects: ProjectInfoProps[]
}

const projectFilters: FilterOption[] = [
  {
    id: 'all',
    label: 'All',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'explore',
    label: 'Explore',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'my-projects',
    label: 'My Projects',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'following',
    label: 'Following',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'recommended',
    label: 'Recommended',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'by-issue',
    label: 'By Issue...',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'by-user',
    label: 'By User...',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  },
  {
    id: 'fork-of',
    label: 'Fork of...',
    sortIds: [
      { id: 'rating', label: 'Rating' },
      { id: 'date', label: 'Date' },
      { id: 'popularity', label: 'Popularity' },
      { id: 'forks', label: 'Forks' },
      { id: 'likes', label: 'Likes' }
    ]
  }
]

const ProjectsSection: React.FC<Props> = ({ projects }) => {
  const title = (
    <div className="flex items-center gap-2">
      <span className="mt-1">Dependencies</span>
      <Badge variant="gray" static={true}>{projects.length}</Badge>
    </div>
  )

  return (
    <BasePanel>
      <FilterableList
        items={projects}
        itemComponent={ProjectCard}
        filters={projectFilters}
        title={title}
        searchPlaceholder="Search projects..."
        searchableFields={['title', 'description', 'issue', 'originalProject']}
        showNumber={false}
      >
        <div className="flex items-center gap-2">
          {getIcon('info')}<span className="">Third party packages you used in your project. Imported using SBOM. Contact and send request to them.</span>
        </div>
      </FilterableList>
    </BasePanel>
  )
}

export default ProjectsSection
