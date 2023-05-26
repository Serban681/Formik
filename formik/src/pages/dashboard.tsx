/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { type NextPage } from "next";
import CreatedFormCard from "@/components/CreatedFormCard";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";
import plus_icon from "@/images/plus_icon.svg";
import Image from "next/image";
import { type Form } from "@/utils/dataStructures";
import useBlockRoute from "@/utils/useBlockRoute";
import { useSession } from "next-auth/react"

import { api } from "@/utils/api";

const Dashboard: NextPage = () => {
  useBlockRoute()

  const { data:session } = useSession()

  const router = useRouter()

  const [createdForms, setCreatedForms] = useState<Form[]>([])

  const getCreatedForms = api.forms.getCreatedForms.useQuery(session && session.user && session.user.email || '')

  useEffect(() => {

    if(getCreatedForms.data)
        setCreatedForms(getCreatedForms.data)    
  }, [getCreatedForms.data])


  const addForm = () => {
    router.push('/createform').catch((err) => console.log(err))
  }

  return (
    <main className="ml-16 min-h-screen">

        <SectionTitle>Created Forms</SectionTitle>
        {createdForms && createdForms.length ? (
            <div className="mt-10 flex flex-col md:flex-row md:w-[75rem] md:flex-wrap">
            {createdForms.map((form: Form, i: number) => (
                  <div key={i} className="mr-20">
                    <CreatedFormCard index={i} form={form} />
                  </div>
                )
            )}
            </div>
        ) :
          <h2 className="mt-4">No forms created yet</h2>
        }
        <div className="mr-10 md:mr-0">
            <button onClick={addForm} className="bg-yellow w-14 h-14 rounded-full flex items-center justify-center border-black border-3 shadow-std float-right hover:scale-110 transition-all">
            <Image className="w-12" src={plus_icon} alt="plus icon" />
            </button>
        </div>
    </main>
  );
}

export default Dashboard;