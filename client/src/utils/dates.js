export function isExpiredDate(targetDate) {
  const currentDate = new Date()
  return targetDate < currentDate
}
