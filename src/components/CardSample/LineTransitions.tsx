type LineTransitionProps = Record<'from' | 'to', Position>
export function LineTransition({ from, to }: LineTransitionProps) {
  return (
    <line
      x1={from.x + 50}
      y1={from.y + 50}
      x2={to.x + 50}
      y2={to.y + 50}
      stroke="black"
      strokeWidth="2"
    />
  )
}

type LineTransitionsProps = {
  transitions: Transition[]
}
export function LineTransitions({ transitions }: LineTransitionsProps) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {transitions.map(([from, to]) => (
        <LineTransition
          key={`${from.x}-${from.y}-${to.x}-${to.y}`}
          from={from}
          to={to}
        />
      ))}
    </svg>
  )
}
