import clsx from 'clsx'
import { useBoardStore } from '@/utils/hooks/useBoardStore'
import Card from './Card'

import styles from '@/styles/components/Square.module.scss'
import { useDrop } from 'react-dnd'

function canMove(
  token: Game.CardWithPosition,
  { x: toX, y: toY }: Position
): boolean {
  return token.moves
    .flat()
    .some(
      ([itemX, itemY]) =>
        itemX + token.x === toX &&
        itemY + token.y === toY &&
        (itemX !== 0 || itemY !== 0)
    )
}

type Props = {
  card: Game.CardWithPosition | undefined
  x: number
  y: number
}
export default function Square({ card, x, y }: Props) {
  const cardFocus = useBoardStore((state) => state.cardFocus)
  const setCardFocus = useBoardStore((state) => state.setCardFocus)
  const moveCard = useBoardStore((state) => state.moveCard)
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'CLOBOULON',
      drop: (item: Game.CardWithPosition) => {
        if (!item) return
        moveCard(item, { x, y })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
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
    isOver && styles.hovered
  )
  return (
    <div ref={drop} className={cssClasses} onMouseEnter={hHover}>
      {card && <Card {...card} />}
    </div>
  )
}
