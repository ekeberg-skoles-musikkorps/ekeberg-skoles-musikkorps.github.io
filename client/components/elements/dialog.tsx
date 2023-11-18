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
    }
  }, [visible]);

  useEffect(() => {
    ref.current.addEventListener("close", onClose);
    return () => ref.current.removeEventListener("close", onClose);
  }, []);
  return <dialog ref={ref}>{visible && children}</dialog>;
}
