import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar";
import { useState } from "react";
import AccountPanel from "@/components/AccountPannel";
import {ToastContainer} from "react-toastify";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

  const logoClick = (): void => {
    router.push('/').catch((err) => console.log(err))
  }

  const [isPanelOpened, setIsPanelOpened] = useState(false);

  const openPanel = () => {
    setIsPanelOpened(true)
  }

  const closePanel = () => {
    setIsPanelOpened(false)
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        <Head>
          <title>Formik</title>
          <meta name="description" content="Generated by create-t3-app" />
        </Head>
        <main className="min-h-screen">
          <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
          <AccountPanel isPanelOpened={isPanelOpened} closePanel={closePanel} />
          <div className="flex flex-col items-center mt-6 relative min-h-screen">
            <h1 onClick={logoClick} className="relative font-logo text-black text-4xl mb-10 cursor-pointer">
              Formik
              <div className="w-12 h-3 bg-yellow absolute bottom-1 right-[-0.5rem] z-[-1]"/>
            </h1>          
            <Avatar openPanel={openPanel} />  
            <div className="w-11/12 flex justify-center my-auto">
              <Component {...pageProps} /> 
            </div>
            <div className="h-44 bg-[#5E5D86] mt-16 w-full">
              <h1 className="font-logo text-white text-4xl mb-9 float-right mr-3 mt-20">Formik</h1>
            </div>
          </div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);