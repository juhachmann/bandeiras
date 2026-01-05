// Business logic - platform agnostic

export const shuffleArray = (data: Array<any>) : Array<any> => {
  return data
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

