import './globals.css';
import '../styles/punjabac-colors.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Wingz Impex | Food & Beverage Trading',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
