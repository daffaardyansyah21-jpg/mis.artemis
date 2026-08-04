import type { Metadata, Viewport } from 'next';
import './globals.css';
import { APP_CONFIG } from '@/lib/constants';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: ['TKA', 'UTBK', 'SNBT', 'latihan soal', 'belajar online', 'persiapan ujian', 'SMA', 'PTN'],
  authors: [{ name: 'Artemis Team' }],
  creator: 'Artemis',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    siteName: APP_CONFIG.name,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#060612',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        {/* Aurora background blobs */}
        <div className="aurora-bg">
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
        {/* Cyber grid overlay */}
        <div className="cyber-grid-overlay" />
        {/* Page content */}
        {children}
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 30, 0.95)',
              color: '#e8e8f0',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              backdropFilter: 'blur(20px)',
              fontFamily: "'Space Grotesk', sans-serif",
            },
            success: { iconTheme: { primary: '#10f5a0', secondary: '#060612' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#060612' } },
          }}
        />
      </body>
    </html>
  );
}
