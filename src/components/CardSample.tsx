import clsx from 'clsx'
import styles from '@/styles/components/CardSample.module.scss'
import Image from 'next/image'

type Props = Game.Card
export default function CardSample({
  slug,
  name,
  type,
  corners,
  value,
  moves,
}: Props) {
  let squares = []
  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      squares.push({ x, y })
    }
  }

  const cssClasses = clsx(styles.wrapper)

  return (
    <div className={cssClasses}>
      <div className={styles.card}>
        <div className={styles['cor-tl']}>{corners[0]}</div>
        <div className={styles['cor-tr']}>{corners[1]}</div>
        <div className={styles['cor-br']}>{corners[2]}</div>
        <div className={styles['cor-bl']}>{corners[3]}</div>
        <div className={styles.moves}>
          {squares.map((sq) => {
            const cssClasses = clsx(styles.square, {
              [styles.origin]: sq.x === 0 && sq.y === 0,
              [styles.move]: moves.some(([x, y]) => x === sq.x && y === sq.y),
            })
            return <div key={`${sq.x}-${sq.y}`} className={cssClasses} />
          })}
        </div>
        <div className={styles.type}>
          <Image
            src={`/assets/types/${type}.png`}
            alt={type}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={styles.value}>{value}</div>
        <div className={styles.picture}>
          <Image src={`/assets/tribes/${slug}.png`} alt={slug} fill />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}
