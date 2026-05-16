export const integrationConfig = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
};

export const isGoogleMapsReady = Boolean(integrationConfig.googleMapsApiKey);
export const isRazorpayReady = Boolean(integrationConfig.razorpayKeyId);
