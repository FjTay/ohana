import { useEffect, useState } from 'react'
import { db } from "./firebase-config";
import { getDocs, doc, query, collection} from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom';

const Menu = () => {

    const [menuItems, setMenuitems] = useState({})
    const {category} = useParams()

    const navigate = useNavigate()

    const getData = async () => {
        const q = query(collection(db, "families"))
        const querySnapshot = await getDocs(q);
        setMenuitems(querySnapshot.docs.reduce((acc, doc) => ({...acc, [doc.id] : doc.data()}) , {}))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div>
                {
                    Object.keys(menuItems).length ? Object.entries(menuItems).map(([key, value]) => 
                        <button onClick={() => navigate(`products/${key}`)} key={key}>{value.displayName}</button> 
                    ) : ''
                }
            </div>
            {category && Object.keys(menuItems).length ? <h3>{menuItems[category].displayName}</h3> : ''}
        </>
    )
}

export default Menu