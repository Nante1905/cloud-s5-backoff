import React from "react";
import { NavItem } from "./navItem.type";

export interface DropdownItem {
  text: string;
  icon: React.JSX.Element | string;
  subNav?: NavItem[];
  authorization: string[];
}
