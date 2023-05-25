/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import SectionTitle from "@/components/SectionTitle";
// import FormTextInput from "@/components/FormTextInput";
// import { Btn } from "@/components/Buttons";
// import { useState } from "react";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { useRouter } from "next/router";
import { signIn } from "next-auth/react"
import Image from "next/image";
import github_icon from "@/images/github_icon_white.svg"

// import { api } from "@/utils/api";

export default function SignUpPage() {
    // const router = useRouter()

    // const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [passwordConfirm, setPasswordConfirm] = useState('')

    // const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUsername(e.target.value)
    // }

    // const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value)
    // }

    // const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value)
    // }

    // const changePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPasswordConfirm(e.target.value)
    // }

    const signUpWithGithub = async () => {
        await signIn('github', { callbackUrl: 'http://localhost:3000/dashboard' })
    }

    // const signUp = api.credentialAuthController.signUp.useMutation()

    // const handleSubmit = () => {
    //     if(username === '') {
    //         toast.error('Username cannot be empty')
    //     } else if(email === '') {
    //         toast.error('Email cannot be empty')
    //     } else if(password === '') {
    //         toast.error('Password cannot be empty')
    //     } else if(passwordConfirm === '') {
    //         toast.error('Password confirmation cannot be empty')
    //     } else if(password !== passwordConfirm) {
    //         toast.error('Passwords do not match')
    //     } else {
    //         signUp.mutate({ username, email, password })
    //         /*
    //         fetch('http://localhost:3000/api/auth/signup', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ username, email, password, passwordConfirm })
    //         })
    //         .then(res => {
    //             if(res.status === 200) {
    //                 toast.success('Successfully signed up!')
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
    //         */
    //     }
    // }

    return (
        <div>
            <SectionTitle>Sign Up or Log in</SectionTitle>

            <button onClick={() => signUpWithGithub()} className="bg-black hover:scale-105 transition-all text-white py-2.5 px-3 flex items-center justify-center mt-4 w-full"><Image className="w-7 inline-block mr-3" src={github_icon} alt="github icon"></Image>Sign Up With Github</button>

            {/* <div className="w-full flex justify-center items-center mt-6 font-medium">
                <div className="bg-black h-0.5 w-full"/>
                <div className="mx-2 text-base mb-0.5">or</div>
                <div className="bg-black h-0.5 w-full" />
            </div> */}

            {/* <FormTextInput labelName={'Username'} type={'text'} value={username} handleChange={changeUsername} />
            <FormTextInput labelName={'Email'} type={'text'} value={email} handleChange={changeEmail} />
            <FormTextInput labelName={'Password'} type={'password'} value={password} handleChange={changePassword} />
            <FormTextInput labelName={'Confirm Password'} type={'password'} value={passwordConfirm} handleChange={changePasswordConfirm} />
            <Link href="/login" className="text-gray text-sm font-medium underline decoration-2">Already have an account? Log in here!</Link>


            <div className="mt-5">
                <Btn handleClick={() => handleSubmit()}>Submit</Btn>
            </div> */}
        </div>
    )
}