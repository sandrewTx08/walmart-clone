import styled from "styled-components";

const Img = styled.img`
  margin: 200px auto;
  display: block;
`;

export default function C() {
  return <Img src="/loading.gif" />;
}
