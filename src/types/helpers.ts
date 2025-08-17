export type ImageResource = {
  url: string; // URL of the image or icon
  width?: number; // Optional, width of the image in pixels
  height?: number; // Optional, height of the image in pixels
  alt?: string; // Optional, alternative text for the image
  color?: string; // Optional, color to be applied to image
};

export type Amount = {
  value: number; // Amount in smallest currency unit (e.g., cents)
  currency: string; // ISO 4217 currency code (USD, EUR, etc.)
  currencySign?: string;
  fractionFactor: number; // We divide by this to get the value in units
};
