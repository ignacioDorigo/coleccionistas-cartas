import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import { API_KEY_MERCADO_PAGO } from './ipHost';

export const mpIntegration = async (publicacion) => {

  const redirectUri = Linking.createURL('/'); 

  const preferencia = {
    items: [
      {
        title: `${publicacion.titulo}`,
        description: `${publicacion.descripcion}`,
        quantity: 1,
        currency_id: "ARS",
        unit_price: publicacion.precio,
      },
    ],
    back_urls: {
      success: redirectUri, 
      failure: redirectUri,
      pending: redirectUri,
    },
  };

  try {
    
    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY_MERCADO_PAGO}`,
        },
        body: JSON.stringify(preferencia),
      }
    );

    const data = await response.json();

    
    const result = await WebBrowser.openAuthSessionAsync(data.init_point, redirectUri);

    return result.type;

  } catch (error) {
    console.error('Error en la integración con Mercado Pago:', error);
  }
};
