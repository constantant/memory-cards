export const groupEntityName = 'Group';

export interface Group {
  id: number;
  name: string;
}

export const groupSortComparer = (a: Group, b: Group) => a.name < b.name ? -1 : 1;
