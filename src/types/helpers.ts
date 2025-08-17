export type ImageResource = {
  url: string; // URL of the image or icon
  width?: number; // Optional, width of the image in pixels
  height?: number; // Optional, height of the image in pixels
  alt?: string; // Optional, alternative text for the image
  color?: string; // Optional, color to be applied to image
};

export type Currency = {
  type: string; // ISO 4217 currency code (INR, SGD ...)
  sign?: string;
  fractionFactor: number; // We divide by this to get the value in units
};
