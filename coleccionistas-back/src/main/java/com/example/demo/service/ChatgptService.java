package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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

        // Crear el prompt con el enlace de la imagen
        String prompt = "¿Qué tan seguros estamos de que esta carta es real? Contesta con: Estamos X% seguros de que esta carta es real. Link a la carta: " + imageUrl;

        // Crear el payload de la solicitud
        Map<String, Object> requestPayload = new HashMap<>();
        requestPayload.put("model", "gpt-3.5-turbo"); // Ajusta el modelo según sea necesario
        requestPayload.put("prompt", prompt);
        requestPayload.put("max_tokens", 50); // Configura un número apropiado de tokens
        requestPayload.put("temperature", 0.7); // Controla la aleatoriedad de la respuesta

        // Preparar los headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + chatGptApiKey);

        // Crear la entidad de la solicitud
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestPayload, headers);

        try {
            // Enviar la solicitud a la API de ChatGPT
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    chatGptApiUrl, HttpMethod.POST, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return responseEntity.getBody();
            } else {
                return "Error: la solicitud no fue exitosa. Código de estado: " + responseEntity.getStatusCode();
            }
        } catch (RestClientException e) {
            return "Error al comunicarse con la API de ChatGPT: " + e.getMessage();
        }
    }
}
