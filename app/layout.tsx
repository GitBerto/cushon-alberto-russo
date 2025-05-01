import React from 'react';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/registry';
import GlobalStyles from '../styles/GlobalStyles';
import { InvestmentProvider } from '../context/InvestmentContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '../components/ui/Container';

export const metadata: Metadata = {
  title: 'Cushon ISA Investment',
  description: 'Invest in your future with Cushon ISA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <InvestmentProvider>
            <Header />
            <main>
              <Container>
                {children}
              </Container>
            </main>
            <Footer />
          </InvestmentProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}