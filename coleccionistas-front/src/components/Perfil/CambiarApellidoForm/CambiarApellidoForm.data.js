import * as Yup from "yup";

export function initialValues() {
  return {
    apellido: "",
  };
}

export function validationSchema() {
  return Yup.object({
    apellido: Yup.string().required("El apellido es obligatorio"),
  });
}
