import { isOriginPosition, isSamePosition } from './object'

// Forth: J'ai simplifié car finalement tu n'as que des carrés, jms de rectangles
export function generatePositions(min: number, max: number): Position[] {
  const positions: Array<Position> = []
  const inversed = min > max

  // On inverse min et max si min > max pour la boucle du dessous
  if (inversed) [min, max] = [max, min]

  // Forth: Je remet l'ordre correct ici, histoire qu'en haut à droite, on ait la case 0,0
  for (let y = min; y <= max; y++) {
    for (let x = min; x <= max; x++) {
      positions.push({ x, y })
    }
  }

  // On inverse l'ordre des cases pour respecter min et max
  if (inversed) positions.reverse()

  return positions
}

// Forth: Je remet la size normale ici, on modifiera ca dans le grid
// J'ai aussi retiré le type Coordonate qui n'apporte vraiment rien
// que ce soit en type qu'en nom Position et Coordonnée, c'est un peu la meme chose xd
// J'ai aussi déplacé Transition dans le fichier de types
const SQUARE_SIZE = 20 //%

export function positionsToTransition(
  src: Position,
  dst: Position
): Transition {
  // Je multiplie les y par -1 pour inverser l'affichage des y
  const coordSrc: Position = {
    x: src.x * SQUARE_SIZE,
    y: src.y * SQUARE_SIZE * -1,
  }
  const coordDst: Position = {
    x: dst.x * SQUARE_SIZE,
    y: dst.y * SQUARE_SIZE * -1,
  }

  return [coordSrc, coordDst]
}

// Foth: Cette fonction est assez couteuse, d'autant plus qu'à chaque survol
// de la meme carte, on recalcule toutes les transitions
// Après plusieurs recherches, le problème est que vérifier qu'un tableau est égal
// à un autre, serait tout aussi couteux, donc pas rentable !
// A mois de stringifier l'array et de comparer 2 strings !
export function movesToTransitions(moves: Game.Move[][]): Transition[] {
  // Forth: Convertion du unshift
  const movesCopy = moves.map((moveSerie) => [[0, 0], ...moveSerie])

  const transitions: Transition[] = []
  movesCopy.forEach((moveSerie) => {
    for (let j = 0; j < moveSerie.length - 1; j++) {
      // Forth: je simplifie un peu ici
      const [curX, curY] = moveSerie[j]
      const [nextX, nextY] = moveSerie[j + 1]

      const src: Position = { x: curX, y: curY }
      const dst: Position = { x: nextX, y: nextY }

      const transition = positionsToTransition(src, dst)
      transitions.push(transition)
    }
  })

  return transitions
}

export function hasMoveDestination(square: Position, moves: Game.Moves) {
  return moves
    .flat()
    .some(
      ([x, y]) =>
        isSamePosition({ x, y })(square) && !isOriginPosition({ x, y })
    )
}
