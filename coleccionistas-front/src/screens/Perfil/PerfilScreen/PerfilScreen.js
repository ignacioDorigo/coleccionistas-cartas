import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PerfilScreen.styles";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Icon, Avatar } from "@rneui/base";
import { ListItem } from "@rneui/base";
import axios from "axios";

// Formularios
import { CambiarNombreForm } from "../../../components/Account/CambiarNombre"; // Solo necesitas este componente por ahora

export function PerfilScreen() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [modalActivo, setModalActivo] = useState(""); // Estado para controlar cuál modal mostrar
  const [reload, setReload] = useState(false);

  const repintarComponentes = () => {
    return setReload((prevState) => !prevState);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/coleccionistas/perfilUsuario?mail=${mail}`)
      .then((response) => {
        const perfil = response.data;
        setNombre(perfil.nombre);
        setApellido(perfil.apellido);
        setEdad(perfil.edad);
      })
      .catch((error) => console.log(error));
  }, [reload]);

  const cambiarOpcion = (texto) => {
    // Determina qué modal debe mostrarse
    if (texto === "Cambiar Nombre") {
      setModalActivo("nombre"); // Activa el modal de cambiar nombre
    }
    if (texto === "Cambiar Apellido") {
      setModalActivo("apellido"); // Podrías agregar más modales si lo deseas
    }
    if (texto === "Cambiar Contraseña") {
      setModalActivo("contraseña");
    }
    if (texto === "Cambiar Email") {
      setModalActivo("email");
    }
  };

  const cerrarSesion = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.datos}>
        <Avatar
          rounded
          size={"large"}
          containerStyle={styles.avatarContainer}
          icon={{ type: "material", name: "person", color: "#FFF" }}
        >
          <Avatar.Accessory size={24} color="#240046"></Avatar.Accessory>
        </Avatar>

        <View style={styles.descripcion}>
          <Text style={styles.nombre}>
            {nombre} {apellido}
          </Text>
          <Text style={styles.edad}>{edad} Años</Text>
          <Text style={styles.mail}>{mail}</Text>
        </View>
      </View>

      {opcionesUsuario().map((opcion, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => cambiarOpcion(opcion.texto)} // Llama a la función para decidir qué modal mostrar
        >
          <ListItem>
            <Icon
              name={opcion.iconNameLeft}
              type={opcion.type}
              color={opcion.iconColorLeft}
            />
            <ListItem.Content>
              <ListItem.Title>{opcion.texto}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name={opcion.iconNameRight}
              type={opcion.type}
              color={opcion.iconColorRight}
            />
          </ListItem>
        </TouchableOpacity>
      ))}

      <Button
        title="Cerrar Sesión"
        onPress={cerrarSesion}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />

      {/* Modal de cambiar nombre */}
      {modalActivo === "nombre" && (
        <CambiarNombreForm
          visible={true}
          ocultarModal={() => setModalActivo("")} // Cierra el modal al establecer modalActivo como vacío
          repintarComponentes={repintarComponentes}
        />
      )}

      {/* Aquí puedes agregar más modales si necesitas otros, como cambiar apellido */}
    </View>
  );
}

function opcionesUsuario() {
  return [
    {
      texto: "Cambiar Email",
      type: "material-community",
      iconNameLeft: "chevron-right",
      iconColorLeft: "#CCCCCC",
      iconNameRight: "email-outline",
      iconColorRight: "#CCCCCC",
    },
    {
      texto: "Cambiar Contraseña",
      type: "material-community",
      iconNameLeft: "chevron-right",
      iconColorLeft: "#CCCCCC",
      iconNameRight: "lock-outline",
      iconColorRight: "#CCCCCC",
    },
    {
      texto: "Cambiar Nombre",
      type: "material-community",
      iconNameLeft: "chevron-right",
      iconColorLeft: "#CCCCCC",
      iconNameRight: "pencil-outline",
      iconColorRight: "#CCCCCC",
    },
    {
      texto: "Cambiar Apellido",
      type: "material-community",
      iconNameLeft: "chevron-right",
      iconColorLeft: "#CCCCCC",
      iconNameRight: "pencil",
      iconColorRight: "#CCCCCC",
    },
  ];
}
