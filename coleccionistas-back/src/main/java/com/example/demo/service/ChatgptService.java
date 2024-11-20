package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatgptService {

    @Value("${chatgpt.api.url}")
    private String chatGptApiUrl;

    @Value("${chatgpt.api.key}")
    private String chatGptApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String obtenerFiabilidadDeTarjeta(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return "Error: la URL de la imagen no puede estar vacía.";
        }
    
        // Validar la clave de la API
        if (chatGptApiKey == null || chatGptApiKey.isEmpty()) {
            return "Error: la clave de la API de ChatGPT no está configurada.";
        }
    
        // Crear la estructura del contenido del mensaje
        Map<String, Object> textContent = new HashMap<>();
        textContent.put("type", "text");
        textContent.put("text", "Dame un porcentaje de fiabilidad. SOLO puedes contestar con un porcentaje, como `X% de autenticidad`.");
    
        Map<String, Object> imageContent = new HashMap<>();
        imageContent.put("type", "image_url");
        Map<String, String> imageDetails = new HashMap<>();
        imageDetails.put("url", imageUrl);
        imageDetails.put("detail", "high");
        imageContent.put("image_url", imageDetails);
    
        List<Map<String, Object>> contentList = List.of(textContent, imageContent);
    
        // Crear el mensaje con contenido de texto e imagen
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", contentList);
    
        // Crear la lista de mensajes
        Map<String, Object> requestPayload = new HashMap<>();
        requestPayload.put("model", "gpt-4o-mini");
        requestPayload.put("messages", List.of(message));
        requestPayload.put("max_tokens", 300);
    
        // Preparar los headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + chatGptApiKey);
    
        // Crear la entidad de la solicitud
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestPayload, headers);
    
        try {
            // Enviar la solicitud a la API de OpenAI
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    chatGptApiUrl, HttpMethod.POST, requestEntity, String.class);
    
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
            // Parsear el JSON de la respuesta para extraer el contenido
            JSONObject jsonResponse = new JSONObject(responseEntity.getBody());
            String responseContent = jsonResponse.getJSONArray("choices")
                                                 .getJSONObject(0)
                                                 .getJSONObject("message")
                                                 .getString("content");
            return responseContent;      
            } 
            else {
                return "Error: la solicitud no fue exitosa. Código de estado: " + responseEntity.getStatusCode();
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 429) {
                return "Error: se ha superado la cuota de solicitudes. Revisa tu plan y facturación.";
            }
            return "Error de cliente: " + e.getMessage();
        } catch (HttpServerErrorException e) {
            return "Error de servidor: " + e.getMessage();
        } catch (RestClientException e) {
            return "Error al comunicarse con la API de ChatGPT: " + e.getMessage();
        }
    }

    public void imprimirModelosDisponibles() {
        // URL de la API para listar modelos
        String listarModelosUrl = "https://api.openai.com/v1/models";
    
        // Preparar los headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + chatGptApiKey);
    
        // Crear la entidad de la solicitud
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
    
        try {
            // Enviar la solicitud GET a la API para listar los modelos
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    listarModelosUrl, HttpMethod.GET, requestEntity, String.class);
    
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                // Imprimir la respuesta en la consola de depuración
                System.out.println("Modelos disponibles: " + responseEntity.getBody());
            } else {
                System.out.println("Error al obtener los modelos. Código de estado: " + responseEntity.getStatusCode());
            }
        } catch (RestClientException e) {
            System.out.println("Error al comunicarse con la API de OpenAI para listar modelos: " + e.getMessage());
        }
    }
    
}
