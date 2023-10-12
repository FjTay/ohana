import { useEffect } from "react"

const ProductTile = ({value}) => {

    useEffect(() => { console.log("CALL TO Tile-Show") }, [])

  return (
    <div className="productCard" >
        <h4>{value.displayName}</h4>
        <h5>{value.price?.toFixed(2)} €</h5>
    </div>
  )
}

export default ProductTile