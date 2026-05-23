import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss'
import { navLinks, socialLinks } from './site.config'

const compoundLinks = [...navLinks, ...socialLinks]
const safeNavIcon = compoundLinks.map(link => link.icon)

export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    // Core layout utilities
    'flex-center': 'flex items-center justify-center',
    'text-title': 'text-xl sm:text-3xl',
    'hover': 'op-70 hover:op-100 cursor-pointer transition-opacity',
    'deep-hover': 'op-20 hover:op-70 cursor-pointer transition-opacity',
    'bd': 'border-gray-500 border-1',
    'text-deep': 'c-black dark:c-white',

    // New artistic shortcuts
    'glass-card': 'bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl shadow-[var(--shadow-soft)]',
    'elevated-card': 'bg-[var(--card-bg)] rounded-xl shadow-[var(--shadow-elevated)] border border-[var(--border-subtle)] transition-all duration-300',
    'gradient-text': 'bg-gradient-to-r from-[#4a7c6f] via-[#6b9e8a] to-[#8fc4ab] bg-clip-text text-transparent',
    'accent-border': 'border border-[var(--common-bd)]',
    'accent-bg': 'bg-[var(--common-bg)]',

    // Button styles
    'btn-primary': 'px-5 py-2.5 bg-gradient-to-r from-[#4a7c6f] to-[#6b9e8a] text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:shadow-[#4a7c6f]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0',
    'btn-ghost': 'px-5 py-2.5 bg-transparent text-[var(--primary)] border border-[var(--border-subtle)] rounded-lg font-medium hover:bg-[var(--common-bg)] hover:border-[var(--common-bd)] transition-all duration-300',

    // Container styles
    'content-container': 'max-w-70ch mx-auto px-4 sm:px-6 lg:px-8',
    'section-spacing': 'py-8 sm:py-12 lg:py-16',

    // Link styles
    'nav-link': 'text-[var(--primary)] op-70 hover:op-100 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#4a7c6f] after:to-[#8fc4ab] hover:after:w-full after:transition-all after:duration-300',
    'link-accent': 'text-[#4a7c6f] dark:text-[#8fc4ab] no-underline hover:underline underline-offset-4 decoration-2',

    // Badge/Tag styles
    'tag': 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--common-bg)] text-[#4a7c6f] border border-[var(--common-bd)] hover:border-[#4a7c6f] transition-colors duration-200',
    'badge': 'inline-flex items-center px-2 py-0.5 text-xs rounded bg-[#4a7c6f]/10 text-[#4a7c6f] dark:bg-[#8fc4ab]/10 dark:text-[#8fc4ab]',
  },
  theme: {
    colors: {
      primary: 'var(--primary)',
      container: 'var(--c-bg)',
      accent: '#4a7c6f',
      'accent-light': '#8fc4ab',
      'accent-dark': '#3d6358',
    },
    extend: {
      borderRadius: {
        common: 'var(--common-rd)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
        'glow': '0 0 20px rgba(105, 159, 138, 0.3)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.6s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
        'slide-right': 'slide-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter:400,500,600,700', 'Noto Sans Simplified Chinese:400,500,600,700'],
        mono: ['Fira Code:400,500'],
        hand: ['Caveat:400,500,600,700'],
      },
    }),
    presetAttributify (),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '1.2em',
        'height': '1.2em',
      },
    }),
  ],
  safelist: [...safeNavIcon],
  transformers: [
    transformerVariantGroup(),
  ],
})