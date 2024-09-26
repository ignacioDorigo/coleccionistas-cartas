import * as Yup from "yup";
export function initialValues() {
    return {
        mail: "",
        password: "",
        edad: "",
        nombre: "",
        apellido: "",
    }
}

export function validationSchema() {
    return Yup.object({
        mail: Yup.string().email("Debes poner un formato mail").required("El mail es obligatorio"),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required("La contraseña es obligatoria"),
        edad: Yup.number().typeError("La edad debe ser un numero").integer("La edad debe ser entera").min(18, "La edad minima es 18 años").max(100, "La edad maxima es 100 años").required("La edad es obligatoria"),
        nombre: Yup.string().required("El nombre es obligatorio"),
        apellido: Yup.string().required("El apellido es obligatorio"),
    })
}