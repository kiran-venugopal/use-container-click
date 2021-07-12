import { MutableRefObject, useEffect } from "react";

export default function useContainerClick(
  ref: MutableRefObject<HTMLDivElement>,
  onClickOutSide: (event: Event) => void = () => {},
  onClickInside: (event: Event) => void = () => {}
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event.target as Node))
        onClickOutSide(event);
      else onClickInside(event);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
