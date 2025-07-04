import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouTube Sentiment Explorer',
  description: 'Analyze YouTube audience sentiment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-pink-50 text-gray-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}
