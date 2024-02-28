export function flattenArray(arr: Record<string, any>[], childProp: string) {
  const result: object[] = []
  return arr.reduce((result, item) => {
    const { [childProp]: toFlatten, ...rest } = item
    result.push(rest)
    if (toFlatten && toFlatten.length) result = result.concat(flattenArray(toFlatten, childProp))
    return result
  }, result)
}