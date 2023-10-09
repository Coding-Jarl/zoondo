import clsx from 'clsx'
import { useBoardStore } from '@/utils/hooks/useBoardStore'
import Card from './Card'

import styles from '@/styles/components/Square.module.scss'
import { useDrop } from 'react-dnd'

type Props = {
  card: Game.CardWithPosition | undefined
  x: number
  y: number
}
export default function Square({ card, x, y }: Props) {
  const cardFocus = useBoardStore((state) => state.cardFocus)
  const setCardFocus = useBoardStore((state) => state.setCardFocus)
  const moveCard = useBoardStore((state) => state.moveCard)
  const cardsOnBoard = useBoardStore((state) => state.cardsOnBoard)
  const fight = useBoardStore((state) => state.fight)
  const canMove = useBoardStore((state) => state.canMove)

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'CLOBOULON',
      drop: (item: Game.CardWithPosition) => {
        if (!item) return

        const foundAdv = cardsOnBoard.find(
          (candidate) => candidate.x === x && candidate.y === y
        )
        if (foundAdv) {
          fight(item, foundAdv)
        }

        moveCard(item, { x, y })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      canDrop: (item: Game.CardWithPosition) => {
        return canMove(item, { x, y })
      },
    }),
    [card?.x, card?.y]
  )

  const hHover = () => {
    if (!card || !card.isOwned || cardFocus === card) return
    setCardFocus(card)
  }

  const cssClasses = clsx(
    styles.wrapper,
    card ? styles.occupied : styles.empty,
    isOver && styles.hovered,
    canDrop && styles.authorizedMove
  )
  return (
    <div ref={drop} className={cssClasses} onMouseEnter={hHover}>
      {card && <Card {...card} />}
    </div>
  )
}
