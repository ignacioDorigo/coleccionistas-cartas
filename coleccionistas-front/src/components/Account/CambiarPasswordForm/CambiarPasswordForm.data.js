import * as Yup from "yup";

export function initialValues() {
  return {
    actual: "",
    nueva: "",
    repetirNueva: "",
  };
}

export function validationSchema() {
  return Yup.object({
    actual: Yup.string().required("La contraseña actual es obligatoria"),
    nueva: Yup.string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
      .required("La nueva contraseña es obligatoria"),
    repetirNueva: Yup.string()
      .oneOf([Yup.ref("nueva")], "Las contraseñas no coinciden")
      .required("Es necesario repetir la nueva contraseña"),
  });
}
