import styled from "styled-components";

export const Ul = styled.ul`
  z-index: 1000;
  position: absolute;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 1em;
  padding: 12px;
`;

export const Li = styled.li`
  padding: 6px 1em;

  &::before:hover {
    background: #0071dc;
    border-bottom-right-radius: 0.125rem;
    border-top-right-radius: 0.125rem;
    bottom: 4px;
    content: "";
    display: block;
    left: 0;
    position: absolute;
    top: 4px;
    width: 4px;
  }
`;
