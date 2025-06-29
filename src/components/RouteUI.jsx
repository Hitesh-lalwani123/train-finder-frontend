import React from 'react'

const RouteUI = () => {
    let list = ["SC","BPL","NGP"]
  return (
    <div className='h-4 w-full bg-slate-100 flex flex-row justify-between'>
        {list.map((item,ind)=>{
            return (
                <div key={ind} className=' m-1 w-auto rounded-full'>
                    {item}

                </div>
            )
        })}
    </div>
  )
}

export default RouteUI