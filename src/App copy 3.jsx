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
  useEffect(() => {
    console.log(`effect enabled: ${enabled}`);

    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      console.log(`Mouse position: (${clientX}, ${clientY})`);
      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) {
      window.addEventListener("pointermove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, [enabled]);

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
