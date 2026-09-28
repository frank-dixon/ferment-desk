/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./docs/**/*.{html,js}', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0A0C10',
          soft: '#12151C',
          card: '#161A22',
          elev: '#1C212B',
        },
        sea: {
          DEFAULT: '#5FA8A0',
          soft: '#7BC0B8',
          dim: '#3D7A74',
          mist: 'rgba(95, 168, 160, 0.12)',
        },
        action: {
          DEFAULT: '#6B7FD7',
          soft: '#8A9AE3',
          dim: '#4A5BB8',
          mist: 'rgba(107, 127, 215, 0.14)',
        },
        ink: {
          DEFAULT: '#E8EAED',
          muted: '#9AA0A8',
          faint: '#6B7280',
        },
        rule: {
          DEFAULT: '#2A303C',
          soft: '#232833',
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
        card: '0 16px 48px rgba(0, 0, 0, 0.35)',
        glow: '0 0 32px rgba(95, 168, 160, 0.15)',
      },
      borderRadius: {
        desk: '0.875rem',
      },
    },
  },
  plugins: [],
};
