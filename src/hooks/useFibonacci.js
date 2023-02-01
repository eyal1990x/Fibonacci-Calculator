

import { useState } from "react";

export const useFibonacci = () => {
    const [X,setX] = useState(0)
  const [Y,setY] = useState(null)

  const handleX = (event) =>{
    setX(event.target.value)
    
  }
  const handleY = () =>{
    let y = 0, n2 = 1, nextTerm;
      for (let i = 1; i <= X; i++) {
        nextTerm = y + n2;
        y = n2;
        n2 = nextTerm; 
    }
   setY(y)
    }

    return {
        X,
        Y,
        handleY,
        handleX,
        setY,
    }
}
