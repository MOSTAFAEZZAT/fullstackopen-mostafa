export const assertNever = (value: never): never => {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
};