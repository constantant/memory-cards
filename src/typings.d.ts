interface IGroupItem {
  id?: number;
  name: string;
}

interface ICardInfo {
  id?: number;
  groupId: number;
  word: string;
  translated: string;
  examples: string;
}

interface IFormData {
  group: IFormGroupData;
  word: string;
  translated: string;
  examples: string;
}

interface IFormGroupData {
  id?: number;
  name: string;
}
