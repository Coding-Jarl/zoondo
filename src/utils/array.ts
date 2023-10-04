export function generatePositions(min: number, max: number): Position[]

export function generatePositions(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): Position[]

export function generatePositions(
  minX: number,
  maxX: number,
  minY: number = minX,
  maxY: number = maxX
): Position[] {
  const positions: Array<Position> = []

  for (let y = maxY; y >= minY; y--) {
    for (let x = minX; x <= maxX; x++) {
      positions.push({ x, y })
    }
  }

  return positions
}

const SQUARE_SIZE = -20 //%?

export function positionsToTransition(
  src: Position,
  dst: Position
): [Game.Coordonate, Game.Coordonate] {
  let coordSrc = { x: src.x * SQUARE_SIZE, y: src.y * SQUARE_SIZE }
  let coordDst = { x: dst.x * SQUARE_SIZE, y: dst.y * SQUARE_SIZE }

  return [coordSrc, coordDst]
}

export function movesToTransitions(
  moves: Game.Move[][]
): Array<Game.Transition> {
  const movesCopy = JSON.parse(JSON.stringify(moves)) as typeof moves

  const fullMoves = movesCopy.map((moveSerie) => {
    moveSerie.unshift([0, 0])
    return moveSerie
  })

  let transitions = []
  for (let i = 0; i < fullMoves.length; i += 1) {
    let moveSerie = movesCopy[i]

    for (let j = 0; j < moveSerie.length - 1; j += 1) {
      let curMove = moveSerie[j]
      let nextMove = moveSerie[j + 1]

      const src: Position = {
        x: curMove[0],
        y: curMove[1],
      }
      const dst: Position = {
        x: nextMove[0],
        y: nextMove[1],
      }

      const transition = positionsToTransition(src, dst)
      transitions.push(transition)
    }
  }

  return transitions
}
