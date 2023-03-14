import { useRouter } from "next/router";
import styled from "styled-components";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Wrapper = styled.div`
  display: flex;
  gap: 2em;
  border-top: 1px solid lightgray;
  width: 100%;
  justify-content: center;
  padding-top: 1em;
`;

const Button1 = styled.div`
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

const CurrentPage = styled(Button1)`
  border: 3px solid var(--WALMART-BLUE);
  text-align: center;
  font-weight: bolder;
`;

const Button2 = styled(Button1)`
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
    <Wrapper>
      {pagination.hasPrevPage && (
        <Button2
          onClick={() => {
            router.query.page = String(pagination.page - 1);
            router.push(router);
          }}
        >
          <SlArrowLeft />
        </Button2>
      )}
      <CurrentPage
        onClick={() => {
          router.query.page = String(pagination.page);
          router.push(router);
        }}
      >
        {pagination.page}
      </CurrentPage>
      {pagination.page + 1 < pagination.totalPages && (
        <Button1
          onClick={() => {
            router.query.page = String(pagination.page + 1);
            router.push(router);
          }}
        >
          {pagination.page + 1}
        </Button1>
      )}
      {pagination.page + 2 < pagination.totalPages && (
        <Button1
          onClick={() => {
            router.query.page = String(pagination.page + 2);
            router.push(router);
          }}
        >
          {pagination.page + 2}
        </Button1>
      )}
      {pagination.hasNextPage && (
        <Button2
          onClick={() => {
            router.query.page = String(pagination.page + 1);
            router.push(router);
          }}
        >
          <SlArrowRight />
        </Button2>
      )}
    </Wrapper>
  );
}
