import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "hsl(var(--bg))", secondary: "hsl(var(--bg-secondary))", tertiary: "hsl(var(--bg-tertiary))" },
        fg: { DEFAULT: "hsl(var(--fg))", secondary: "hsl(var(--fg-secondary))", muted: "hsl(var(--fg-muted))" },
        border: { DEFAULT: "hsl(var(--border))", hover: "hsl(var(--border-hover))" },
        accent: { DEFAULT: "hsl(var(--accent))", fg: "hsl(var(--accent-fg))", hover: "hsl(var(--accent-hover))", muted: "hsl(var(--accent-muted))" },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        canadian: "hsl(var(--canadian-red))",
      },
      borderRadius: { DEFAULT: "var(--radius)" },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
