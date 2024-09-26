// Yup es una dependencia para validaciones de formularios
import * as Yup from 'yup';

// Devuelve un JSON con las key:valorInicial del form
// Sintaxis
// clave: valorInicial
export function initialValues() {
    return ({
        mail: "",
        password: "",
        edad: "",
        nombre: "",
        apellido: "",
    })
}

// Devuelve un JSON con las validaciones del form (desde el front)
// Sintaxis
// clave: validaciones
export function validationSchema() {
    const validaciones = Yup.object({
        mail: Yup.string().email("Debe tener un formato de mail correcto").required("El mail es obligatorio"),
        password: Yup.string().min(6, "La contraseña debe contener al menos 6 caracteres").matches(/\d/, "La contraseña debe contener al menos un número").required("La contraseña es obligatoria"),
        edad: Yup.number().typeError("La edad debe ser un numero").integer("La edad debe ser un numero entero").min(18, "La edad minima es de 18 años").required("La edad es obligatoria"),
        nombre: Yup.string().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras").required("El nombre es obligatorio"),
        apellido: Yup.string().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras").required("El apellido es obligatorio"),
    });
    return validaciones;
}

