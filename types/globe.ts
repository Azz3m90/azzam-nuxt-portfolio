/** A single label orbiting the hero globe. */
export interface GlobeItem {
  label: string
  kind: 'skill' | 'project'
  /** When set, the chip renders as a link (used for featured projects). */
  to?: string
}
