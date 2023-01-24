import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownList = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
  border-radius: 1em;
  box-shadow: var(--SOFT-SHADOW);
  z-index: 300;

  li a {
    padding: 0.5em;
    display: block;
  }

  li a div {
    display: inline;
    margin: 1em;
  }

  li a div.dropdown-list-sidetext {
    color: gray;
  }

  .dropdown-list li a:hover {
    border-left: 1em;
  }
`;

export interface IDropdownList {
  href: string;
  text: string;
  sidetext?: string;
}

export type DropdownListProps = React.PropsWithChildren<{
  list: IDropdownList[];
  onClick?(item: IDropdownList): void;
}>;

export default function (props: DropdownListProps) {
  return (
    <DropdownList>
      {props.list.map((item) => (
        <li key={item.text}>
          <Link
            to={item.href}
            onClick={() => {
              if (props.onClick) {
                props.onClick(item);
              }
            }}
          >
            <div>{item.text}</div>
            <div className="dropdown-list-sidetext">{item.sidetext}</div>
          </Link>
        </li>
      ))}
    </DropdownList>
  );
}
