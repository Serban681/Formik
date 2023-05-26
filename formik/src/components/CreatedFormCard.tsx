/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import icon_form from "@/images/icon_form.svg";
import Image from "next/image";
import { Btn } from "./Buttons";
import { colors } from "@/utils/colors";
import { type Form } from "@/utils/dataStructures";
import {useRouter} from "next/router";

const CreatedFormCard = ({form, index}:{form: Form, index: number}) => {
    const router = useRouter();

    const goToResultsPage = () => {
        router.push(`/formresults/${form._id || ''}`).catch((err) => console.log(err));
    }

    return (
        <div className="border-black border-3 shadow-std w-80 h-85 p-3 mb-10">
            <div className={`${colors[index % 6]} z-10 w-12 h-12 rounded-full border-black border-3 shadow-std flex justify-center`}>
                <Image 
                className="w-8"
                src={icon_form}
                alt={"icon image"}
                />
            </div>
            <h1 className="mt-5 text-2xl mb-2">{form.title}</h1>
            <h3 className="text-gray text-sm mt-1">Questions:</h3>
            <ul className="text-black text-sm mt-1 ml-5 list-[square]">
                {form.fields?.slice(0, 3).map((field, i) => <li key={i} className="mb-1">{field.question}</li>)}
            </ul>

            <div className="block float-right mt-10 mr-4">  
                <Btn handleClick={() => goToResultsPage()} index={index % 6}>Responses</Btn>
            </div>


            {/* <div className="block float-right mt-10 mr-4">  
                <Btn handleClick={() => goToResultsPage()} index={index % 6}>Responses</Btn>
            </div>      */}
        </div>
    );
}

export default CreatedFormCard;