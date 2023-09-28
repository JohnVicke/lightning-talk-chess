export function exhaustive(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
