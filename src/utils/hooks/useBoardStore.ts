import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import { availableCards } from '../data/cards'

interface BoardState {
  cardFocus: Game.Card | null
  cardsOnBoard: Game.CardWithPosition[]
  setCardFocus: (card: Game.Card | null) => void
  moveCard: (card: Game.CardWithPosition, pos: Position) => void
}
export const useBoardStore = create<BoardState>()(
  devtools((set, get) => ({
    cardFocus: null,
    cardsOnBoard: [
      { ...availableCards['cloboulon'], x: 0, y: 1, isOwned: true },
      { ...availableCards['gold-hure'], x: 1, y: 1, isOwned: true },
      { ...availableCards['bouclefeuille'], x: 2, y: 1, isOwned: true },
      { ...availableCards['sacrechene'], x: 3, y: 1, isOwned: true },
      { ...availableCards['grognard:0'], x: 4, y: 1, isOwned: true },
      { ...availableCards['grognard:1'], x: 5, y: 1, isOwned: true },
      { ...availableCards['cloboulon'], x: 0, y: 4, isOwned: false },
      { ...availableCards['cloboulon'], x: 1, y: 4, isOwned: false },
      { ...availableCards['cloboulon'], x: 2, y: 4, isOwned: false },
      { ...availableCards['cloboulon'], x: 3, y: 4, isOwned: false },
      { ...availableCards['cloboulon'], x: 4, y: 4, isOwned: false },
      { ...availableCards['cloboulon'], x: 5, y: 4, isOwned: false },
    ] as Game.CardWithPosition[],
    setCardFocus: (card) => {
      set(() => ({ cardFocus: card }), false, 'setCardFocus')
    },
    moveCard: (card, pos) => {
      const foundCard = get().cardsOnBoard.findIndex(
        (candidate) => candidate.x === card.x && candidate.y === card.y
      )
      set(
        produce((state) => {
          state.cardsOnBoard[foundCard] = { ...card, ...pos }
        }),
        false,
        'moveCard'
      )
    },
  }))
)
