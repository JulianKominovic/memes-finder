export interface Response {
  stat: number
  items: Item[]
  itemsRequested: number
}

export interface Item {
  ID: number
  type: number
  title: string
  tags: string
  url: string
  timestamp: number
  votes: number
  positiveVotes: number
  uploaderName: string
  uploaderID: number
  rating: number
  width: number
  height: number
  repostedItemID: any
  urlWebp?: string
  thumbnailURL: string
  thumbnailURLWebp: string
  titleToSlug: string
  previewURL?: string
  previewURLWebp?: string
}

export type MappedMemes = {
  title: string
  url: string
}
