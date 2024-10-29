import { createContext, useState } from "react";

export const RecargarContext = createContext();

export const RecargarProvider = ({ children }) => {
  const [colecciones, setColecciones] = useState(false);
  const [favoritos, setFavoritos] = useState(false);
  const [marketplace, setMarketplace] = useState(false);
  const [perfil, setPerfil] = useState(false);

  const recargarColecciones = () => {
    return setColecciones((prevState) => !prevState);
  };

  const recargarFavoritos = () => {
    return setFavoritos((prevState) => !prevState);
  };

  const recargarMarketplace = () => {
    return setMarketplace((prevState) => !prevState);
  };

  const recargarPerfil = () => {
    return setPerfil((prevState) => !prevState);
  };

  return (
    <RecargarContext.Provider
      value={{
        colecciones,
        favoritos,
        marketplace,
        perfil,
        recargarColecciones,
        recargarFavoritos,
        recargarMarketplace,
        recargarPerfil,
      }}
    >
      {children}
    </RecargarContext.Provider>
  );
};
