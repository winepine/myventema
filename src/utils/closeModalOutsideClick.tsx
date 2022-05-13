import { useCart } from "contexts/cart/use-cart";
import { useEffect, useRef } from "react";

function useOutsideAlerter(ref) {
  const { isOpen, toggleCart } = useCart();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        // alert("You clicked outside of me!");
        toggleCart()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen]);
}

export default function CloseModalOutsideClick(props) {
  const wrapperRef = useRef(null);
  // const { isOpen, toggleCart } = useCart();
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef}>{props.children}</div>
  );
}

