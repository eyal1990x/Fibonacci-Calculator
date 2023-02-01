import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFibonacci } from '../hooks/useFibonacci';

import '../style/ServerCalc.css'
import { Checkbox } from './Checkbox';
import { DisplayError } from './DisplayError';
import { LoadingSpinner } from './LoadingSpiner';
import { RenderObject } from './RenderObject';
import { check } from '../logicElements/check';
import { Sorting } from './Sorting';
import { InputNumber } from './InputNumber.jsx';
import { AnswerBtn } from './AswerBtn';


export const ServerCalc = () => {

    const { X, Y, handleX, handleY, setY } = useFibonacci()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [results, setResults] = useState([])
    const [isSave, setIsSave] = useState(false)
    const [render, setRender] = useState(false)
    const [sort, getSort] = useState('dateAsc')

    useEffect(() => {
        getResults()
    }, [data]);

    const handleClass = () => {
        if (isError) {
            return 'error'
        }
        return 'xInput'

    }

    const handleSave = () => {
        setIsSave(!isSave)
    }
    const handleSort = (e) => {
        getSort(e.target.value)
    }

    const answer = async () => {
        if (!isSave) {

            check(setY, setError, setIsError, setData, handleY, X)

        }
        else {
            try {
                setY(null)
                setData(null)
                setError(null)
                setIsError(false)

                setIsLoading(true)

                await axios.get(`http://localhost:5050/fibonacci/${X}`)
                    .then(data => setData(data.data.result))
                setIsLoading(false)
                if (isSave) {
                    setRender(true)
                }
            }
            catch (error) {
                if (error.message == 'Network Error') {
                    setIsLoading(false)
                    setError('The server is disconnected')
                }
                else {

                    setError(error.response.data)
                    setIsLoading(false)
                    setIsError(true)
                }

            }
        }
    }

    const getResults = async () => {
        if (isSave) {

            try {
                let res = await axios.get(`http://localhost:5050/getFibonacciResults`)
                    .then((data) => {

                        return data.data.results;
                    })

                const dataAcs = (a, b) => {
                    return b.createdDate - a.createdDate
                }

                res.sort(dataAcs)
                setResults(res)

            } catch (error) {
                console.log(error);
            }

        }

    }

    return (
        <div >
            <div className='calc'>
                <h3 className='fibonacciNumber'>Calculator the Fibonacci number</h3>
                <InputNumber handleX={handleX} />
                <AnswerBtn answer={answer} />
                <div>
                    {isLoading && <LoadingSpinner />}
                </div>
                <div className='answer'>
                    {data && data}
                    {Y && Y}
                </div>
            </div>
            <div className='errorMessage'>
                {error && <DisplayError error={error} />}
            </div>
            <div>
              <p> You can save the calculation of Fibonacci numbers smaller then 50</p>
            <a className='link'  target="_blank" href="https://github.com/israeltechchallenge/fibonacci-server">For saving! Please clone the server repository</a>  
            </div>
            
            <div className='checkBox'>
                <Checkbox handleSave={handleSave} /> Save Calculation
            </div>
            <div className='results'>
                {render && <h2>results</h2>}
            </div>
            <Sorting render={render} handleSort={handleSort} />
            {render && <RenderObject results={results} sort={sort} />}

        </div>
    )
}
