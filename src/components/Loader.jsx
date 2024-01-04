import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Image src='/loader.gif' width={80} height={80} alt='Loading'/>
        </div>
  )
}

export default Loader
