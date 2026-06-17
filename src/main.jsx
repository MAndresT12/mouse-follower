import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import imagenRenderizado2Veces from "./assets/image.png";
createRoot(document.getElementById("root")).render(
  //Porque nada mas entrar hace efecto clenup efect {imagenRenderizado2Veces}

  //El strictMode, por defecto cuando se crea proyecto, y sirve para
  //dar advertencia de si estas usando codigo antiguo react o algo incorrecto,
  //al montar el componente lo que hace es montar el componente, desmontarlo y volverlo a montar, esto es para detectar si el componente tiene algun efecto secundario no deseado, como por ejemplo un useEffect que no limpia correctamente sus efectos secundarios, o un useState que no se inicializa correctamente, etc
  //solo esto para desarrollo
  <StrictMode>
    <App />
  </StrictMode>,
);
