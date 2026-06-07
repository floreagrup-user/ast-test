export {}

declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void
      set: (key: string, value: unknown) => void
      consent: (prefs: Record<string, { enabled: boolean }>) => void
    }
  }
}
