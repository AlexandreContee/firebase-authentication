import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const Login = () => {

  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(element) {
    element.preventDefault()

    setIsLoading(true)

    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      await signIn(email, password)
      navigate("/")
    } catch (error) {
      alert("Ocorreu um erro ao tentar efetuar o login")
    }

    setIsLoading(false)
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </input>

        <label>Senha</label>
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </input>

        <button disabled={isLoading} className="button-block" type={"submit"}>
          Login
        </button>
      </form>

      <div className="center">
        <div>
          <p>
            Esqueceu a senha? <Link to={"/forgot-password"}>Resetar</Link>
          </p>
          <p>
            Não tem uma conta? <Link to={"/signup"}>Cadastrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
