import { parseLines, readInput } from 'io'
import { debugArray, sum } from 'utils'

const input = await readInput('day-04')

const lines = parseLines(input)
const winningNumbers = lines.map((x) => x.split(':')[1].trim().split('|')[0].trim().split(/\s+/g))
const cardValues = lines.map((x) => x.split(':')[1].trim().split('|')[1].trim().split(/\s+/g))

export const part1 = () => {
  const scores = winningNumbers.map((x, i) => {
    let scoredNumbers = -1
    x.forEach((y) => {
      if (cardValues[i].includes(y)) {
        scoredNumbers += 1
      }
    })
    return scoredNumbers >= 0 ? 2 ** scoredNumbers : 0
  })
  return sum(scores)
}

export const part2 = () => {
  const cardCopies = Array(lines.length).fill(1)
  winningNumbers.forEach((x, i) => {
    Array.from(Array(cardCopies[i]), () => 1).forEach((_) => {
      let scoredNumbers = 0
      x.forEach((y) => {
        if (cardValues[i].includes(y)) {
          scoredNumbers += 1
          cardCopies[i + scoredNumbers] += 1
        }
      })
    })
  })
  return sum(cardCopies)
}
