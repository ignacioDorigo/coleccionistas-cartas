import React, { useContext, useState } from "react";
import { View, Text, Alert, Image, FlatList } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./VenderCartaForm.data";
import { styles } from "./VenderCartaForm.styles";
import { Button, CheckBox, Icon, Input, Overlay } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";

export function VenderCartaForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { visible, ocultarModal, repintarComponentes } = props;
  const [check1, setCheck1] = useState(false);
  const [imagenes, setImagenes] = useState([]);

  const renderImagen = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        if (check1 === true) {
          Alert.alert("Exito", "Publicacion Generada");
          console.log(formulario);
        } else {
          Alert.alert(
            "Error",
            "Para enviar el formulario debe aceptar la declaración jurada"
          );
        }
      } catch (error) {
        console.log(error);
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
      // Vemos donde guardo la imagen
      const uriFoto = result.assets[0].uri;
      console.log(result.assets[0]);
      setImagenes((prevImagenes) => [...prevImagenes, uriFoto]);
    } else {
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
          ></Icon>
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
          ></Icon>
        }
      />

      <Input
        placeholder="Ingrese Precio"
        errorMessage={formik.errors.precio}
        containerStyle={styles.inputContainer}
        onChangeText={(texto) => formik.setFieldValue("precio", texto)}
        rightIcon={
          <Icon
            type="material-community"
            name="currency-usd"
            color="#C1C1C1"
          ></Icon>
        }
      />

      <CheckBox
        title="Declaracion Jurada"
        checked={check1}
        containerStyle={styles.checkbox}
        onPress={() => setCheck1(!check1)}
      />
      <Text>Imagenes añadidas {imagenes.length}</Text>
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
