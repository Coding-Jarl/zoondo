'use client'
import Board from '@/components/Board'
import CardSample from '@/components/CardSample'
import Square from '@/components/Square'
import * as utils from '@/utils'
import { useBoardStore } from '@/utils/hooks/useBoardStore'

import styles from '@/styles/layouts/PageGame.module.scss'

let board: Array<Game.Square> = utils.generatePositions(0, 5)

export default function Home() {
  const cardsOnBoard = useBoardStore((state) => state.cardsOnBoard)

  return (
    <div className={styles.wrapper}>
      <Board>
        {board.map((sq) => {
          const foundCard = cardsOnBoard.find(
            (candidate: Game.CardWithPosition) => {
              return candidate.x === sq.x && candidate.y === sq.y
            }
          )
          return (
            <Square
              key={`${sq.x};${sq.y}`}
              card={foundCard}
              x={sq.x}
              y={sq.y}
            />
          )
        })}
      </Board>
      <CardSample />
    </div>
  )
}
