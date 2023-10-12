import { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";

const Filters = ({products, setFilters, filters}) => {

    const [tagsList, setTagsList] = useState([])

    useEffect(() => {
        products && setTagsList(setTags("brand"))
    }, [products])

    const setTags = (item) => {
        const set = new Set()
        Object.values(products).forEach(product => {
            set.add(product[item])
        })
        return [...set]
    }

    return (
        <>
            {<FilterSelect tagsList={tagsList} setFilters={setFilters} item={"brand"} />}
            {
                <select onChange={(e) => setFilters(filters => ({...filters, score : JSON.parse(e.target.value)}))}>
                    {
                        [<option key={`quality-}`} value={null} >Score</option> , ...[[[0, 33], "red", "BAD"], [[34, 66], "orange", "FINE"], [[67, 100], "green", "GOOD"]]
                        .map(([val, color, label]) => 
                            <option key={`quality-${val}`} value={JSON.stringify(val)} style={{background : color}}>{label}</option>
                        )]
                    }
                </select>
            }
            <button onClick={() => setFilters({})}>Reinitialiser les filtres</button>
        </>
    )
}

export default Filters