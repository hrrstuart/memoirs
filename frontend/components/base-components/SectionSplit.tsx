import React from 'react'

function SectionSplit({ title }: { title: string }) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-b border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-black px-4 text-sm text-gray-300">{title}</span>
      </div>
    </div>
  )
}

export default SectionSplit