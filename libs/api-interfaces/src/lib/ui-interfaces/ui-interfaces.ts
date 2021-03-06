// for dropdown list
export interface Action {
  label: string;
  link?: string;
  routerLink?: string;
  event?: any;
  icon?: string;
  divider?: boolean;
  image?: {
    src: string;
    alt: string;
  }
}
// for dropdown megamenu
export interface MegaMenuColumn {
    label: string;
    actions: Action[];
}

export interface TimelineItem {
  title: string;
  time: string;
  description: string;
}

export type Timeline = TimelineItem[];

export interface TableColumn {
  key?: string;
  title: string;
}

export type TableColumns = TableColumn[];

