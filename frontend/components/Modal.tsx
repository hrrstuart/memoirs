import React from 'react'
import ReactDom from 'react-dom';

export default function Modal({ open, children, onClose }: { open: boolean, onClose: () => void, children: JSX.Element }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-[1000]" onClick={onClose}></div>
      <div style={{ transform: 'translate(-50%, -50%)', zIndex: 1000 }} className="fixed top-1/2 left-1/2 bg-black h-[50%]">
        {children}
      </div>
    </>,
    document.getElementById('portal')!
  )
}