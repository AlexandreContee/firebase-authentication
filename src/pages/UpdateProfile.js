import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const UpdateProfile = () => {

  const { updateEmailAddress, currentUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(currentUser.email)

  async function handleSubmit(element) {
    element.preventDefault()

    setIsLoading(true)

    if (email === currentUser.email) {
      setIsLoading(false)
      return navigate("/")
    }

    try {
      await updateEmailAddress(email)
      navigate("/")
    } catch (error) {
      console.log(error.message);
      alert("Ocorreu um erro ao tentar atualizar o usuário")
    }

    setIsLoading(false)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Atualizar Perfil</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <button disabled={isLoading} className="button-block">Atualizar</button>
      </form>
    </div>
  )
}