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
      boxShadow: {
        'custom': '20px 30px 30px -15px rgba(0, 0, 0, 0.3)',
        'custom-blue-light': '30px 30px 20px -15px rgba(35, 123, 223, 1)',
        'custom-blue': '30px 30px 20px -15px rgba(27, 98, 179, 1)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blueLighter: {
          DEFAULT: "var(--blue-lighter)",
        },
        blue: {
          DEFAULT: "var(--blue)",
        },
        blueDark: {
          DEFAULT: "var(--blue-dark)",
        },
        blueDarker: {
          DEFAULT: "var(--blue-darker)",
        },
        gray: {
          DEFAULT: "var(--gray)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
        },
        error: {
          DEFAULT: "var(--error)",
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
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        '.backdrop-blur-md': {
          '--backdrop-blur-md': '15px', // Ajustez la quantité de flou souhaitée ici
          'backdrop-filter': 'blur(var(--backdrop-blur-md))',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}