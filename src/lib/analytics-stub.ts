// SSR-safe stub to fix localStorage issue
export interface PlatformClickEvent {
  trackId: string
  trackName: string
  artistName: string
  platform: string
  platformName: string
  url: string
  timestamp: number
  userAgent: string
  referrer?: string
  country?: string
}

export const analyticsService = {
  trackPlatformClick: async (): Promise<void> => {},
  getClicks: (): PlatformClickEvent[] => [],
  getClicksByTrack: (): PlatformClickEvent[] => [],
  getClicksByPlatform: (): PlatformClickEvent[] => [],
  getStats: () => ({
    totalClicks: 0,
    clicksByTrack: {},
    clicksByPlatform: {},
    clicksByDate: {},
    recentClicks: []
  }),
  clearData: (): void => {}
}