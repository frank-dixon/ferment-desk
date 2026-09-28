/** @type {import('tailwindcss').Config} */
/** Ferment Desk — cream/paper light shell; void* remapped so class names keep working */
module.exports = {
  content: ['./docs/**/*.{html,js}', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#F3EEE4',
          soft: '#EDE6DA',
          card: '#FAF7F2',
          elev: '#E8E0D4',
        },
        sea: {
          DEFAULT: '#0B8A8F',
          soft: '#087277',
          dim: '#065F63',
          mist: 'rgba(11, 138, 143, 0.12)',
        },
        action: {
          DEFAULT: '#4F63C7',
          soft: '#3D4FA8',
          dim: '#35448F',
          mist: 'rgba(79, 99, 199, 0.12)',
        },
        ink: {
          DEFAULT: '#1C1916',
          muted: '#5C564E',
          faint: '#8A847A',
        },
        rule: {
          DEFAULT: '#D6CDBE',
          soft: '#E4DDD0',
        },
      },
      fontFamily: {
        display: [
          '"Space Grotesk"',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 25, 22, 0.05), 0 8px 24px rgba(28, 25, 22, 0.06)',
        glow: '0 0 28px rgba(11, 138, 143, 0.10)',
      },
      borderRadius: {
        desk: '0.875rem',
      },
    },
  },
  plugins: [],
};
