import styled from "styled-components";

export const SideDetails = styled.div`
  padding: 1em;
  width: 40%;
  word-break: break-all;
  max-height: 400px;
  min-width: 300px;
  z-index: 100;
  background-color: white;

  div {
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    width: 50%;
  }
`;
