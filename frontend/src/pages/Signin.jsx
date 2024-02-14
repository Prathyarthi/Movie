import { useState } from 'react'
import Heading from '../components/Heading'
import Sub_Heading from '../components/Sub_Heading'
import Input_box from '../components/Input_box'
import Button from '../components/Button'
import Bottom_warning from '../components/Bottom_warning'
import axiosInstance from '../axiosInstance'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
function Signin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Sub_Heading label={"Enter your credentials to access your account"} />
          <Input_box onChange={(e) => {
            setEmail(e.target.value)
          }}
            placeholder="Ex: john@gmail.com" label={"Email"} />
          <Input_box onChange={(e) => {
            setPassword(e.target.value)
          }} placeholder="Ex: John@123#" label={"Password"} />
          <div className="pt-4">
            <Button onClick={async () => {
              let response = axiosInstance.post("/users/signin", {
                email,
                password
              })
              await toast.promise(response, {
                loading: "Signing in!",
                success: "Logged in successfully!",
                error: "Signin failed!"
              })
              response = await response
              // localStorage.setItem("token", response.data.token)
              navigate('/dashboard')
            }}
              label={"Sign in"} />
          </div>
          <Bottom_warning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Signin