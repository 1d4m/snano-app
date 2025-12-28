type SnakeToCamel<S extends string> =
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
    : S;

type Camelize<T> =
  T extends readonly unknown[]
    ? { [K in keyof T]: Camelize<T[K]> }
    : T extends object
      ? {
          [K in keyof T as SnakeToCamel<K & string>]: Camelize<T[K]>;
        }
      : T;

export type { Camelize };