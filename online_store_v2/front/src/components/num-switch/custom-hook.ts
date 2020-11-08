import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";

export const useDebounce = (
  action: (...args: any[]) => any,
  quantity: number | undefined
) => {
  const [stateQuantity, setStateQuantity] = useState<number | "" | undefined>(
    quantity
  );

  const debouncedFunction = useConstant(() =>
    AwesomeDebouncePromise(action, 500)
  );
  return {
    debouncedFunction,
    stateQuantity,
    setStateQuantity,
  };
};
