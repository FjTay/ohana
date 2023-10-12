import { useEffect, useRef, useState } from "react"
import { useParams, useNavigation } from "react-router-dom"
import { collection, getDocs, getDoc, query, where, doc } from "firebase/firestore";
import { db } from "./firebase-config";
import Filters from "./Filters"
import ProductTile from "./ProductTile";

const CategoryDisplay = () => {

    const {category, subCategory} = useParams()
    const [products, setProducts] = useState({})
    const [filters, setFilters] = useState({})
    const navigation = useNavigation()
    const productList = useRef()

    const getProducts = async () => {
        const decorate = async (data) => {
          const productPromises = Object.keys(data).map(async (product) => {
            const ingredientsQuery = doc(db, "productDetails", product)
            const ingredientsSnapchot = await getDoc(ingredientsQuery)
            data[product].ingredients = ingredientsSnapchot.data().ingredients.reduce((acc, val) => ({ ...acc, [val]: {} }), {})

            const ingredientPromises = Object.keys(data[product].ingredients).map(async (ingredient) => {
              const ingredientQuery = doc(db, "ingredients", ingredient)
              const ingredientSnapchot = await getDoc(ingredientQuery)
              data[product].ingredients[ingredient] = ingredientSnapchot.data()
            })
      
            await Promise.all(ingredientPromises);
          });
      
          await Promise.all(productPromises);
          return data
        }
      
        const productsQuery = query(collection(db, "products"), subCategory ? where("subCategory", "array-contains", subCategory) : where("family", "array-contains", category))
        const productsSnapshot = await getDocs(productsQuery)
        let data = productsSnapshot.docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data() }), {})
      
        data = await decorate(data)

        Object.values(data)
            .forEach(product => 
                product.score = Object.values(product.ingredients)
                    .reduce((acc, val) => acc += val.health + val.pollution, 0)
                    / (Object.values(product.ingredients).length * 2)
            )
                
        productList.current = data
        setProducts(data)
      }
      
    useEffect(() => {
        setFilters(null)
        getProducts()
        return () => setProducts({})
    }, [subCategory])

    useEffect(() => {
        if(filters && Object.keys(filters).length) {
            productList.current && setProducts(handleFilters(Object.entries(productList.current)))
        } else {
            setProducts(productList.current)
        }
    }, [filters])

    const handleFilters = (data) => {
        if(data.length) {
            const filteredData = data.filter(([_, item]) => {
                const {
                    brand = null,
                    score = null,
                } = filters
            
                const isScoreInRange = (itemScore) => {
                    if (score && Array.isArray(score)) {
                        const [min, max] = score
                        return itemScore >= min && itemScore <= max
                    }
                    return true
                }
            
                return (
                    (!brand || item.brand === brand) &&
                    isScoreInRange(item.score)
                )
            })
            return filteredData.reduce((acc, [key, value]) => {
                return {...acc, [key] : value}
            }, {})
        }
        return data
    }

    return (
        <div>
            <Filters products={products} setFilters={setFilters} filters={filters}/>
            {
                products &&
                Object.entries(products)
                        .map(([key, value]) => 
                            <ProductTile key={key} value={value} />
                        )
            }
            {products && !Object.keys(products).length && <h4>Pas de produits correspondant à votre choix</h4>}
        </div>
    )
}

export default CategoryDisplay