export type MaybeGetter<T> = T | (() => T)

export interface Options {
  input?: string
  output?: string
  filename?: MaybeGetter<string>
}
