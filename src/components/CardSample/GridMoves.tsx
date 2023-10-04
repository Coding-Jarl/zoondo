import * as utils from '@/utils'
import clsx from 'clsx'
import { LineTransitions } from './LineTransitions'

type Props = {
  styles: CSSStyles
  moves: Game.Move[][]
}

// Forth : La case 0,0 se trouve au centre
// Les x vont de gauche à droite, les y de bas en haut (tel un graph de maths)
const GRID = utils.generatePositions(2, -2)

export function GridMoves({ styles, moves }: Props) {
  return (
    <div className={styles.moves}>
      {GRID.map((sq) => {
        const cssClasses = clsx(styles.square, {
          [styles.origin]: utils.isOriginPosition(sq),
          [styles.move]: utils.hasMoveDestination(sq, moves),
          // [styles.move]: moves
          //   .flat()
          //   .some(
          //     ([x, y]) => x === sq.x && y === sq.y && (x !== 0 || y !== 0)
          //   ),
        })
        return <div key={`${sq.x}-${sq.y}`} className={cssClasses} />
      })}
      {/* Forth: Ajout d'un composant pour générer les lignes pour gagner en lisibilité */}
      <LineTransitions transitions={utils.movesToTransitions(moves)} />
    </div>
  )
}
