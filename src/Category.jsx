import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDocs, collection, query } from "@firebase/firestore"
import { db } from "./firebase-config"
import ReinitButton from "./ReinitButton"
import CategoryDisplay from "./CategoryDisplay"

const Category = () => {

    const [subCategories, setSubCategories] = useState({})

    const navigate = useNavigate()
    const {category} = useParams()

    const getData = async () => {
        const q = query(collection(db, category))
        const querySnapshot = await getDocs(q);
        const subCategories = querySnapshot.docs.reduce((acc, doc) => ({...acc, [doc.id] : doc.data()}) , {})
        setSubCategories(subCategories)
    }

    useEffect(() => {
        getData()
    }, [category])

    return (
        <>
            {
                Object.keys(subCategories).length ? 
                    <>
                        {[<ReinitButton key={`${category}-ReinitBtn`} reinitURL={`/products/${category}`}/>,
                            ...Object.entries(subCategories).map(([key, value]) => 
                                <button 
                                    onClick={() => navigate(`${key}`)} 
                                    key={key}
                                >{value.displayName}</button>
                        )]}
                        <CategoryDisplay/>
                    </> : ''
            }
        </>
    )
}

export default Category