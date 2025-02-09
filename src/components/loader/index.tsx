import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="animate-spin-slow rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  )
}

export default Loader