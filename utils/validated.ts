export type Validated<T> = {
    validatee: T;
    error: string | null;
  };
  
  export function valid<T>(validatee: T): Validated<T> {
    return { validatee, error: null };
  }
  
  export function isValid<T>(validated: Validated<T>): boolean {
    return validated.error === null;
  }
  