import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "....";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function fileToGenerativePart(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: blob.type },
    };
}

export async function validarImagen(imageUri) {

        const imagePart = await fileToGenerativePart(imageUri);
        const prompt = "Is the image a trading card? Answer true or false, in lowercase and without '.' in the end ";

        const result = await model.generateContent([prompt, imagePart]);
        
        const response = await result.response;
        const text = await response.text();

        // Sanitizar el texto recibido, eliminando espacios y convirtiéndolo a minúsculas
        const sanitizedText = text.trim().toLowerCase();
        console.log(sanitizedText);

        // Comparar el texto con "true" y devolver el valor
        return sanitizedText === "true";  // Retorna true o false dependiendo del resultado

}


