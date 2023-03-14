import { useRouter } from "next/router";
import styled from "styled-components";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const A = styled.div`
  display: flex;
  gap: 2em;
  border-top: 1px solid lightgray;
  width: 100%;
  justify-content: center;
  padding-top: 1em;
`;

const B = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const CC = styled(B)`
  border: 3px solid var(--WALMART-BLUE);
  text-align: center;
  font-weight: bolder;
`;

const G = styled(B)`
  color: var(--WALMART-BLUE);
  border: 1px solid lightgray;

  &:hover {
    border: 1px solid black;
    background-color: white;
  }
`;

export default function C({ pagination }) {
  const router = useRouter();

  return (
    <A>
      {pagination.hasPrevPage && (
        <G
          onClick={() => {
            router.query.page = String(pagination.page - 1);
            router.push(router);
          }}
        >
          <SlArrowLeft />
        </G>
      )}
      <CC
        onClick={() => {
          router.query.page = String(pagination.page);
          router.push(router);
        }}
      >
        {pagination.page}
      </CC>
      {pagination.page + 1 < pagination.totalPages && (
        <B
          onClick={() => {
            router.query.page = String(pagination.page + 1);
            router.push(router);
          }}
        >
          {pagination.page + 1}
        </B>
      )}
      {pagination.page + 2 < pagination.totalPages && (
        <B
          onClick={() => {
            router.query.page = String(pagination.page + 2);
            router.push(router);
          }}
        >
          {pagination.page + 2}
        </B>
      )}
      {pagination.hasNextPage && (
        <G
          onClick={() => {
            router.query.page = String(pagination.page + 1);
            router.push(router);
          }}
        >
          <SlArrowRight />
        </G>
      )}
    </A>
  );
}
