import { Link } from "react-router-dom";

export interface DropdownList {
  href: string;
  text: string;
  sidetext?: string;
}

export type DropdownListProps = React.PropsWithChildren<{
  list: DropdownList[];
  onClick?(item: DropdownList): void;
}>;

export default function (props: DropdownListProps) {
  return (
    <ul className="dropdown-list">
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
    </ul>
  );
}
