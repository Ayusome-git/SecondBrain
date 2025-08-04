import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { HomeLogo } from "../components/icons/HomeLogo";
import Squares from "../Squares/Squares";
import Alert from "@mui/material/Alert";


export function Signup(){
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const usernameRef= useRef<any>("");
    const passwordRef=useRef<any>("");
    const navigate=useNavigate();

    async function signup(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        try {
            await axios.post(BACKEND_URL+"/api/v1/signup",{
                username,
                password
            });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate("/signin");
            }, 1000);
        } catch (error: any) {
            if (error.response && error.response.status === 411) {
                setErrorAlert(true);
                setTimeout(() => setErrorAlert(false), 1000);
            }
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                    {showAlert && (
                    <Alert severity="success" variant="filled" className="absolute bottom-10 right-5 justify-center items-center">
                        You are signed up!
                    </Alert>
                    )}
                    {errorAlert && (
                <Alert severity="error" variant="filled" className="absolute bottom-10 right-5 justify-center items-center">
                    Username already exists!
                </Alert>
            )}
        <Squares speed={0.1} squareSize={20} direction={"diagonal"} borderColor={'#fff'}/>
                <div className="rounded-2xl p-8 flex flex-col justify-center items-center absolute">
                    <div className="mb-4">
                        <HomeLogo />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <Input variant={"login"} ref={usernameRef} placeholder="Username"  />
                        <Input variant={"login"} ref={passwordRef} placeholder="Password" type="pass" />
                    </div>
                    <div>Already have an account?
                        <span className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-900" onClick={()=>{navigate("/signin")}}>Signin</span>
                    </div>
                    <div className="flex justify-center pt-4 w-full">
                        <Button
                            onClick={signup}
                            loading={false}
                            fullwidth={true}
                            variant="secondary"
                            text="Signup"
                        />
                    </div>
                </div>
            </div>
}