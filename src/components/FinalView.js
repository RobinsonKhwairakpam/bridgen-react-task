import React, { useContext, useEffect, useRef, useState } from 'react'
import { Queue, TextContext } from '../context/TextContext'
import { v4 } from 'uuid'
import { Box, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

const FinalView = () => {
  const {textQueue, setTextQueue} = useContext(TextContext)
  const [displayTextArray, setDisplayTextArray] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false)
  const renderCount = useRef(false)

  useEffect(() => {

    const intervalSetter = setInterval(() => {      
      if (!textQueue.isEmpty()) {        
        // Dequeue an element from the queue
        const dequeuedText = textQueue.peek();
        
        // Update the displayed text
        setDisplayTextArray(prev => [...prev, dequeuedText]);
        
        // Dequeue the element from the queue
        textQueue.dequeue();

        // Update the state with a new instance of the queue
        setTextQueue((prevQueue) => {
          const newQueue = new Queue();
          Object.assign(newQueue.items, prevQueue.items);
          newQueue.frontIndex = prevQueue.frontIndex;
          newQueue.backIndex = prevQueue.backIndex;          
          return newQueue;
        });

        //check queue empty before the interval
        if(textQueue.isEmpty()){               
          renderCount.current = true   
        }
      }     
      
    }, 10000);

    return () => {
      clearInterval(intervalSetter)
    }

  }, [textQueue, setTextQueue]);
  

  const handleEndButton = () => {
    if (textQueue.isEmpty()) {
      // If the queue is already empty, display success popup immediately
      setShowSuccess(true);
    } else {
      //check every second if queue is empty
      const endButtonInterval = setInterval(() => {
        if(renderCount.current){
          setShowSuccess(true)
          clearInterval(endButtonInterval)
          renderCount.current = false
        }       
        console.log(renderCount.current)       
      }, 1000)
    }
  };

  const handleResetButton = () => {
    // Reset all state variables
    setTextQueue(new Queue());
    setDisplayTextArray([]);
    setShowSuccess(false);
  };

  return (
    <div className='basis-[50%] px-10 pt-12 flex flex-col justify-between'>
      <div>
        <h1 className='font-semibold text-[26px] text-center text-neutral-600'>Wait for 10 seconds</h1>
        <div className='mt-5 mb-8 mx-5'>
          {displayTextArray.map((item,index) => 
            <div key={v4()} className='italic text-lg '>
              {item}
            </div>
          )}
        </div>
      </div>

      <div className='w-full flex gap-6 justify-center mb-5'>
        <button 
          onClick={handleEndButton}
          className='bg-red-500 basis-[40%] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline'
        >
          End
        </button>
        <button 
          onClick={handleResetButton}
          className='bg-blue-500 basis-[40%] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline'
        >
          Reset
        </button>
        {/* Success Popup */}
        {showSuccess && (
          <Modal
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h3" className='text-center'>
                Success
              </Typography>              
            </Box>
          </Modal>
        )}
      </div>

    </div>
  )
}

export default FinalView