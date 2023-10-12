import {useMemo} from 'react'

const FilterSelect = ({tagsList, setFilters, item}) => {   
    
    return (
        <select onChange={(e) => setFilters(filters => ({...filters, [item] : e.target.value}))}>
            {
                [<option 
                    value={null}
                    key={`filter`}
                >Marque</option>, ...tagsList.map(val => 
                <option 
                    value={val}
                    key={`${item}-${val}`}
                >{val}</option>)]
            }
        </select>
    )
}

export default FilterSelect