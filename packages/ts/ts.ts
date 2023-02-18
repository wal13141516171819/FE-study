type UnionToIntersection<T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: infer U) => void
  ? U
  : never;
type Eg = UnionToIntersection<{ key1: string } | { key2: number }>;
