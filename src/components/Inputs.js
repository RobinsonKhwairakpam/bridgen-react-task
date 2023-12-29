import React, { useContext, useState } from 'react'
import { Queue, TextContext } from '../context/TextContext'

const Inputs = () => {
    const [typedText, setTypedText] = useState("")
    const {textQueue, setTextQueue} = useContext(TextContext)

    const addButtonHandler = () => {
        const newQueue = new Queue()
        newQueue.enqueue(typedText)
        // Update the state with a new instance
        setTextQueue(prevQueue => {
            const updatedQueue = new Queue();
            Object.assign(updatedQueue.items, prevQueue.items); // Copy items from the previous queue
            updatedQueue.frontIndex = prevQueue.frontIndex;
            updatedQueue.backIndex = prevQueue.backIndex;
            updatedQueue.enqueue(typedText); // Enqueue the new item
        
            return updatedQueue;
        });
    }

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 py-14 px-4 '>
        <input 
            className='w-[80%] lg:w-[50%] px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:border-blue-300'
            type='text' 
            placeholder='Enter here...' 
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
        />
        <button 
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline'
            onClick={addButtonHandler}
        >
            Add
        </button>
        
    </div>
  )
}

export default Inputs