import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useBlockRoute = () => {
    const {status} = useSession()

    const router = useRouter()

    useEffect(() => {
        if(status === 'loading') {
            return
        } else if(status === 'unauthenticated') {
            router.push('/signup').catch(err => console.log(err))
        }
    })
}

export default useBlockRoute