/**
 * Formats a "YYYY-MM" string as a localized month and year: "September 2026" / "سبتمبر 2026".
 * Arabic is pinned to the Gregorian calendar with Western digits so it matches the rest of the
 * site (a bare `ar-SA` would switch to the Hijri calendar). UTC keeps SSR and hydration in sync.
 */
export function formatMonthYear(yearMonth: string, locale: string): string {
  const [year = 1970, month = 1] = yearMonth.split('-').map(Number)
  const intlLocale = locale === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)))
}
