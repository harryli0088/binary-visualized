import roundToNearest from "../roundToNearest"

test("neartest of 1", () => {
  expect(roundToNearest(-10.6,1)).toEqual(-11)
  expect(roundToNearest(-10.5,1)).toEqual(-10)
  expect(roundToNearest(-10,1)).toEqual(-10)
  expect(roundToNearest(-7.3,1)).toEqual(-7)
  expect(roundToNearest(0,1)).toEqual(0)
  expect(roundToNearest(1,1)).toEqual(1)
  expect(roundToNearest(1.5,1)).toEqual(2)
  expect(roundToNearest(3.75,1)).toEqual(4)
})

test("neartest of 7", () => {
  expect(roundToNearest(-12.6,7)).toEqual(-14)
  expect(roundToNearest(-10.5,7)).toEqual(-7)
  expect(roundToNearest(-10,7)).toEqual(-7)
  expect(roundToNearest(-7.3,7)).toEqual(-7)
  expect(roundToNearest(0,7)).toEqual(0)
  expect(roundToNearest(1,7)).toEqual(0)
  expect(roundToNearest(1.5,7)).toEqual(0)
  expect(roundToNearest(3.75,7)).toEqual(7)
  expect(roundToNearest(27.8,7)).toEqual(28)
})
