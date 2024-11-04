import * as Yup from "yup";

export function initialValues() {
  return {
    descripcion: "",
  };
}

export function validationSchema() {
  return Yup.object({
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede tener más de 200 caracteres"),
  });
}
