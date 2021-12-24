const oneDayInMilliseconds = 86400000
const now = new Date().getTime()

/**
 * This method returns the day in milliseconds from now
 * Eg. 1638392894000
 * @param  {number} days
 * @returns number
 */
export function getTimeInMilliseconds(days: number): number {
   return now + oneDayInMilliseconds * days
}
