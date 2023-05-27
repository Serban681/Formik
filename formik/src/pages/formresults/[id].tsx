/* eslint-disable @typescript-eslint/no-non-null-assertion */
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";
import { type Form } from "@/utils/dataStructures"
import { type FormAnswers } from "@/utils/dataStructures"
import { Btn } from "@/components/Buttons";

import { toast } from "react-toastify";

import { api } from "@/utils/api";

import { useRouter } from "next/router";

interface FormField {
    type: string,
    question: string,
    options?: {
        answer: string
    }[]
}

export default function FormResults() {
    const router = useRouter()

    const [form, setForm] = useState<Form>({
        _id: '1',
        title: '',
        fields: [],
        isDraft: true,
        creator: ''
    })

    const formId = router.query.id as string

    const getForm = api.forms.getForm.useQuery(formId || '') 
    const getAnswers = api.answers.getAnswers.useQuery(formId || '')   

    useEffect(() => {
        if(!getForm.data) return
        setForm(getForm.data)
    }, [getForm.data])

    useEffect(() => {
        if(!getAnswers.data) return
        setFormAnswers(getAnswers.data)
    }, [getAnswers.data])

    const [formAnswers, setFormAnswers] = useState<FormAnswers[]>([])

    const handleSendFormClick = () => {
        void navigator.clipboard.writeText(window.location.origin + '/viewform/' + formId)

        toast("Link copied to clipboard")
    }

    return (
        <div>
            <SectionTitle>Form Results<span className="text-base font-medium text-gray">({formAnswers.length} responses)</span></SectionTitle>

            <div className="mt-7">
                {form?.fields?.map((field, index) => {
                    if(field.type === 'text') {
                        return <TextField key={index} id={index} answers={formAnswers} question={field.question} type={field.type} />
                    }
                    else if(field.type === 'dropdown' || field.type === 'radio') {
                        return <SingleOptionField key={index} id={index} answers={formAnswers} formField={field} />
                    }
                    else {
                        return <CheckboxField key={index} id={index} answers={formAnswers} formField={field} />
                    }
                })}

                <div className="mt-7">
                    <Btn index={1} handleClick={() => handleSendFormClick()}>Send Form</Btn>
                </div>
            </div>
        </div>
    )
}

const TextField = ({id, answers, question, type}: {id: number, answers: FormAnswers[], question: string, type: string}) => {
    return (
        <label className="text-2xl mt-6 block" htmlFor={'text'}>
            {question}<span className="text-xs text-gray">({type} field)</span>
            <br />
            {
                answers.length ? (
                    <div className="overflow-auto h-36 mt-3 mb-3 mr-0">
                    {
                        answers.map((answer, index) => {
                            return (
                                <div key={index}>
                                    <span className="inline-block w-6 text-lg font-medium mr-2">#{index + 1}</span>
                                    <div className="mt-3 inline-block border-[#868686] bg-[#F5F5F5] border-[2px] text-sm p-1.5 w-64 focus:outline-none">
                                        {answer.answers[id]?.answer}
                                    </div>
                                </div>
                            )
                        })
                    }   
                    </div> 
                ) 
                :
                <p className="text-sm mt-5">No responses yet</p>
            }
        </label> 
    )
}

const SingleOptionField = ({id, answers, formField}: {id: number, answers: FormAnswers[], formField: FormField}) => {
    const calculateResPercentage = (response: string) => {
        if(answers.length) {
            let count = 0
            answers.map((answer) => {
                if(answer.answers[id]?.answer === response) {
                    count++
                }
            })

            return Math.trunc(count / answers.length * 100)
        }
        
        return 0
    }

    return (
        <label className="text-2xl mt-6 block" htmlFor={'text'}>
            {formField.question}<span className="text-xs text-gray">({formField.type} field)</span>
            <br />
            <div className="mt-3">
                {formField.options?.map((option, index) => {
                    const resPercentage = calculateResPercentage(option.answer)

                    return (
                        <div key={index}>
                            <div className="mt-3 inline-block text-sm mr-6 focus:outline-none">
                                {option.answer}<span className="ml-3 font-medium">{resPercentage}%</span>
                            </div>
                        </div>   
                    )
                })}
            </div> 
        </label>
    )
}

const CheckboxField = ({id, answers, formField}: {id: number, answers: FormAnswers[], formField: FormField}) => {
    const calculateResCount = (response: string) => {
        let count = 0
        if(answers.length !== 0) {
            answers.map((answer) => {
                for(let i = 0; i < answer.answers[id]!.answers.length; i++) {
                    if(answer.answers[id]!.answers[i] === response) {
                        count++
                    }
                }
            })
        }
        
        return count
    }

    return (
        <label className="text-2xl mt-6 block" htmlFor={'text'}>
            {formField.question}<span className="text-xs text-gray">({formField.type} field)</span>
            <br />
            <div className="mt-3">
                {formField.options?.map((option, index) => {
                    const resCount = calculateResCount(option.answer)

                    return (
                        <div key={index}>
                            <div className="mt-3 inline-block text-sm mr-6 focus:outline-none">
                                {option.answer}<span className="ml-3 font-medium">{resCount}</span>
                            </div>
                        </div>   
                    )
                })}
            </div> 
        </label>
    )
}