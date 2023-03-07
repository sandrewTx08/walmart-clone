import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";

const A = styled.input`
  width: 100%;
  padding: 10px;
  border: 0 solid;
  border-radius: 20px 0 0 20px;
`;

const B = styled.div`
  width: 100%;
  display: flex;
`;

const CC = styled.button`
  background-color: var(--WALMART-YALLOW);
  border: 0 solid;
  border-radius: 0 20px 20px 0;
  padding: 10px;
`;

export default function C({}) {
  return (
    <B>
      <A />
      <CC>
        <TfiSearch />
      </CC>
    </B>
  );
}
