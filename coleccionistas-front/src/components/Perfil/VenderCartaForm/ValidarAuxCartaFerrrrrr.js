import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./VenderCartaForm.data";
import { styles } from "./VenderCartaForm.styles";
import { Button, CheckBox, Icon, Input, Overlay } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { RecargarContext } from "../../../context/RecargarContext";
import { validarImagen } from "./ValidarImagen";

export function VenderCartaForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { visible, ocultarModal, repintarComponentes } = props;
  const [check1, setCheck1] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const { recargarMarketplace } = useContext(RecargarContext);
  const [validandoImagen, setValidandoImagen] = useState(false);
  const renderImagen = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={() => eliminarImagen(index)}
      >
        <Icon name="close" type="material" color="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  const eliminarImagen = (index) => {
    setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));
  };

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
          formData.append("precio", formulario.precio.toString());

          if (imagenes.length > 0) {
            imagenes.forEach((imagen, index) => {
              formData.append("files", {
                uri: imagen,
                name: `imagen_${index}.jpg`,
                type: "image/jpeg",
              });
            });
          }

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
            repintarComponentes();
            ocultarModal();
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
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
    });

    if (!result.canceled) {
      const uriFoto = result.assets[0].uri;

      setValidandoImagen(true);

      // Validar la imagen antes de agregarla
      const esValida = await validarImagen(uriFoto);
      setValidandoImagen(false);

      if (esValida) {
        setImagenes((prevImagenes) => [...prevImagenes, uriFoto]);
      } else {
        Alert.alert("Imagen no válida", "La imagen no parece ser una carta.");
      }
    }
  };
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onBackdropPress={ocultarModal}
    >
      <Text style={styles.titulo}>Vender Carta</Text>

      <Text style={styles.camposForm}>Titulo:</Text>
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

      <Text style={styles.camposForm}>Descripcion:</Text>

      <TextInput
        placeholder="Ingrese Descripcion"
        style={styles.textArea}
        multiline={true}
        numberOfLines={4}
        errorMessage={formik.errors.descripcion}
        onChangeText={(texto) => formik.setFieldValue("descripcion", texto)}
      />

      {formik.errors.descripcion && (
        <Text style={styles.msjDescripcion}>{formik.errors.descripcion}</Text>
      )}

      <Text style={styles.camposForm}>Precio:</Text>
      <Input
        placeholder="Ingrese Precio"
        errorMessage={formik.errors.precio}
        containerStyle={styles.inputContainer}
        onChangeText={(texto) => formik.setFieldValue("precio", texto)}
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

      {validandoImagen && (
        <Overlay isVisible={true} overlayStyle={styles.overlayValidando}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Validando imagen...</Text>
        </Overlay>
      )}

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
