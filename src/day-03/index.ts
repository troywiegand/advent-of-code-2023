import { parseLines, readInput } from 'io'
import { debugArray, sum } from 'utils'

type GridPos = { i: number; j: number }

type GridGears = { pos: GridPos; part: number }

const input = await readInput('day-03')

let usedSymbols: string[] = []

const checkNearbySymbols = (grid: string[][], row: number, column: number) => {
  const rangeArray = [-1, 0, 1]
  return rangeArray.some((rowOffset) => {
    return rangeArray.some((columnOffset) => {
      const nearbySpot = ((row + rowOffset) >= 0
                          && (column + columnOffset) >= 0
                          && (row + rowOffset) < grid.length
                          && (column + columnOffset) < grid[row + rowOffset].length)
        ? grid[row + rowOffset][column + columnOffset]
        : false
      return nearbySpot ? usedSymbols.includes(nearbySpot) : nearbySpot
    })
  })
}

const getNearbyGears = (grid: string[][], row: number, column: number) => {
  const rangeArray = [-1, 0, 1]
  const gearPositions: GridPos[] = []
  rangeArray.forEach((rowOffset) => {
    rangeArray.forEach((columnOffset) => {
      const nearbySpot = ((row + rowOffset) >= 0
                          && (column + columnOffset) >= 0
                          && (row + rowOffset) < grid.length
                          && (column + columnOffset) < grid[row + rowOffset].length)
        ? grid[row + rowOffset][column + columnOffset]
        : false
      if (nearbySpot === '*') {
        gearPositions.push({ i: row + rowOffset, j: column + columnOffset })
      }
    })
  })
  return gearPositions
}

export const part1 = () => {
  const lines = parseLines(input)
  const schematicGrid = lines.map((x) => x.split(''))
  let partNumberCheckSum = 0
  schematicGrid.forEach((row) => {
    row.forEach((cell) => {
      const cellNumber = Number.parseInt(cell)
      if (!cellNumber && cell !== '0' && cell !== '.') {
        usedSymbols.push(cell)
      }
    })
  })

  usedSymbols = [...new Set(usedSymbols)]
  schematicGrid.forEach((row, i) => {
    let local_number = ''
    let isPart = false
    row.forEach((cell, j) => {
      const cellNumber = Number.parseInt(cell)
      if (cellNumber || cell === '0') {
        local_number += cell
        isPart = isPart || checkNearbySymbols(schematicGrid, i, j)
      } else if (local_number !== '') {
        if (isPart) {
          partNumberCheckSum += Number.parseInt(local_number)
        }
        local_number = ''
        isPart = false
      }
      if (j === row.length - 1 && isPart) {
        partNumberCheckSum += Number.parseInt(local_number)
      }
    })
  })
  return partNumberCheckSum
}

// TODO: Clean up this code. I jump back and forth on data structures too much
export const part2 = () => {
  const lines = parseLines(input)
  const schematicGrid = lines.map((x) => x.split(''))
  const numbersNearGears: GridGears[] = []

  schematicGrid.forEach((row, i) => {
    let local_number = ''
    let local_gears: GridPos[] = []
    row.forEach((cell, j) => {
      const cellNumber = Number.parseInt(cell)
      if (cellNumber || cell === '0') {
        local_number += cell
        local_gears.push(...getNearbyGears(schematicGrid, i, j))
      } else if (local_number !== '') {
        if (local_gears.length > 0) {
          const local_gear_numbers: GridPos[] = []
          local_gears.forEach((x) => {
            if (local_gear_numbers.every((y) => y.i !== x.i && y.j !== x.j)) {
              local_gear_numbers.push(x)
            }
          })
          local_gear_numbers.forEach((x) => numbersNearGears.push({ pos: x, part: Number.parseInt(local_number) }))
        }
        local_number = ''
        local_gears = []
      }
      if (j === row.length - 1 && local_gears.length > 0) {
        const local_gear_numbers: GridPos[] = []
        local_gears.forEach((x) => {
          if (local_gear_numbers.every((y) => y.i !== x.i && y.j !== x.j)) {
            local_gear_numbers.push(x)
          }
        })
        local_gear_numbers.forEach((x) => numbersNearGears.push({ pos: x, part: Number.parseInt(local_number) }))
      }
    })
  })
  const ratios: number[] = []
  const asteriks: GridPos[] = []

  numbersNearGears.forEach((x) => {
    if (!asteriks.some((y) => y.i === x?.pos.i && y.j === x?.pos.j)) {
      asteriks.push(x.pos)
    }
  })

  asteriks.forEach((x) => {
    const partsWithGearsThere = numbersNearGears.filter((z) => z.pos?.i === x.i && z.pos?.j === x.j)
    if (partsWithGearsThere.length === 2) {
      ratios.push(partsWithGearsThere[0].part * partsWithGearsThere[1].part)
    }
  })
  return sum(ratios)
}
