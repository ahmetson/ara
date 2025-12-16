export interface Patch {
  id: string
  completed: boolean
  tested?: boolean
  title: string
  sunshines?: number
}

export interface Version {
  _id?: string
  galaxy: string
  tag: string
  createdTime: number
  status: 'complete' | 'testing' | 'release' | 'archived'
  patches: Patch[]
  maintainer: string
}

export const ROADMAP_EVENT_TYPES = {
  VERSION_CREATED: 'version-created',
  VERSION_RELEASED: 'version-released',
} as const

export interface VersionReleasedEventDetail {
  versionId: string
  tag: string
  galaxyId: string
}

