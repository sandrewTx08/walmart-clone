import styled from "styled-components";

const Footer = styled.footer`
  font-size: small;
  display: flex;
  color: black;
  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    height: 100px;
    flex-wrap: wrap;
    color: white;
    flex-direction: row;
    justify-content: center;
    background-color: var(--WALMART-BLUE-DARK);
    align-content: center;
  }

  @media only screen and (max-width: 1024px) {
    border-top: 4px solid lightgray;
  }
`;

const FooterText = styled.a`
  white-space: nowrap;
  display: inline;
  margin: 1em;
`;

export default function C() {
  return (
    <Footer>
      <FooterText>All Departments</FooterText>
      <FooterText>Store Directory</FooterText>
      <FooterText>Careers</FooterText>
      <FooterText>Our Company</FooterText>
      <FooterText>Sell on Walmart.com</FooterText>
      <FooterText>Help</FooterText>
      <FooterText>COVID-19 Vaccine Scheduler</FooterText>
      <FooterText>Product Recalls</FooterText>
      <FooterText>Accessibility</FooterText>
      <FooterText>Tax Exempt Program</FooterText>
      <FooterText>Get the Walmart App</FooterText>
      <FooterText>Sign-up for Email</FooterText>
      <FooterText>Safety Data Sheet</FooterText>
      <FooterText>Terms of Use</FooterText>
      <FooterText>Privacy & Security</FooterText>
      <FooterText>CA Privacy Rights</FooterText>
    </Footer>
  );
}
