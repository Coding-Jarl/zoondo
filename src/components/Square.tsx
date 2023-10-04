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
  const [, drop] = useDrop(
    () => ({
      accept: 'CLOBOULON',
      drop: (item: Game.CardWithPosition) => {
        if (!item) return
        moveCard(item, { x, y })
      },
    }),
    [card?.x, card?.y]
  )
  const hHover = () => {
    if (!card || !card.isOwned || cardFocus === card) return
    setCardFocus(card)
  }

  const cssClasses = clsx(styles.wrapper, card ? styles.occupied : styles.empty)
  return (
    <div ref={drop} className={cssClasses} onMouseEnter={hHover}>
      {card && <Card {...card} />}
    </div>
  )
}
