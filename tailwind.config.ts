import type { Config } from "tailwindcss";
import { copper, neutral } from "./src/design-system/colors";
import { fontFamily, fontSize, lineHeight } from "./src/design-system/typography";
import { shadow, radius } from "./src/design-system/shadows";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        copper,
        neutral,
        surface: { DEFAULT: neutral[900], light: neutral[50] },
      },
      fontFamily: {
        serif: fontFamily.serifEn.split(", "),
        display: fontFamily.serifDisplay.split(", "),
        sans: fontFamily.sans.split(", "),
        mono: fontFamily.mono.split(", "),
      },
      fontSize: {
        display: fontSize.display,
        h1: fontSize.h1,
        h2: fontSize.h2,
        h3: fontSize.h3,
        body: fontSize.body,
        caption: fontSize.caption,
        "mono-sm": fontSize.monoSm,
      },
      lineHeight: {
        display: String(lineHeight.display),
        heading: String(lineHeight.heading),
        body: lineHeight.body,
      },
      boxShadow: { DEFAULT: shadow.base },
      borderRadius: { DEFAULT: radius.base },
    },
  },
  plugins: [],
};

export default config;
