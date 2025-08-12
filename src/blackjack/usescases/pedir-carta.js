/**
 * Funcion para pedir carta
 * @param {Array<String>} mazo array del mazo de cartas del juego
 * @returns {String} retorna una carta del mazo
 */

export const pedirCarta = (mazo) => {
  if (!mazo || mazo.length === 0) {
    throw new Error("mazo debe existir y ser distinto de cero");
  }
  return mazo.length > 0
    ? mazo.pop()
    : console.warn("Ya no hay cartas en el mazo!!! Reinicia el juego.");
};
