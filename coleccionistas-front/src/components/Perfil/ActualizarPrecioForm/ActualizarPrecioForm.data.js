import * as Yup from "yup";

export function initialValues() {
  return {
    precio: "",
  };
}

export function validationSchema() {
  return Yup.object({
    precio: Yup.number()
      .required("El precio es obligatorio")
      .positive("El precio debe ser un número positivo")
      .test(
        "is-decimal",
        "El precio puede tener hasta dos decimales",
        (value) => /^\d+(\.\d{1,2})?$/.test(value)
      ),
  });
}
