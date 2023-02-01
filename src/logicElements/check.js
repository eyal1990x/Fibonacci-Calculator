
export const check = (setY,setError,setIsError,setData,handleY,X) => {
    setY(null)
    setError(null)
    setIsError(false)
    setData(null)

    if(X < 0) {
        setError(`The number can't be smaller than 0`)
        setIsError(true)

    }
    else {
        handleY()
    }

}
