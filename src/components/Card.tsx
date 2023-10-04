import Image from 'next/image'
import clsx from 'clsx'
import back from '@/assets/card-back-board.png'
import backAdv from '@/assets/card-back-board-alt.png'

import styles from '@/styles/components/Card.module.scss'
import { useDrag } from 'react-dnd'

type Props = Game.CardOwned

export default function Card({ name, isOwned, ...otherProps }: Props) {
  const [, drag] = useDrag(() => ({
    type: 'CLOBOULON',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { name, isOwned, ...otherProps },
  }))

  const cssClasses = clsx(
    styles.wrapper,
    isOwned ? styles.isOwned : styles.adversary
  )

  return (
    <div className={cssClasses} ref={drag}>
      <Image src={isOwned ? back : backAdv} alt="Hidden Card" />
      <p>{name}</p>
    </div>
  )
}
