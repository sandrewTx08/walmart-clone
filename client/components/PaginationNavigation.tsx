import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaginationList = styled.ul`
  display: flex;
  width: 250px;
  justify-content: space-between;
  margin: 0 auto;
  font-size: large;

  a {
    text-align: center;
    margin: auto;
  }
`;

const PaginationListItem = styled.li``;

const PaginationNavigationButton = styled.button`
  border: 2px solid var(--WALMART-BLUE);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;

  &:hover {
    background-color: #b3b3b3;
  }
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
              <MdOutlineNavigateBefore />
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
              <MdOutlineNavigateNext />
            </PaginationNextPage>
          </PaginationListItem>
        )}
      </PaginationList>
    </nav>
  );
}
