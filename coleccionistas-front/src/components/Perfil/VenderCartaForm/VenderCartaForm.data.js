import * as Yup from "yup";

export function initialValues() {
  return {
    titulo: "",
    descripcion: "",
    precio: "",
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string()
      .required("El título es obligatorio")
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(50, "El título no puede tener más de 50 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede tener más de 200 caracteres"),
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
