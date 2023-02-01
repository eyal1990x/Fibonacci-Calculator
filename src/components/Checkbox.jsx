
export const Checkbox = ({handleSave}) =>{

    return(
        <div>
          <input  type="checkbox" onChange={handleSave}/> Save Calculation  
        </div>
        
    )
}