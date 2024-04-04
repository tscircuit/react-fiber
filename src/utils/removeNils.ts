export const removeNils = <T>(
  obj: T
): {
  [K in keyof T]: NonNullable<T[K]>
} => {
  const newObj = {} as any
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
