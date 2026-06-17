import { useEffect, useState } from "react";

const FollowMouse = ({ positionX, positionY }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "red",
        pointerEvents: "none", // para que el div no interfiera con los eventos del mouse
        left: "-20px",
        top: "-20px",
        transform: `translate(${positionX}px, ${positionY}px)`,
      }}
    />
  );
};

function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); //null que no tengo ese dato y por tanto controlar que no tengo ese dato
  //Buena practica es que inicializamos si es un string si es objeto con 2 parametros como arriba, buena idea que ya se inicialice con esto

  //Este efecto se ejecutará cada vez que el valor de enabled cambie, y se encargará de agregar o eliminar el event listener para seguir el puntero del mouse
  useEffect(() => {
    console.log(`effect enabled: ${enabled}`);

    //Esta funcion SIEMPRE dentro del effecto, es la funcion que se ejecutará cada vez que el componente se desmonte o cuando el efecto se vuelva a ejecutar (cuando enabled cambie), y se encargará de eliminar el event listener para evitar fugas de memoria o comportamientos inesperados
    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      console.log(`Mouse position: (${clientX}, ${clientY})`);
      setPosition({ x: clientX, y: clientY });
    }

    // //Asi no funciona
    // if (enabled) {
    //   window.addEventListener("pointermove", handleMouseMove);
    // } else {
    //   window.removeEventListener("pointermove", handleMouseMove);
    // }
    if (enabled) {
      window.addEventListener("pointermove", handleMouseMove);
    }

    //Clean effect, suscripciones limpiar, listeners limpiar, timers limpiar, etc
    //Los useEffects pueden devolver una funcion y en la funcion pueden devolver como
    //limpiar el efecto, esto se ejecuta siempre que se desmonta el componente o que deje de aparecer renderizarse
    //Ejecutar este metodo para limpiar cada cosa que no necesitemos, y tambien cada vez que cambie dependencia
    //limpiar efecto anterior antes de ejecutar el nuevo efecto, esto es importante para evitar fugas de memoria o comportamientos inesperados

    //Cuando componente se desmonta
    // cuando cambian las depdenecnias, antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, [enabled]); // [] para que se ejecute solo una vez al montar el componente

  //window.addEventListener(); //NO hay como colocarla aca un addEventListener porque se ejecutará cada vez que el componente se renderice, y no queremos eso, queremos que se ejecute solo cuando enabled cambie a true
  return (
    <main>
      <FollowMouse positionX={position.x} positionY={position.y}></FollowMouse>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} Seguir Puntero
      </button>
    </main>
  );
}

export default App;
