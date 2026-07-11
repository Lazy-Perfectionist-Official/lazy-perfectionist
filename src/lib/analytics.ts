// SSR-safe analytics tracking for platform clicks
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

// Temporarily disabled to fix SSR issues
export const analyticsService = {
  trackPlatformClick: async (): Promise<void> => {
    // Analytics temporarily disabled for SSR debugging
  },
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
  clearData: (): void => {
    // Analytics temporarily disabled for SSR debugging
  }
}