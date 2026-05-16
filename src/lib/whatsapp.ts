type WhatsAppPayload = {
  to: string;
  body: string;
};

const whatsappApiUrl = process.env.WHATSAPP_API_URL;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

export async function sendWhatsAppTextMessage(payload: WhatsAppPayload) {
  if (!whatsappApiUrl || !phoneNumberId || !accessToken) {
    console.info(`[WhatsApp stub] to=${payload.to} body=${payload.body}`);
    return { delivered: false, reason: "missing-env" as const };
  }

  const response = await fetch(`${whatsappApiUrl}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: payload.to,
      type: "text",
      text: {
        preview_url: false,
        body: payload.body,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return { delivered: false, reason: errorBody };
  }

  return { delivered: true };
}
