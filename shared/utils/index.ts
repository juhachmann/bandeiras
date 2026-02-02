// Business logic - platform agnostic

export const shuffleArray = (data: any[]) : any[] => {
  return data
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const factorial = (n: number): number => {
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}