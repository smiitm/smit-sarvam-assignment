import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			color1: '#FCF9F2', // light
  			color2: '#F6F1E8', // light 2
  			color3: '#F0EADE', // light 3
  			color4: '#EAE5DA', // border color
  			color5: '#353534', // text color
  			color6: '#62615E', // text color mid
  			color7: '#8D8B88', // text color light
  		},
  		width: {
  			'2/5': '40%',
  			'3/5': '60%',
  		},
   	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
