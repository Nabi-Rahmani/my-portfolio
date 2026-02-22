import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                accent: 'var(--accent)',
                'accent-hover': 'var(--accent-hover)',
                'accent-muted': 'var(--accent-muted)',
                'surface-primary': 'var(--bg-primary)',
                'surface-secondary': 'var(--bg-secondary)',
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
                border: 'var(--border-color)',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            fontSize: {
                'display': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
                'h1': ['3rem', { lineHeight: '1.15', fontWeight: '700' }],
                'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
                'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6' }],
                'body': ['1rem', { lineHeight: '1.6' }],
                'caption': ['0.875rem', { lineHeight: '1.5' }],
                'small': ['0.75rem', { lineHeight: '1.5' }],
            },
        },
    },
    plugins: [],
}
export default config
