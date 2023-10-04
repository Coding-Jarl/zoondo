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
  const setCardFocus = useBoardStore((state) => state.setCardFocus)
  const moveCard = useBoardStore((state) => state.moveCard)
  const [, drop] = useDrop(
    () => ({
      accept: 'CLOBOULON',
      drop: (item: Game.CardWithPosition) => {
        console.log(item)
        if (!item) return
        moveCard(item, { x, y })
      },
    }),
    [card?.x, card?.y]
  )
  const hHover = () => {
    if (!card || !card.isOwned) return
    setCardFocus(card)
  }
  const hLeave = () => {
    setCardFocus(null)
  }

  const cssClasses = clsx(styles.wrapper, card ? styles.occupied : styles.empty)
  return (
    <div
      ref={drop}
      className={cssClasses}
      onMouseEnter={hHover}
      onMouseLeave={hLeave}
    >
      {card && <Card {...card} />}
      {/* Log des cases pour débugger plus facilement */}
      {/* <div style={{ position: 'absolute', background: '#1d1e22' }}>
        {JSON.stringify({ x, y }, null, 2)}
      </div> */}
    </div>
  )
}
