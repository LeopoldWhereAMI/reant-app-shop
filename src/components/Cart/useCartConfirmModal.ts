import { useRef } from "react";

export default function useCartConfirmModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => dialogRef.current?.showModal();
  const handleClose = () => dialogRef.current?.close();

  return { dialogRef, handleOpen, handleClose };
}
