import React from 'react'
import ReactDom from 'react-dom';

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: JSX.Element }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-[1000]" onClick={onClose}></div>
      { children }
    </>,
    document.getElementById('portal')!
  )
}