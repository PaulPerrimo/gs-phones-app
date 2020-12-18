export type NewState<T> = Partial<T> | ((state: T) => T);

export const genericReducer = <T extends {}>(state: T, newState: NewState<T>): T =>
  typeof newState === "function" ? newState(state) : { ...state, ...newState };

export type StateReducer<T> = (state: T, newState: NewState<T>) => T;
