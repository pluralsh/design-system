export type PrefixString<
  T extends string,
  Prefix extends string
> = `${Prefix}${T}`

export type PrefixKeys<T extends object, Prefix extends string, Val = void> = {
  [key in keyof T as PrefixString<key & string, Prefix>]: Val extends void
    ? T[key]
    : Val
}

export type SuffixString<
  T extends string,
  Suffix extends string
> = `${T}${Suffix}`

export type SuffixKeys<T extends object, Suffix extends string, Val = void> = {
  [key in keyof T as SuffixString<key & string, Suffix>]: Val extends void
    ? T[key]
    : Val
}

export function prefixKeys<T extends object, Prefix extends string>(
  obj: T,
  prefix: Prefix
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [`${prefix}${key}`, val])
  ) as PrefixKeys<T, Prefix>
}

export function suffixKeys<T extends object, Suffix extends string>(
  obj: T,
  suffix: Suffix
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [`${key}${suffix}`, val])
  ) as SuffixKeys<T, Suffix>
}
