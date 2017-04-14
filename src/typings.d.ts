/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface IGroupItem {
  id?: number
  name: string
}

interface ICardInfo {
  id?: number
  groupId: number
  word: string
  translated: string
  examples?: string
}

interface IFormData {
  group: {
    id?: number,
    name?: string
  },
  word: string
  translated: string
  examples?: string
}
