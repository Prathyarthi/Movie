import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../components/Heading";
import Sub_Heading from "../components/Sub_Heading";
import Input_box from "../components/Input_box";
import Button from "../components/Button";
import Bottom_warning from "../components/Bottom_warning";
import { toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <Sub_Heading label={"Enter your information to create an account"} />
        <Input_box onChange={e => {
          setUsername(e.target.value);
        }} placeholder="John" label={"Username"} />
        <Input_box onChange={e => {
          setEmail(e.target.value);
        }} placeholder="john@gmail.com" label={"Email"} />
        <Input_box onChange={e => {
          setPassword(e.target.value)
        }} placeholder="12345678" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            let response = axiosInstance.post("/users/signup", {
              username,
              email,
              password
            });
            await toast.promise(response, {
              loading: "Signup!",
              success: "Signup successful!",
              error: "Signup failed!"
            })
            response = await response
            // localStorage.setItem("token", response.data.token)
            navigate('/signin')
          }} label={"Sign up"} />
        </div>
        <Bottom_warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
