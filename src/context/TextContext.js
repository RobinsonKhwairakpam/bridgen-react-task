import { createContext, useState } from "react";

export const TextContext = createContext({})

//queue data structure
export class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item){
        this.items[this.backIndex] = item
        this.backIndex++
    }
    dequeue(){
        let removedElement = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return removedElement
    }
    peek(){
        return this.items[this.frontIndex]
    }
    isEmpty() {
        if (this.frontIndex === this.backIndex) 
            return true;        
        else 
            return false;        
    }
    clear(){
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    getItems(){
        return this.items
    }
    size() {
        return this.backIndex - this.frontIndex;
    }
}


export const TextContextProvider = ({children}) => {
    const [textQueue, setTextQueue] = useState(new Queue())
    
    return (
        <TextContext.Provider value={{textQueue, setTextQueue}}>
            {children}
        </TextContext.Provider>        
    )
}