import React from "react";

export interface NavItem {
  text: string;
  icon: React.JSX.Element | string;
  link: string;
  // subNav?: NavItem[];
  authorization: string[];
}
