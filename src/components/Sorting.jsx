
export const Sorting = ({render,handleSort}) =>{

    return(
        <div>
                {render && <select onChange={handleSort}>
                    <option value="default" hidden> sort by</option>
                    <option value="numberAsc" >number asc</option>
                    <option value="numberDesc" >number desc</option>
                    <option value="dateAsc" >date ace</option>
                    <option value="dateDesc" >date desc</option>
                </select>}
            </div>
    )
}