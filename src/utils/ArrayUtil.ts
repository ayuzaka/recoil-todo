type BaseArray = {
  id: string
}

export const replaceItemAtIndex = <T extends BaseArray>(list: T[], id: string, newValue: T): T[] =>
  list.map((item) => item.id === id ? newValue : item)

export const removeItemAtIndex = <T extends BaseArray>(list: T[], id: string): T[] =>
  list.filter((item) => item.id !== id)
