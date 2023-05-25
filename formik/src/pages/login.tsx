/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from "@/components/SectionTitle";
import FormTextInput from "@/components/FormTextInput";
import { Btn } from "@/components/Buttons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react"
import Image from "next/image";
import github_icon from "@/images/github_icon_white.svg"

import { toast } from "react-toastify";

import { api } from "@/utils/api"

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginWithGithub = async () => {
        await signIn('github')
    }

    const login = api.credentialAuthController.logIn.useMutation()

    const handleSubmit = () => {
        login.mutate({ username, password })
    }

    // const handleSubmit = () => {
    //     if(username === '') {
    //         toast.error('Username cannot be empty')
    //     } else if(password === '') {
    //         toast.error('Password cannot be empty')
    //     } else {
    //         fetch('http://localhost:3000/api/auth/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ username, password })
    //         })
    //         .then(res => {
    //             if(res.status === 200) {
    //                 toast.success('Successfully loged in!')
    //                 router.push('/dashboard')
    //             } else if(res.status >= 400 && res.status < 500) {
    //                 toast.error('Invalid credentials')
    //             } else {
    //                 toast.error('Internal server error')
    //             }
    //         })
    //         .catch(err => {
    //             toast.error('Something went wrong')
    //         })
    //     }
    // }

    return (
        <div>
            you are not supposed to be here
            {/* <SectionTitle>Login</SectionTitle>

            <button onClick={() => loginWithGithub()} className="bg-black hover:scale-105 transition-all text-white py-2.5 px-3 flex items-center justify-center mt-4 w-full"><Image className="w-7 inline-block mr-3" src={github_icon} alt="github icon"></Image>Log In With Github</button>

            <div className="w-full flex justify-center items-center mt-6 font-medium">
                <div className="bg-black h-0.5 w-full"/>
                <div className="mx-2 text-base mb-0.5">or</div>
                <div className="bg-black h-0.5 w-full" />
            </div>

            <FormTextInput labelName={'Username'} type={'text'} value={username} handleChange={changeUsername} />
            <FormTextInput labelName={'Password'} type={'password'} value={password} handleChange={changePassword} />
            <Link href="/signup" className="text-gray text-sm font-medium underline decoration-2">Don&apos;t have an account? Register here!</Link>

            <div className="mt-5">
                <Btn handleClick={() => handleSubmit()}>Submit</Btn>
            </div> */}
        </div>
    )
}