'use client';
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '../components/ui/Container';
import { Card, CardContent } from '../components/ui/Card';
import ButtonLink from '@/components/ui/ButtonLink';

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default function Home() {
  return (
    <div>
      <HeroSection>
        <h1>Invest in your future with Cushon ISA</h1>
        <p>
          The Cushon ISA platform allows you to invest simply
          and intelligently with access to a range of selected funds.
        </p>
        <ButtonLink href="/invest">Start investing</ButtonLink>
      </HeroSection>

      <section>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>The benefits of investing with Cushon</h2>
          <Row>
            <Col xs={12} md={4} style={{ marginBottom: '1.5rem' }}>
              <FeatureCard>
                <CardContent>
                  <h3>Choose from selected funds</h3>
                  <p>
                    Access a range of selected funds with different levels
                    of risk and potential returns.
                  </p>
                </CardContent>
              </FeatureCard>
            </Col>
            <Col xs={12} md={4} style={{ marginBottom: '1.5rem' }}>
              <FeatureCard>
                <CardContent>
                  <h3>Tax benefits</h3>
                  <p>
                    Take advantage of ISA tax benefits to grow
                    your investment without paying taxes on returns.
                  </p>
                </CardContent>
              </FeatureCard>
            </Col>
            <Col xs={12} md={4} style={{ marginBottom: '1.5rem' }}>
              <FeatureCard>
                <CardContent>
                  <h3>Simple management</h3>
                  <p>
                    Easily monitor and manage your investments through
                    our intuitive platform.
                  </p>
                </CardContent>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>Ready to invest?</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Start your journey towards financial security with Cushon ISA
        </p>
        <p>
          <ButtonLink href="/invest">Go to investment area</ButtonLink>
        </p>
      </section>
    </div>
  );
}