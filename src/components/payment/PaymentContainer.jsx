
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const PaymentContainer = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentContainer;
