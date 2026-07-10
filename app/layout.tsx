import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'EMBER & CRYSTAL | Cinematic Gourmet Burgers', description: 'A luxury cinematic gourmet burger restaurant experience with crystal glassmorphism, fire, smoke, and premium ordering.', openGraph:{title:'EMBER & CRYSTAL',description:'Luxury cinematic gourmet burgers.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
