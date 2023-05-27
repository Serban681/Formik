/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import SectionTitle from "@/components/SectionTitle"
import { type Form } from "@/utils/dataStructures"
import { useEffect, useState } from "react"
import { Btn } from "@/components/Buttons"
import { type Answer } from "@/utils/dataStructures"
import { api } from "@/utils/api"
import { useRouter } from "next/router"

export default function ViewForm() {
    const router = useRouter()

    const [form, setForm] = useState<Form>({
        _id: '1',
        title: '',
        fields: [],
        isDraft: true,
        creator: ''
    })

    const formId = router.query.id as string

    const [submited, setSubmited] = useState(false)

    const getForm = api.forms.getForm.useQuery(formId || '')   
    
    const submitAnswer = api.answers.submitAnswer.useMutation()

    const [localStorageAvailable, setLocalStorageAvailable] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
          setLocalStorageAvailable(true);
        }
    }, []);

    useEffect(() => {
        if(!getForm.data) return
        setForm(getForm.data)
        setAnswers(getForm.data.fields.map((field: any) => {
            if(field.type === 'checkbox') {
                return {
                    type: field.type,
                    answer: '',
                    answers: field.options!.map((option : any) => '')
                }
            }
    
            return {
                type: field.type,
                answer: field.type === 'dropdown' ? field.options![0]!.answer : '',
                answers: []
            }
        })) 
    }, [getForm.data])


    const [answers, setAnswers] = useState<Answer[]>([]) 

    const handleAnswerChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const newAnswers = [...answers]
        newAnswers[id]!.answer = e.target.value
        setAnswers(newAnswers)
    }

    const handleCheckboxAnswerChange = (id: number, checkboxIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers]
        newAnswers[id]!.answers[checkboxIndex] = e.target.checked ? e.target.value : ''
        setAnswers(newAnswers)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        submitAnswer.mutate({
            formId: formId,
            answers: answers
        })
        localStorage.setItem(formId, "true")
        setSubmited(true)
    }

    return (
        <main>
            {
                localStorageAvailable && localStorage.getItem(formId) ? 
                    <h3>Thanks for submitting your answer</h3>
                    :
                    (
                        <>
                            <SectionTitle>{form.title}</SectionTitle>
                            <div className="mt-7">
                                {form.fields.length && form?.fields?.map((field, index) => {
                                    if(field.type === 'text') {
                                        return <TextField key={index} id={index} answers={answers} handleChange={handleAnswerChange} question={field.question} />
                                    }
                                    else if(field.type === 'dropdown') {
                                        return <DropdownField key={index} id={index} answers={answers} handleChange={handleAnswerChange} question={field.question} options={field.options} />
                                    }
                                    else if(field.type === 'radio') {
                                        return <RadioField key={index} id={index} answers={answers} handleChange={handleAnswerChange} question={field.question} options={field.options} />
                                    }
                                    else {
                                        return <CheckboxField key={index} id={index} answers={answers} handleChange={handleCheckboxAnswerChange} question={field.question} options={field.options} />
                                    }
                                })}

                                <div className="mt-7">
                                    <Btn handleClick={handleSubmit}>Submit</Btn>
                                </div>
                            </div>
                        </>
                    )
            }
            
        </main>
    )
}

const TextField = ({id, answers, handleChange, question}: {id: number, answers: Answer[], question: string, handleChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question}
            <br />
            <input value={answers[id]!.answer} onChange={(e) => handleChange(id, e)} className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" placeholder="Your answer" type="text" name='text' />
        </label> 
    )
}

const DropdownField = ({id, answers, handleChange, question, options}: {id: number, answers: Answer[], handleChange: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void, question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question}
            <br />
            <select value={answers[id]!.answer} onChange={(e) => handleChange(id, e)} className="border-black border-[2px] bg-white text-sm p-1.5 w-64 focus:outline-none">
                {options.map((option, index) => <option key={index} value={option.answer}>{option.answer}</option>)}
            </select>
        </label> 
    )
}

const RadioField = ({id, answers, handleChange, question, options}: {id: number, answers: Answer[], handleChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void, question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question}
            <br />
            <div>
                {options.map((option, index) => {
                    return (
                        <div className="mr-5 text-base" key={index}>
                            <input checked={answers[id]!.answer === option.answer} onChange={(e) => handleChange(id, e)} value={option.answer} type="radio" name={`${question}`} className="accent-pink" /> {option.answer}
                        </div>
                    )})}
            </div>
        </label>
    )
}

const CheckboxField = ({id, answers, handleChange, question, options}: {id: number, answers: Answer[], handleChange: (id: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => void, question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question}
            <br />
            <div>
                {options.map((option, index) => {
                    return (
                        <div className="mr-5 text-base" key={index}>
                            <input value={option.answer} checked={answers[id]!.answers[index] === option.answer} onChange={(e) => handleChange(id, index, e)} type="checkbox" name={`${question}`} className="accent-pink" /> {option.answer}
                        </div>
                    )})}
            </div>
        </label>
    )
}