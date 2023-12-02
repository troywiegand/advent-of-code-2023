import { parseLines, readInput } from 'io'
import { debugArray, sum } from 'utils';

type GameMax = {
  red: number,
  green: number,
  blue: number
}

enum CubeColor {
  red= 'red',
  green= 'green',
  blue='blue'
}

const input = await readInput('day-02')

// 12 red cubes, 13 green cubes, and 14 blue cubes.

export const part1 = () => {
  const LEGAL_MAX = {red: 12, green: 13, blue: 14}

  const isUnderMax = (s:string) => {
    const [pullString, color] = s.trim().split(' ')
    const pullCount = Number.parseInt(pullString)
    const cubeColor = color as CubeColor;
    return pullCount <= LEGAL_MAX[cubeColor]
  }

  const lines = parseLines(input)

  const legalGames = lines.filter((x)=>{
    const pullsInEachGame = x.split(/\:|\;/).slice(1)
    return pullsInEachGame.every(y =>{
      return y.split(',').every(z=>isUnderMax(z))
    }) 
  })

  const legalIDs = legalGames.map(x=>{
    return Number.parseInt(x.split(/\:/)[0].split(' ')[1])
  })
  
  return sum(legalIDs)
}


export const part2 = () => {
  const updateMax = (lm:GameMax,s:string) => {
    const [pullString, color] = s.trim().split(' ')
    const pullCount = Number.parseInt(pullString)
    const cubeColor = color as CubeColor;
    const newMaxes = lm
      if(pullCount > lm[cubeColor]){
        newMaxes[cubeColor] = pullCount
      }
      return newMaxes
  }
  
  const lines = parseLines(input)
  const gamePower = lines.map((game)=>{
    let local_max: GameMax = {red: 0, green: 0, blue: 0}
    const pullsInEachGame = game.split(/\:|\;/).slice(1)
    pullsInEachGame.forEach(gamePulls =>{
      gamePulls.split(',').forEach((roundOfPulls)=>{
        local_max = updateMax(local_max, roundOfPulls)
      })
    })
    return local_max.red * local_max.blue * local_max.green
  })
  return sum(gamePower)
}
