import getPlaceValue from "../getPlaceValue"

test("base 10", () => {
  expect(getPlaceValue(1, 1, 10)).toEqual(1)
  expect(getPlaceValue(12, 1, 10)).toEqual(2)
  expect(getPlaceValue(123, 1, 10)).toEqual(3)

  expect(getPlaceValue(1, 10, 10)).toEqual(0)
  expect(getPlaceValue(12, 10, 10)).toEqual(1)
  expect(getPlaceValue(123, 10, 10)).toEqual(2)

  expect(getPlaceValue(12345, 100, 10)).toEqual(3)
  expect(getPlaceValue(123456, 100, 10)).toEqual(4)
  expect(getPlaceValue(1234567, 100, 10)).toEqual(5)
})

test("base 2", () => {
  expect(getPlaceValue(1, 1, 2)).toEqual(1)
  expect(getPlaceValue(12, 1, 2)).toEqual(0)
  expect(getPlaceValue(123, 1, 2)).toEqual(1)

  expect(getPlaceValue(1, 2, 2)).toEqual(0)
  expect(getPlaceValue(2, 2, 2)).toEqual(1)
  expect(getPlaceValue(4, 2, 2)).toEqual(0)
  expect(getPlaceValue(6, 2, 2)).toEqual(1)
  expect(getPlaceValue(12, 2, 2)).toEqual(0)
  expect(getPlaceValue(14, 2, 2)).toEqual(1)

  expect(getPlaceValue(4, 4, 2)).toEqual(1)
  expect(getPlaceValue(6, 4, 2)).toEqual(1)
  expect(getPlaceValue(8, 4, 2)).toEqual(0)
  expect(getPlaceValue(14, 4, 2)).toEqual(1)
  expect(getPlaceValue(16, 4, 2)).toEqual(0)
  expect(getPlaceValue(18, 4, 2)).toEqual(0)
  expect(getPlaceValue(20, 4, 2)).toEqual(1)
  expect(getPlaceValue(22, 4, 2)).toEqual(1)
})
