// Simple analytics tracking for platform clicks
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

class AnalyticsService {
  private clicks: PlatformClickEvent[] = []
  private readonly MAX_CLICKS = 1000

  async trackPlatformClick(event: Omit<PlatformClickEvent, 'timestamp'>): Promise<void> {
    const clickEvent: PlatformClickEvent = {
      ...event,
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof window !== 'undefined' ? window.document.referrer : undefined,
    }

    // Add to local storage for persistence
    this.addToLocalStorage(clickEvent)

    // Also send to server if available
    try {
      await this.sendToServer(clickEvent)
    } catch (error) {
      console.error('Failed to send analytics to server:', error)
    }
  }

  private addToLocalStorage(clickEvent: PlatformClickEvent): void {
    try {
      // Get existing clicks from localStorage
      const existingClicks = this.getClicksFromStorage()

      // Add new click
      existingClicks.push(clickEvent)

      // Keep only the most recent clicks
      const recentClicks = existingClicks.slice(-this.MAX_CLICKS)

      // Save to localStorage
      localStorage.setItem('platform_clicks', JSON.stringify(recentClicks))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  private getClicksFromStorage(): PlatformClickEvent[] {
    try {
      const stored = localStorage.getItem('platform_clicks')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return []
    }
  }

  private async sendToServer(clickEvent: PlatformClickEvent): Promise<void> {
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clickEvent),
      })
    } catch (error) {
      console.error('Failed to send analytics to server:', error)
    }
  }

  getClicks(): PlatformClickEvent[] {
    return this.getClicksFromStorage()
  }

  getClicksByTrack(trackId: string): PlatformClickEvent[] {
    const allClicks = this.getClicks()
    return allClicks.filter(click => click.trackId === trackId)
  }

  getClicksByPlatform(platform: string): PlatformClickEvent[] {
    const allClicks = this.getClicks()
    return allClicks.filter(click => click.platform === platform)
  }

  getStats(): {
    totalClicks: number
    clicksByTrack: Record<string, number>
    clicksByPlatform: Record<string, number>
    clicksByDate: Record<string, number>
    recentClicks: PlatformClickEvent[]
  } {
    const allClicks = this.getClicks()

    const stats = {
      totalClicks: allClicks.length,
      clicksByTrack: {} as Record<string, number>,
      clicksByPlatform: {} as Record<string, number>,
      clicksByDate: {} as Record<string, number>,
      recentClicks: allClicks.slice(-10)
    }

    allClicks.forEach(click => {
      // Track by track
      stats.clicksByTrack[click.trackId] = (stats.clicksByTrack[click.trackId] || 0) + 1

      // Track by platform
      stats.clicksByPlatform[click.platform] = (stats.clicksByPlatform[click.platform] || 0) + 1

      // Track by date
      const date = new Date(click.timestamp).toISOString().split('T')[0]
      stats.clicksByDate[date] = (stats.clicksByDate[date] || 0) + 1
    })

    return stats
  }

  clearData(): void {
    try {
      localStorage.removeItem('platform_clicks')
      this.clicks = []
    } catch (error) {
      console.error('Failed to clear analytics data:', error)
    }
  }
}

export const analyticsService = new AnalyticsService()