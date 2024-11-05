import * as Yup from "yup";

export function initialValues() {
  return {
    titulo: ""
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string()
      .required("El título es obligatorio")
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(50, "El título no puede tener más de 50 caracteres")
  });
}
