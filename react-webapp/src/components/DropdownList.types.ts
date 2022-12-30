import React from "react";

export interface DropdownList {
  link: string;
  text: string;
}

export type DropdownListProps = React.PropsWithChildren<{
  list: DropdownList[];
  clickOnListItem?(item: DropdownList): void;
}>;
