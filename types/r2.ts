// R2 类型定义
export interface R2Object {
  key: string
  size: number
  etag: string
  uploaded: string
  httpEtag?: string
  storageClass: string
}

export interface ListResponse {
  objects: R2Object[]
  truncated: boolean
  cursor?: string
  delimitedPrefixes?: string[]
}
