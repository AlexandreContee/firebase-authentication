import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const ForgotPassword = () => {

  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(element) {
    element.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      alert("Foi enviado um email para resetar a sua senha")
      navigate("/login")
    } catch (error) {
      alert("Ocorreu um erro ao resetar a sua senha")
    }

    setIsLoading(false)
  }

  return (
    <div className="container">
      <h1>Esqueci minha senha</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <button disabled={isLoading} className="button-block">Recuperar senha</button>
      </form>

      <div className="center">
        <div>
          <p>
            Já tem uma conta? <Link to={"/login"}>Entrar</Link>
          </p>
          <p>
            Não tem uma conta? <Link to={"/signup"}>Cadastrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
