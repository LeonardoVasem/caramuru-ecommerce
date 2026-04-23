import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import WhatsAppFab from '@/components/storefront/WhatsAppFab';
import BottomNavigation from '@/components/storefront/BottomNavigation';

export default function StorefrontLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNavigation />
      <WhatsAppFab />
    </>
  );
}
