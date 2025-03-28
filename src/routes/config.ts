import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode,
  state: string,
  allowedRoles: string[],
  index?: boolean,
  path?: string,
  child?: RouteType[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};