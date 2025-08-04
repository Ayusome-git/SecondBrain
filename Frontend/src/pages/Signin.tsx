import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HomeLogo } from "../components/icons/HomeLogo";
import Squares from "../Squares/Squares";



export function Signin(){
    const usernameRef= useRef<any>("");
    const passwordRef=useRef<any>("");
    const navigate = useNavigate(); 
        async function signin(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        const response =await axios.post(BACKEND_URL+"/api/v1/signin",{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt)
        navigate("/dashboard");

    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <Squares speed={0.1} squareSize={20} direction={"diagonal"} borderColor={'#fff'}/>
            <div className="rounded-2xl  p-8 flex flex-col justify-center items-center absolute">
                <div className="mb-4">
                    <HomeLogo />
                </div>
                <div className="w-full flex flex-col items-center">
                    <Input variant={"login"} ref={usernameRef} placeholder="Username"  />
                    <Input variant={"login"} ref={passwordRef} placeholder="Password" type="pass" />
                </div>
                <div>Dont have an account?
                    <span className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-900" onClick={()=>{navigate("/signup")}}>Signup</span>
                </div>
                <div className="flex justify-center pt-4 w-full">
                    <Button
                        onClick={signin}
                        loading={false}
                        fullwidth={true}
                        variant="secondary"
                        text="Signin"
                    />
                </div>
            </div>
        </div>
    );
}