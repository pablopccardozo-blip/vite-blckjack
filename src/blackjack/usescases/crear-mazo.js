import _ from "underscore";

/**
 * Funcion para crear y mezclar mazo
 * @param {Array<String>} especiales cartas especiales J, Q, k, A.
 * @param {Array<String>} palos palos de mazo C, D, H, S.
 * @returns {Array<String>} retorna un nuevo mazo de cartas
 */

export const construirDeck = (especiales, palos) => {
  if (!especiales || especiales.length === 0) {
    throw new Error(
      "El arreglo de cartas especiales deben enviarse y deben ser mayor a 0"
    );
  }
  const deck = [];
  for (const palo of palos) {
    for (let i = 2; i <= 10; i++) {
      deck.push(i + palo);
    }
    for (const especial of especiales) {
      deck.push(especial + palo);
    }
  }
  return _.shuffle(deck);
};
