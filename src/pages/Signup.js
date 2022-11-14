import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const Signup = () => {

  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)

    if (password.length < 6) {
      setIsLoading(false)
      alert("A senha deve ter no mínimo 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      setIsLoading(false)
      alert("As senhas não conferem")
      return
    }

    try {
      await signUp(email, password)
      alert("Usuario criado com sucesso")
      navigate("/login")

    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao tentar criar o usuário")
    }

    setIsLoading(false)
  }

  return (
    <div className="container">
      <h2>Cadastro de usuário</h2>
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

        <label>Confirmar senha</label>
        <input
          type={"password"}
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}>
        </input>

        <button disabled={isLoading} className="button-block" type={"submit"}>
          Cadastrar
        </button>

        <div className="center">
          <p>
            Já possui uma conta? <Link to={"/login"}>Entrar</Link>
          </p>
        </div>
      </form>
    </div>
  )
}
