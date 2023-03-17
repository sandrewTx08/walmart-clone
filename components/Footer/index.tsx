import styled from "styled-components";

const A = styled.footer`
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

const CC = styled.a`
  white-space: nowrap;
  display: inline;
  margin: 1em;
`;

export default function C() {
  return (
    <A>
      <CC>All Departments</CC>
      <CC>Store Directory</CC>
      <CC>Careers</CC>
      <CC>Our Company</CC>
      <CC>Sell on Walmart.com</CC>
      <CC>Help</CC>
      <CC>COVID-19 Vaccine Scheduler</CC>
      <CC>Product Recalls</CC>
      <CC>Accessibility</CC>
      <CC>Tax Exempt Program</CC>
      <CC>Get the Walmart App</CC>
      <CC>Sign-up for Email</CC>
      <CC>Safety Data Sheet</CC>
      <CC>Terms of Use</CC>
      <CC>Privacy & Security</CC>
      <CC>CA Privacy Rights</CC>
    </A>
  );
}
