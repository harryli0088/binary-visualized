/**
 * round the given value to the cloest multiple of nearest
 * @param  value   value to be rounded
 * @param  nearest nearest multiple-of to be rounded to
 * @return         rounded value
 */
export default function roundToNearest(
  value: number,
  nearest: number,
) {
  return nearest * Math.round(value / nearest)
}
