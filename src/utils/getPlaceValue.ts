/**
 * Get the place value from a number
 * Ex if the number is 123, and the place is tens, return 2
 * @param  number ie 123
 * @param  factor ie 10
 * @param  base   ie 10
 * @return        ie 2
 */
export default function getPlaceValue(
  number: number,
  factor: number,
  base: number,
) {
  console.log(Math.floor(number / factor) % base, number, factor, base)
  return Math.floor(number / factor) % base
}
