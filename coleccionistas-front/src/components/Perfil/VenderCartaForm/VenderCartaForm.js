import React, { useContext, useState } from "react";
import { View, Text, Alert, Image, FlatList } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./VenderCartaForm.data";
import { styles } from "./VenderCartaForm.styles";
import { Button, CheckBox, Icon, Input, Overlay } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { RecargarContext } from "../../../context/RecargarContext";

export function VenderCartaForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { visible, ocultarModal, repintarComponentes } = props;
  const [check1, setCheck1] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const { recargarMarketplace } = useContext(RecargarContext);

  const renderImagen = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        if (check1) {
          const formData = new FormData();
          formData.append("mail", mail);
          formData.append("titulo", formulario.titulo);
          formData.append("descripcion", formulario.descripcion);
          formData.append("precio", formulario.precio.toString()); // Asegúrate de que el precio sea un string

          // Agrega las imágenes al FormData solo si hay imágenes
          if (imagenes.length > 0) {
            imagenes.forEach((imagen, index) => {
              formData.append("files", {
                uri: imagen,
                name: `imagen_${index}.jpg`,
                type: "image/jpeg",
              });
            });
          }

          // Envía la solicitud POST al endpoint
          const response = await axios.post(
            `http://${ipHost}:8080/coleccionistas/publicarCarta`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            Alert.alert("Éxito", "Publicación generada");
            formik.resetForm();
            setImagenes([]);
            repintarComponentes(); // Llama a la función para repintar componentes si es necesario
            recargarMarketplace();
          } else {
            Alert.alert("Error", "No se pudo generar la publicación");
          }
        } else {
          Alert.alert(
            "Error",
            "Para enviar el formulario debe aceptar la declaración jurada"
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error",
          "Hubo un problema al enviar la publicación. Verifique su conexión y los datos ingresados."
        );
      }
    },
  });

  const cancelar = () => {
    ocultarModal();
  };

  const subirFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      const uriFoto = result.assets[0].uri;
      setImagenes((prevImagenes) => [...prevImagenes, uriFoto]);
    }
  };

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onBackdropPress={ocultarModal}
    >
      <Text style={styles.titulo}>Vender Carta</Text>

      <Input
        placeholder="Ingrese Titulo"
        errorMessage={formik.errors.titulo}
        onChangeText={(texto) => formik.setFieldValue("titulo", texto)}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-circle-outline"
            color="#C1C1C1"
          />
        }
      />

      <Input
        placeholder="Ingrese Descripcion"
        errorMessage={formik.errors.descripcion}
        onChangeText={(texto) => formik.setFieldValue("descripcion", texto)}
        rightIcon={
          <Icon
            type="material-community"
            name="tooltip-text-outline"
            color="#C1C1C1"
          />
        }
      />

      <Input
        placeholder="Ingrese Precio"
        errorMessage={formik.errors.precio}
        containerStyle={styles.inputContainer}
        onChangeText={(texto) => formik.setFieldValue("precio", texto)}
        // keyboardType="numeric"
        rightIcon={
          <Icon type="material-community" name="currency-usd" color="#C1C1C1" />
        }
      />

      <CheckBox
        title="Declaracion Jurada"
        checked={check1}
        containerStyle={styles.checkbox}
        onPress={() => setCheck1(!check1)}
      />
      <Text>Imagenes añadidas: {imagenes.length}</Text>
      <FlatList
        data={imagenes}
        renderItem={renderImagen}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={{ alignItems: "center", margin: 20 }}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Button onPress={subirFoto} radius={"sm"} type="solid">
        Subir Imagen
        <Icon name="upload" color="white" />
      </Button>

      <Button
        title={"Publicar"}
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnConfirmar}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </Overlay>
  );
}
