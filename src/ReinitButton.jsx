import { useNavigate } from "react-router-dom"

const ReinitButton = ({reinitURL}) => {

    const navigate = useNavigate()

  return (
    <button onClick={() => navigate(reinitURL)}>Tous</button>
  )
}

export default ReinitButton