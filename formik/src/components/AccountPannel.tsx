/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Btn } from "@/components/Buttons"
import close_icon from "/src/images/close_icon.svg";
import Image from "next/image";

import { useSession } from "next-auth/react";
import gravatar from "gravatar"
import { signOut } from "next-auth/react";

export default function AccountPanel ({isPanelOpened, closePanel} : {isPanelOpened: boolean, closePanel: () => void}) {
    const { data: session } = useSession()

    // const [gravatarUrl, setGravatarUrl] = useState<string | undefined | null>(null)
    const gravatarUrl = session?.user?.email && gravatar.url(session?.user?.email, {protocol: 'http', s: '40'});

    // useEffect(() => {
    //     setGravatarUrl(session?.user?.email && gravatar.url(session?.user?.email, {protocol: 'http', s: '100'}))
    // })

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: '/' })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${isPanelOpened ? 'inline-block' : 'hidden'} right-2 absolute z-10 border-black border-3 shadow-std w-72 p-4 pb-7 bg-white`}>
            <Image onClick={() => closePanel()} className="absolute h-8 right-[1rem] hover:scale-110 transition-all hover:cursor-pointer" src={close_icon} alt={"hide button"} />
            <h1 className="font-semibold text-2xl mb-4">Account</h1>
            <div className="flex mb-5">
                {!!gravatarUrl && <Image src={gravatarUrl} alt="User Ava" width={40} height={40} className="w-12 h-12 mr-3 rounded-full" />}
                <div>
                    <h6 className="font-medium">{session?.user?.name}</h6>
                    <h6>{session?.user?.email}</h6>
                </div>
            </div>

            {/* <h2 className="font-semibold text-2xl mb-2">Reset Password</h2>
            <label className="text-lg block mb-5" htmlFor={'text'}>
                New Password
                <br />
                <input className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" type="text" name='text' />
            </label>  */}

            <div className="mr-1 h-10">
                <div className="float-right">
                    <Btn handleClick={() => handleSignOut()}>Sign out</Btn>
                </div>
            </div>

        </div>
    )
}