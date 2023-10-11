import { availableCards } from '@/utils/data/cards'

declare global {
  namespace Game {
    type Board = {
      squares: Array<Square>
    }

    type Square = Position & {
      card?: Card
    }

    type Corner = number | '*'
    type Move = [X: number, Y: number]
    type Type =
      | 'chief'
      | 'priest'
      | 'monster'
      | 'elite'
      | 'soldier'
      | 'emblem'
      | 'asset'
      | 'hero'
      | 'trump'

    const DndItemTypes = {
      CLOBOULON: 'cloboulon',
      GOLDHURE: 'gold-hure',
      BOUCLEFEUILLE: 'bouclefeuille',
      GROGNARD_0: 'grognard:0',
      GROGNARD_1: 'grognard:1',
      KASSIN_0: 'kassin:0',
      KASSIN_1: 'kassin:1',
      SACRECHENE: 'sacrechene',
    }

    type Card = {
      slug: string
      name: string
      type: Type
      corners: [NW: Corner, NE: Corner, SE: Corner, SW: Corner]
      value: number
      moves: Array<Array<Move>>
      power?: string
      resolver?: function
      // variants?: {
      //   corners?: Card['corners']
      //   moves?: Card['moves']
      // }
    }

    type Tribe = {
      slug: string
      edition: string
      name: string
      description: string
      fighters: Record<string, Card>
    }

    type CardOwned = Card & {
      isOwned: boolean
    }

    type CardWithPosition = CardOwned & Position

    type Coordonate = Position
    type Transition = [Coordonate, Coordonate]
  }
}
export {}
