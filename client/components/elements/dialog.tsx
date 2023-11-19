import React, { MutableRefObject, ReactNode, useEffect, useRef } from "react";

export function Dialog({
  onClose,
  visible,
  children,
}: {
  onClose: () => void;
  visible: boolean;
  children: ReactNode;
}) {
  const ref = useRef() as MutableRefObject<HTMLDialogElement>;
  useEffect(() => {
    if (visible) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [visible]);

  useEffect(() => {
    function handleEscape(e: Event) {
      e.preventDefault();
    }

    ref.current.addEventListener("close", onClose);
    ref.current.addEventListener("cancel", handleEscape);
    return () => {
      ref.current?.removeEventListener("cancel", handleEscape);
      ref.current?.removeEventListener("close", onClose);
    };
  }, []);
  return <dialog ref={ref}>{visible && children}</dialog>;
}
