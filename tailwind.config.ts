import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-1': '#FF7B00',
        'orange-2': '#FF8D21',
        'orange-3': '#FFA652',
        'orange-4': '#FFB76B',
        'orange-5': '#FFCD90',
        'orange-6': '#FFF4DF'
      },
    },
  },
  plugins: [],
};
export default config;
