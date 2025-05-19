/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Custom cybernetic colors
        "ai-teal": {
          DEFAULT: "hsl(var(--ai-teal))",
          foreground: "hsl(var(--ai-teal-foreground))",
        },
        "quantum-blue": {
          DEFAULT: "hsl(var(--quantum-blue))",
          foreground: "hsl(var(--quantum-blue-foreground))",
        },
        "neural-purple": {
          DEFAULT: "hsl(var(--neural-purple))",
          foreground: "hsl(var(--neural-purple-foreground))",
        },
        "deep-space": {
          DEFAULT: "hsl(var(--deep-space))",
          foreground: "hsl(var(--deep-space-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: 1,
            filter: "brightness(1) blur(4px)",
          },
          "50%": { 
            opacity: 0.5,
            filter: "brightness(1.5) blur(8px)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "neural-network": {
          "0%": { 
            strokeDasharray: "1, 150",
            strokeDashoffset: "0",
            opacity: 0.2,
          },
          "50%": { 
            strokeDasharray: "90, 150",
            strokeDashoffset: "-35",
            opacity: 0.6,
          },
          "100%": { 
            strokeDasharray: "90, 150",
            strokeDashoffset: "-124",
            opacity: 0.2,
          },
        },
        "hologram-flicker": {
          "0%, 100%": { opacity: 1 },
          "33%": { opacity: 0.9 },
          "66%": { opacity: 0.8 },
          "73%": { opacity: 0.95 },
          "88%": { opacity: 0.85 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "neural-network": "neural-network 8s ease-in-out infinite",
        "hologram-flicker": "hologram-flicker 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(var(--cyber-grid-color1), transparent 1px), linear-gradient(to right, var(--cyber-grid-color1), transparent 1px)',
        'space-gradient': 'linear-gradient(to bottom, var(--deep-space-start), var(--deep-space-end))',
      },
      backdropFilter: {
        'glass': 'blur(16px) saturate(180%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 