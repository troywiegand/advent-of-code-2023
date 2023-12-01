import { parseLines, readInput } from 'io'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)
  const wordlessLines = lines.map((l) => {
    return l.replace(/\D/g, '')
  })
  const calibrationValues = wordlessLines.map((wll: string) => {
    return Number.parseInt((wll.at(0) || '') + (wll.at(-1) || ''))
  })
  return calibrationValues.reduce((pv, cv) => pv + cv)
}

export const part2 = () => {
  const lines = parseLines(input)
  const noNumberWordsLines = lines.map((l) => {
    return l
      .replace(/one/g, 'o1e')
      .replace(/two/g, 't2o')
      .replace(/three/g, 't3e')
      .replace(/four/g, 'f4r')
      .replace(/five/g, 'f5e')
      .replace(/six/g, 's6x')
      .replace(/seven/g, 's7n')
      .replace(/eight/g, 'e8t')
      .replace(/nine/g, 'n9e')
  })
  const wordlessLines = noNumberWordsLines.map((l) => {
    return l.replace(/\D/g, '')
  })
  const calibrationValues = wordlessLines.map((wll: string) => {
    return Number.parseInt((wll.at(0) || '') + (wll.at(-1) || ''))
  })
  return calibrationValues.reduce((pv, cv) => pv + cv)
}
