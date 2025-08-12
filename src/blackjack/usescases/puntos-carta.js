/**
 *
 * @param {String} carta carta a evaluar puntaje
 * @returns {Number} retorna puntos de carta
 */
export const puntosCarta = (carta) => {
  if (!carta || typeof carta != "string") {
    throw new Error("carta debe existir y debe ser un string ");
  }
  const valorCarta = carta.substring(0, carta.length - 1);
  return !isNaN(valorCarta) ? valorCarta * 1 : valorCarta === "A" ? 11 : 10;
};
