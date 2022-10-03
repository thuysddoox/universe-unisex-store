import { useCallback, useReducer } from "react";

/**
 * Only use as last resort!
 * DON'T OVERUSE!!
 * @description force function component to update (re-render) itself.
 * @see https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
 */
export const useForceUpdate = () => {
  const [_, mutate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useCallback(() => mutate(), []);
  return forceUpdate;
}