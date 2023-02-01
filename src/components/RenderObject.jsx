

export const RenderObject = ({results,sort}) => {
    let res = results
    const dataAcs = (a, b) => {
        return b.createdDate - a.createdDate
    }
    const dataDecs = (a, b) => {
        return a.createdDate - b.createdDate
    }
    const numberAcs = (a, b) => {
        return b.number - a.number
    }
    const numberDecs = (a, b) => {
        return a.number - b.number
    }
 switch (sort) {
    case 'dateAsc':
         res.sort(dataAcs)
        break;
        case 'dateDesc':
         res.sort(dataDecs) 
        break;
        case 'numberAsc':
         res.sort(numberAcs) 
        break;
        case 'numberDesc':
         res.sort(numberDecs) 
        break;
 }
    
    res.forEach(i => Object.entries(i).forEach(([key, value]) => {
        if (key == 'createdDate') {
            i[key] = new Date(value)

        }
    })
    )

    return res.map((i) => {
        return (
            <div>
                <h3 key={i._id}>The Fibonnaci Of {i.number}  is {i.result} Calculated at: {`${i.createdDate}`}</h3>

            </div>
        )
    })
}
