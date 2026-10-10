import { useRef, useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const handleClose = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return { dialogRef, handleOpen, isOpen, handleClose };
}
