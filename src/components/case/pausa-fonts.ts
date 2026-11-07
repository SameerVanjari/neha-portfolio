import { Libre_Franklin, Playfair_Display, Source_Serif_4 } from "next/font/google";

export const recordDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const recordSans = Libre_Franklin({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const recordSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
