import { construirDeck, pedirCarta, puntosCarta } from "./usescases";

const moduloBlackjack = (() => {
  ("use strict");
  const palos = ["C", "D", "H", "S"],
    especiales = ["J", "Q", "K", "A"];

  //--------------------------------------
  let mazo = construirDeck(especiales, palos),
    puntosJugador = 0,
    puntosCompu = 0;
  //---------- Asignaciones del DOM ---------------------
  //------ campo de juego de los jugadores ---------
  const cartasJugador = document.querySelector("#cartas-jugador"),
    cartasCompu = document.querySelector("#cartas-compu"),
    //------- Botones Jugador ------------------
    btnPedir = document.querySelector("#pedir"),
    btnDetener = document.querySelector("#stop"),
    btnNewGame = document.querySelector("#new"),
    //------- Puntos Jugadores ---------------
    puntosJugadores = document.querySelectorAll("h2 > span");

  //---- juego del jugador-----------

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(mazo);
    //--renderiza carta--
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("img-carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    cartasJugador.append(imgCarta);

    //--- muestra puntos ----
    const puntosCartaPedida = puntosCarta(carta);
    puntosJugador = puntosJugador + puntosCartaPedida;
    puntosJugadores[0].textContent = puntosJugador;
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      console.warn("tu puntaje es mayor a 21.");
      turnoCompu(puntosJugador);
    } else if (puntosJugador === 21) {
      console.log("Excelente!!!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoCompu(puntosJugador);
    }
  });
  //--------------------------------------

  //---- juego de la compu-----------
  const turnoCompu = (pointsPlayer) => {
    do {
      const carta = pedirCarta(mazo);
      //--renderiza carta--
      const imgCarta = document.createElement("img");
      imgCarta.classList.add("img-carta");
      imgCarta.src = `assets/cartas/${carta}.png`;
      cartasCompu.append(imgCarta);
      //--- muestra puntos ----
      const puntosCartaPedida = puntosCarta(carta);
      puntosCompu = puntosCompu + puntosCartaPedida;
      puntosJugadores[1].textContent = puntosCompu;
      if (pointsPlayer > 21) {
        break;
      }
    } while (puntosCompu < pointsPlayer && pointsPlayer <= 21);

    puntosCompu > 21
      ? console.log("Felcidades!!!, Ganaste")
      : puntosCompu === puntosJugador
      ? console.log("Juego Empatado")
      : puntosCompu > puntosJugador || puntosJugador > 21
      ? console.log("Lo siento. La Computadora gana la partida.")
      : console.log("Felicidades!!! Ganaste");
  };
  //--------------------------------------

  //----Terminar turno btn -> Detener ------
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCompu(puntosJugador);
  });
  //--------------------------------------

  //---Funcion para iniciar partida-----
  const inicioPartida = () => {
    //Creo nuevo mazo y Mezclo
    mazo = construirDeck(especiales, palos); // construye el mazo de cartas

    //Limpio Campos de juego
    cartasJugador.innerHTML = "";
    cartasCompu.innerHTML = "";
    //reinicio puntajes
    puntosJugador = 0;
    puntosCompu = 0;
    for (const points of puntosJugadores) {
      points.textContent = 0;
    }
    //activo botones 'Detenes' y 'Pedir Carta'
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    //limpio mensajes
    console.clear();
  };

  //---- Iniciar nueva partida ------
  btnNewGame.addEventListener("click", () => {
    inicioPartida();
  });

  //hago publica las funciones que se agreguen en el objeto que se retorna y se acceden a traves del modulo inicial moduloBlackjack.fnPublica()
  return {
    newGame: inicioPartida, //en este caso puedo ejecutar la funcion inicioPartida() desde otro lugar usando moduloBlackjack.newGame()
  };
})();
