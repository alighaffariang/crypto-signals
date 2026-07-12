import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Noir Ember | Cinematic Gourmet Burgers',
  description: 'A luxury cinematic burger restaurant experience with flame-grilled signatures, premium ingredients, and immersive glassmorphism design.',
  openGraph: { title: 'Noir Ember', description: 'Luxury gourmet burgers presented like a film trailer.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
