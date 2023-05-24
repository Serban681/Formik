import Image from "next/image";
import user_icon from "@/images/user_icon.svg"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import gravatar from "gravatar"

export default function Avatar({ openPanel }: { openPanel: () => void }) {
    const { data: session } = useSession()
    const router = useRouter()

    // const gravatarUrl = session?.user?.email && 'https:' + gravatar.url(session?.user?.email, { size: '200', default: 'retro', rating: 'g' });
    const gravatarUrl = session?.user?.email && gravatar.url(session?.user?.email, {protocol: 'http', s: '40'});

    return (
        <>
            { !!session ?
                !!gravatarUrl && <Image onClick={() => openPanel()} src={gravatarUrl} alt="User Avatar" width={40} height={40} className="w-9 h-9 absolute right-10 sm:right-12 top-0 rounded-full hover:scale-105 transition-all hover:cursor-pointer" />
            :
                <Image onClick={() => router.push('/signup')} className="w-9 h-9 top-0 absolute right-10 sm:right-12 hover:scale-105 transition-all hover:cursor-pointer" src={user_icon} alt="account" />
            }
        </>
    )
}