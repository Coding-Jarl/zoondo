// Forth: Ajout d'une fonction qui vérifie si un objet qui
// contient un x et un y correspond à la position donnée
// On peut passer n'importe quel objet tant qu'il a x et y
// VERSION 2 : Avec closure function
export function isSamePosition<T extends Position>(obj: T) {
  return (pos: Position) => obj.x === pos.x && obj.y === pos.y
}

export function isOriginPosition(pos: Position): boolean {
  return pos.x === 0 && pos.y === 0
}
