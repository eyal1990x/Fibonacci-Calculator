import '../style/InputNumber.css'

export const InputNumber =({handleX}) =>{
    return <input className="inputNum" type={'number'} placeholder={'#'} onChange={handleX}></input>
}