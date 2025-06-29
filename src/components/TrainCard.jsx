import React from 'react'

const TrainCard = ({children}) => {
  return (
    <div className='bg-slate-100 backdrop-blur-md rounded-md w-auto h-40 shadow-md shadow-black p-2 m-2'>{children}</div>

  )
}

export default TrainCard