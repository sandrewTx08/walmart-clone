import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaginationList = styled.ul`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  width: 60%;
  gap: 1em;
  margin: 0 auto;

  a {
    text-align: center;
    margin: auto;
  }
`;

const PaginationListItem = styled.li``;

const PaginationNavigationButton = styled.button`
  padding: 1em;
`;

const PaginationNextPage = styled(PaginationNavigationButton)``;

const PaginationLastPage = styled(PaginationNavigationButton)``;

// Graphql dont support generics
export default function (props: { totalPages: number; page: number }) {
  const navigate = useNavigate();

  return (
    <nav>
      <PaginationList>
        {props.page !== 1 && (
          <PaginationListItem>
            <PaginationLastPage
              onClick={() => {
                navigate({ search: "?page=" + (props.page - 1), pathname: "" });
              }}
            >
              Prev page
            </PaginationLastPage>
          </PaginationListItem>
        )}
        {[
          props.page,
          ...[
            props.totalPages > 0 && [
              props.page + 1 < props.totalPages && props.page + 1,
              props.page + 2 < props.totalPages && props.page + 2,
            ],
          ],
          props.totalPages !== props.page && props.totalPages,
        ]
          .filter((page) => typeof page === "number")
          .map((page, index) => (
            <PaginationNavigationButton
              onClick={() => {
                navigate({ search: "?page=" + page, pathname: "" });
              }}
              key={index}
            >
              {page}
            </PaginationNavigationButton>
          ))}
        {props.page < props.totalPages && (
          <PaginationListItem>
            <PaginationNextPage
              onClick={() => {
                navigate({ search: "?page=" + (props.page + 1), pathname: "" });
              }}
            >
              Next page
            </PaginationNextPage>
          </PaginationListItem>
        )}
      </PaginationList>
    </nav>
  );
}
