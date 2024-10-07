// Hooks de React
import React, { useContext, useEffect, useState } from "react";

// Componentes de React Native
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";

// Estilos del  componente
import { styles } from "./PerfilScreen.styles";

// Contexto de Autenticacion
import { AuthContext } from "../../../context/AuthContext";

// Contexto de Tema oscuro/claro NO LO USE TODAVIA
import { ThemeContext } from "../../../context/ThemeContext";

// Componentes de React Native elements
import { Button, Icon, Avatar, ListItem } from "@rneui/themed";

// Dependencia para hacer peticiones HTTP
import axios from "axios";

// Dependencia para notificar
import Toast from "react-native-toast-message";

// Dependencia para usar la galeria
import * as ImagePicker from "expo-image-picker";

// Formularios
import { CambiarNombreForm } from "../../../components/Perfil";
import { CambiarApellidoForm } from "../../../components/Perfil";
import { CambiarPasswordForm } from "../../../components/Perfil";

export function PerfilScreen() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [modalActivo, setModalActivo] = useState("");
  const [reload, setReload] = useState(false);

  const repintarComponentes = () => {
    return setReload((prevState) => !prevState);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.1.14:8080/coleccionistas/perfilUsuario?mail=${mail}`)
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
      setModalActivo("nombre");
    }
    if (texto === "Cambiar Apellido") {
      setModalActivo("apellido");
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

  // Esta usa una foto de la camara
  const tomarFotoCamara = async () => {
    // Verifica el estado actual de los permisos
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status === "granted") {
      // Permiso ya concedido, abre la cámara
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Imagen capturada:", result.uri);
      }
    } else if (status === "denied") {
      // Permisos denegados permanentemente, mostrar alerta y redirigir a la configuración
      Alert.alert(
        "Permiso necesario",
        "Has denegado el acceso a la cámara. Por favor, ve a la configuración de la aplicación y habilita los permisos de la cámara.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Abrir configuración",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    } else {
      // Solicitar permisos si aún no se ha hecho
      const { status: newStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          console.log("Imagen capturada:", result.uri);
        }
      } else {
        Alert.alert(
          "Permiso necesario",
          "No se puede acceder a la cámara sin permisos."
        );
      }
    }
  };

  // Esta usa una foto de la galeria
  const cambiarAvatar = async () => {
    // Usar foto de la galeria
    const foto = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!foto.canceled) {
      // FALTA GUARDARLA
      console.log("FOTO ELEGIDA");
    } else {
      console.log("OPERACION CANCELADA");
    }
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
          <Avatar.Accessory
            size={24}
            color="#240046"
            onPress={cambiarAvatar}
          ></Avatar.Accessory>
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
          onPress={() => cambiarOpcion(opcion.texto)}
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
          ocultarModal={() => setModalActivo("")}
          repintarComponentes={repintarComponentes}
        />
      )}

      {modalActivo === "apellido" && (
        <CambiarApellidoForm
          visible={true}
          ocultarModal={() => setModalActivo("")}
          repintarComponentes={repintarComponentes}
        />
      )}

      {modalActivo === "contraseña" && (
        <CambiarPasswordForm
          visible={true}
          ocultarModal={() => setModalActivo("")}
          repintarComponentes={repintarComponentes}
        />
      )}
      <Toast />
    </View>
  );
}

function opcionesUsuario() {
  return [
    
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