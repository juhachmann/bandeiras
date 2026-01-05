// Business logic - platform agnostic

export const randomize = (data: Array<any>) : Array<any> => {
  return data
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

