import styles from '@/styles/components/CardSample.module.scss'
import Image from 'next/image'
import { useBoardStore } from '@/utils/hooks/useBoardStore'
import { GridMoves } from './GridMoves'

export default function CardSample() {
  const cardFocus = useBoardStore((state) => state.cardFocus)

  if (!cardFocus) return null

  const { slug, name, type, corners, value, moves } = cardFocus

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles['cor-tl']}>{corners[0]}</div>
        <div className={styles['cor-tr']}>{corners[1]}</div>
        <div className={styles['cor-br']}>{corners[2]}</div>
        <div className={styles['cor-bl']}>{corners[3]}</div>

        <GridMoves moves={moves} styles={styles} />

        <div className={styles.type}>
          <Image
            src={`/assets/types/${type}.png`}
            alt={type}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className={styles.value}>{value}</div>

        <div className={styles.picture}>
          <Image
            src={`/assets/tribes/${slug}.png`}
            alt={slug}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}
