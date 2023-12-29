import React, { useContext } from 'react'
import { TextContext } from '../context/TextContext'
import { v4 } from 'uuid'

const View = () => {
    const {textQueue} = useContext(TextContext)

    const textInputs = textQueue.getItems()
  return (
    <div className='px-12 py-6 '>
      <h1 className='font-semibold text-[26px] text-center text-neutral-600'>Entered Text</h1>
      <div className='mt-5 mb-8 mx-5'>
        {Object.values(textInputs).map((item, index) => 
        <div key={v4()} className='italic text-lg'>
          {item}
        </div>
        )}
      </div>
    </div>
  )
}

export default View