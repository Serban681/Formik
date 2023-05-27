/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* @typescript-eslint/no-unused-vars */
import { Btn } from "@/components/Buttons"
import SectionTitle from "@/components/SectionTitle"

import React, { useState, useEffect } from "react"
import { type Form } from "@/utils/dataStructures"
import { TextField, FixedAnswerField, AddButton } from "@/components/FormCreatorFields"
import useBlockRoute from "@/utils/useBlockRoute"
import { useRouter } from "next/router"
import { api } from "@/utils/api"
import { useSession } from "next-auth/react"

export default function UpdateFormPage() {
    useBlockRoute()

    const [fieldTypeToAdd, setFieldTypeToAdd] = useState('text')
    const [form, setForm] = useState<Form>({
        _id: '1',
        title: '',
        fields: [],
        isDraft: true,
        creator: ''
    })

    const { data: session } = useSession()

    const router = useRouter()

    const formId = router.query.id as string

    const {data} = api.forms.getForm.useQuery(formId || '')

    const updateFormMutation = api.forms.updateForm.useMutation()

    useEffect(() => {
        if(!data) return
        setForm(data)

        if(!session?.user?.email) return

        if(data.creator !== session?.user?.email) {
            router.push('/dashboard').catch((err) => console.log(err))
        }
    }, [router.query.id, data])

    const addField = () => {
        const newFields = form?.fields && form ? [...form.fields] : [];

        newFields.push({ type: fieldTypeToAdd, question: "", options: [{answer: ''}] });
        setForm({ ...form, fields: newFields });
    };

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if(form === undefined) return;
        const newFields = form?.fields && form ? [...form.fields] : [];

        if(newFields[index] === undefined) return
        newFields[index]!.question = event.target.value;
        setForm({ ...form, fields: newFields });
    };

    const removeField = (index: number) => {
        if(form === undefined) return;
        const newFields = form.fields ? [...form.fields] : [];

        newFields.splice(index, 1);

        setForm({ ...form, fields: newFields });
    };

    const addOptions = (index: number, options: { answer: string }[]) => {
        if(form === undefined) return;
        const newFields = form.fields ? [...form.fields] : [];

        if(newFields[index] === undefined) return
        newFields[index]!.options = options
        setForm({ ...form, fields: newFields })
    }

    const createForm = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        await updateFormMutation.mutate({...form, _id: form._id!, isDraft: false })
        router.push('/dashboard').catch((err) => console.log(err))
    }

    const saveDraft = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateFormMutation.mutate({...form, _id: form._id!, isDraft: true })
        router.push('/dashboard').catch((err) => console.log(err))
    }


    return (
        <main>
            <SectionTitle>Create a Form</SectionTitle>
            <div className="flex justify-between mt-5">
                <div>
                    <form>
                        <label className="text-2xl mt-1 block" htmlFor="title">
                            Title
                            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="border-black border-[2px] block text-sm p-1.5 w-64 focus:outline-none" placeholder="ex: Lesson Feedback" type="text" name="title" />
                        </label>

                        {form?.fields?.map((field, index) => {
                            if(field.type === 'text') {
                                return <TextField key={index} questionId={index} handleChange={handleChange} form={form} removeField={removeField} />
                            } else {
                                return <FixedAnswerField key={index} type={field.type} questionId={index} handleChange={handleChange} addOptions={addOptions} form={form} removeField={removeField} />
                            }
                        })}

                        <label className="text-2xl mt-3 block" htmlFor="title">
                            Add Question
                            <br />
                            <select value={fieldTypeToAdd} onChange={(e) => setFieldTypeToAdd(e.target.value)} className="border-black border-[2px] bg-white text-sm p-1.5 w-64 focus:outline-none" name="title">
                                <option value="text">Text</option>
                                <option value="dropdown">Dropdown</option>
                                <option value="radio">Radio</option>
                                <option value="checkbox">Checkbox</option>
                            </select>
                            <AddButton handleClick={addField}/>
                        </label>

                        <div className="mt-8">
                            <Btn handleClick={createForm}>Submit</Btn>
                        </div>

                        <div className="mt-6">
                            <Btn index={1} handleClick={saveDraft}>Save Draft</Btn>
                        </div>
                    </form>
                </div>

                <div className="ml-96 hidden md:block">
                    <PreviewForm form={form} />
                </div>
            </div>
        </main>
    )
}

const PreviewForm = ({form}: {form: Form}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-5">{form.title ? form.title : 'Title'}</h2>

            {form?.fields?.map((field, index) => {
                if(field.type === 'text') {
                    return <TextFieldPreview key={index} question={field.question} />
                }
                else if(field.type === 'dropdown') {
                    return <DropdownFieldPreview key={index} question={field.question} options={field.options} />
                }
                else if(field.type === 'radio') {
                    return <RadioFieldPreview key={index} question={field.question} options={field.options} />
                }
                else {
                    return <CheckboxFieldPreview key={index} question={field.question} options={field.options} />
                }
            })}

            <div className="mt-7">
                <Btn>Submit</Btn>
            </div>
        </div>
    )
}

const TextFieldPreview = ({question}: {question: string}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question? question : 'Question'}
            <br />
            <input className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" placeholder="ex: What's your favourite color?" type="text" name='text' />
        </label>
    )
}

const DropdownFieldPreview = ({question, options}: {question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question? question : 'Question'}
            <br />
            <select className="border-black border-[2px] bg-white text-sm p-1.5 w-64 focus:outline-none">
                {options.map((option, index) => <option key={index}>{option.answer}</option>)}
            </select>
        </label>
    )
}

const RadioFieldPreview = ({question, options}: {question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question? question : 'Question'}
            <br />
            <div>
                {options.map((option, index) => {
                    return (
                        <div className="mr-5 text-base" key={index}>
                            <input type="radio" name={`${question}`} className="accent-pink" /> {option.answer}
                        </div>
                    )})}
            </div>
        </label>
    )
}

const CheckboxFieldPreview = ({question, options}: {question: string, options: { answer: string }[]}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {question? question : 'Question'}
            <br />
            <div>
                {options.map((option, index) => {
                    return (
                        <div className="mr-5 text-base" key={index}>
                            <input type="checkbox" name={`${question}`} className="accent-pink" /> {option.answer}
                        </div>
                    )})}
            </div>
        </label>
    )
}