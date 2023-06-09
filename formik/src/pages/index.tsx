/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import { BigBtn } from "@/components/Buttons";
import SectionTitle from "@/components/SectionTitle";
import Image from 'next/image';
import icon_data from "@/images/icon_data.svg";
import icon_form from "@/images/icon_form.svg";
import icon_share from "@/images/icon_share.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { api } from "@/utils/api";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/signup').catch((err) => console.log(err));
  }

  const h = api.sayHi.useQuery()

  useEffect(() => {
    console.log(h.data)
  }, [h.data])

  return (
    <div>
      <div className="mb-24">
        <h1 className="text-4xl w-80 md:w-100 text-black font-semibold leading-[3rem]" data-testid = "index h1">Transform your <span className="bg-[#feca87]">ideas</span> into <span className="bg-[#c9c8ff]">powerful</span> forms, effortlessly</h1>
        <h6 className="text-gray font-regular mt-3 mb-32" data-testid = "index h6">Create with ease today</h6>
        <BigBtn handleClick={handleClick}>Get Started</BigBtn>
      </div>

      <SectionTitle data-testid = "sectiontitle">What we provide</SectionTitle>

      <div className="flex flex-col md:flex-row justify-between mt-10">
        <div className="border-black border-3 shadow-std w-80 h-72 p-3 mb-10">
          <div className="bg-orange z-10 w-12 h-12 rounded-full border-black border-3 shadow-std flex justify-center">
            <Image 
              className="w-8"
              src={icon_form}
              alt={"icon image"}
            />
          </div>
          <h1 className="mt-5 text-2xl mb-2" data-testid = "card1h1">A <span className="border-orange border-b-3">Flexible</span> Form Creator</h1>
          <h3 className="text-gray text-sm mt-1" data-testid = "card1h3">Includes:</h3>
          <ul className="text-black text-sm mt-1 ml-3" data-testid = "card1ul">
            <li className="mb-1" data-testid = "li1">Text Inputs</li>
            <li className="mb-1" data-testid = "li2">Radio Buttons</li>
            <li data-testid = "li3">Dropdown Selectors</li>
          </ul>
        </div>

        <div className="border-black border-3 shadow-std w-80 h-72 p-3 mb-10 md:ml-20">
          <div className="bg-blue z-10 w-12 h-12 rounded-full border-black border-3 shadow-std flex justify-center">
            <Image 
              className="w-8"
              src={icon_share}
              alt={"icon image"}
            />
          </div>
          <h1 className="mt-5 text-2xl mb-2" data-testid = "card2h1"><span className="border-blue border-b-3">Easy</span> Sharing</h1>
          <p className="text-black text-sm mt-1" data-testid = "card2p">A user-friendly and efficient way to share forms with others, making it a popular choice for both personal and professional use.</p>
        </div>

        <div className="border-black border-3 shadow-std w-80 h-72 p-3 mb-10 md:ml-20">
          <div className='bg-pink z-10 w-12 h-12 rounded-full border-black border-3 shadow-std flex justify-center'>
            <Image 
                className="w-8"
                src={icon_data}
                alt={"icon image"}
            />
          </div>
          <h1 className="mt-5 text-2xl mb-2" data-testid = "card3h1">Retrieve Data in <span className="border-pink border-b-3">Real-Time</span></h1>
          <p className="text-black text-sm mt-1" data-testid = "card3p">Real-time data retrieval is a critical aspect of modern data-driven applications and services, enabling businesses and organizations to make informed decisions quickly and respond to changing conditions in real-time.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;