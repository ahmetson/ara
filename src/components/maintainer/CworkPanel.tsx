import React from 'react'
import type { TabProps } from '@/components/Tabs';
import ProjectListPanel from '../project/ProjectListPanel';
import { ProjectInfoProps } from '../project/ProjectLink';

const CworkPanel: React.FC = () => {
  const mockProjects: ProjectInfoProps[] = [
    {
      uri: '/project',
      title: 'React Dashboard',
      isInfluencer: true,
      rating: {
        sunshines: 2880,
        stars: 8.0
      },
      forks: 124,
      likes: 89,
      isFollowing: true,
      followers: 45,
      originalProject: 'facebook/react',
      originalProjectUrl: 'https://github.com/facebook/react',
      issue: '#1234 - Dashboard Enhancement',
      description: 'A modern React dashboard with TypeScript, Tailwind CSS, and real-time data visualization capabilities.',
      license: 'MIT License',
      version: 'v1.2.0',
      balance: 2450,
      cascadeBalance: 1200,
      totalAmount: 3650,
      duration: '6 months',
      lastActivity: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      totalCommits: 1234,
      commitsPerDay: '12.5',
      openIssues: 8,
      closedIssues: 156,
      avgResponseTime: '2.3 hours',
      createdTime: Date.now() - 2 * 365 * 24 * 60 * 60 * 1000, // 2 years ago
      author: {
        uri: '/profile/john-doe',
        children: 'John Doe',
        icon: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        rating: {
          ratingType: 'maintainer',
          lvl: 9,
          maxLvl: 10,
          top: 5
        }
      },
      influencers: [
        {
          uri: '/profile/jane-smith',
          children: 'Jane Smith',
          icon: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          rating: {
            ratingType: 'influencer',
            lvl: 7,
            maxLvl: 10,
            top: 12
          }
        },
        {
          uri: '/profile/mike-johnson',
          children: 'Mike Johnson',
          icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
          rating: {
            ratingType: 'contributor',
            lvl: 6,
            maxLvl: 10,
            top: 25
          }
        }
      ],
      collaborators: []
    }
  ]

  // const tabs: TabProps[] = [
  //   {
  //     label: 'Dependencies',
  //     key: "dependencies",
  //     content: <ProjectListPanel projects={mockProjects} />
  //   },
  // import IssueList from '@/components/issue/IssueListPanel'
  // {
  //   label: 'Following Issues',
  //   key: "following-issues",
  //   content: <IssueListPanel />
  // },
  // import ProfileList from '@/components/maintainer/ProfileListPanel'
  // {
  //   label: 'Following Rockstars',
  //   key: "following-rockstars",
  //   content: <ProfileListPanel />
  // }
  // ]

  return (
    // <Tabs id="cwork" activeTab='dependencies' tabs={tabs} />
    <ProjectListPanel projects={mockProjects} />
  )
}

export default CworkPanel
