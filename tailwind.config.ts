import type { Config } from 'tailwindcss'

// Custom Color Palette for GiftBasket
// Primary: Rose Quartz (warm, inviting, feminine)
// Secondary: Deep Purple (luxury, sophistication)
// Accent: Gold (premium, elegant)
// Neutral: Warm Gray (balance, professional)

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === Primary Colors - Rose Quartz (Gift/ Love theme) ===
        primary: {
          50: '#fef2f2',
          100: '#fde4e4',
          200: '#fcd6d6',
          300: '#fcb9b9',
          400: '#fb9393',
          500: '#f96868',
          600: '#e84f4f',
          700: '#c73a3a',
          800: '#a02f2f',
          900: '#802828',
          950: '#4b1515',
        },
        
        // === Secondary Colors - Deep Purple (Luxury/Sophistication) ===
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        
        // === Accent Colors - Gold (Premium/Elegance) ===
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        // Gift-Specific Colors
        gift: {
          red: '#e53e3e',
          pink: '#fc8181',
          purple: '#b794f4',
          blue: '#63b3ed',
          green: '#48bb78',
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        },
        
        // Category Colors
        category: {
          flowers: '#f687b3',
          chocolates: '#d69e2e',
          care: '#68d391',
          plants: '#48bb78',
          beauty: '#ed8936',
          custom: '#9f7aea',
          food: '#f6ad55',
          jewelry: '#ed64a6',
          home: '#4299e1',
        },
        
        // Occasion Colors
        occasion: {
          birthday: '#fc8181',
          anniversary: '#e53e3e',
          wedding: '#f6ad55',
          baby: '#68d391',
          graduation: '#4299e1',
          corporate: '#4a5568',
          holiday: '#ed64a6',
        },
        
        // Semantic Colors (for theme support)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 60px -15px rgba(0, 0, 0, 0.05)',
        'primary': '0 4px 14px 0 rgba(249, 104, 104, 0.39)',
        'secondary': '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
        'gold': '0 4px 14px 0 rgba(245, 158, 11, 0.39)',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--primary-400) 0%, var(--primary-600) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, var(--secondary-400) 0%, var(--secondary-600) 100%)',
        'gradient-gold': 'linear-gradient(135deg, var(--accent-400) 0%, var(--accent-600) 100%)',
        'gradient-gift': 'linear-gradient(135deg, #fc8181 0%, #9f7aea 50%, #4299e1 100%)',
      },
      
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary-600))',
              '&:hover': {
                color: 'hsl(var(--primary-700))',
              },
            },
            h1: {
              fontWeight: '800',
              fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
            },
            h2: {
              fontWeight: '700',
              fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
            },
            h3: {
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary-400))',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
