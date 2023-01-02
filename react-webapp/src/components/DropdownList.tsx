import { Link } from "react-router-dom";

export interface DropdownList {
  link: string;
  text: string;
  subtext?: string;
}

export type DropdownListProps = React.PropsWithChildren<{
  list: DropdownList[];
  clickOnListItem?(item: DropdownList): void;
}>;

export default function (props: DropdownListProps) {
  return (
    <ul className="dropdown-list">
      {props.list.map((item) => (
        <li key={item.text}>
          <Link
            to={item.link}
            onClick={() => {
              if (props.clickOnListItem) {
                props.clickOnListItem(item);
              }
            }}
          >
            <div>{item.text}</div>
            <div className="dropdown-list-subtext">
              {item.subtext || "Search"}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
