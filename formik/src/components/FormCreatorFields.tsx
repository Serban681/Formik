/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import plus_black from "@/images/plus_black.svg"
import remove_icon from "@/images/remove_icon.svg"
import Image from "next/image"
import { useState } from "react"
import { type Form } from "@/utils/dataStructures"

export const TextField = ({questionId, handleChange, form, removeField}: {questionId: number, handleChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void, form: Form, removeField: (index: number) => void}) => {
    return (
        <label className="text-2xl mt-3 block" htmlFor={`text-${questionId}`}>
            Question<span className="text-xs text-gray">(text field)</span>
            <br />
            <input onChange={(e) => handleChange(questionId, e)} value={form.fields ? form.fields[questionId]?.question : ''} className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" placeholder="ex: What's your favourite color?" type="text" name={`text-${questionId}`} />
            <RemoveButton handleClick={() => removeField(questionId)} />
        </label> 
    )
}

export const FixedAnswerField = ({type, questionId, handleChange, addOptions, form, removeField}:{type:string, questionId: number, handleChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void, addOptions: (index: number, options: { answer: string }[]) => void, form: Form, removeField: (index: number) => void}) => {
    const [options, setOptions] = useState([{
        answer: ''
    }])

    const addOption = () => {
        const newOptions = [...options]
        newOptions.push({answer: ''})
        setOptions(newOptions)
        addOptions(questionId, newOptions)
    }

    const removeOption = (index: number) => {
        const newOptions = [...options]
        newOptions.splice(index, 1)
        setOptions(newOptions) 
        addOptions(questionId, newOptions)
    }

    const handleOptionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index]!.answer = event.target.value
        setOptions(newOptions)
        addOptions(questionId, newOptions)
    }

    return (
        <>
            <label className="text-2xl mt-3 block" htmlFor={`${type}-${questionId}`}>
                Question<span className="text-xs text-gray">({type} field)</span>
                <br />
                <input onChange={(e) => handleChange(questionId, e)} value={form.fields ? form.fields[questionId]?.question : ''} className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" placeholder="ex: What's your favourite color?" type="text" name={`${type}-${questionId}`} />
                <RemoveButton handleClick={() => removeField(questionId)} />
            </label>

            {options.map((option, index) => <AnswerField index={index} options={options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} key={index} />)}
        </>
    )
}

export const AnswerField = ({index = 0, options, addOption, removeOption, handleOptionChange} : {index?: number, options: {answer: string}[], addOption: () => void, removeOption: (index: number) => void, handleOptionChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void}) => {

    return (
        <label className="text-lg mt-3 block" htmlFor="answer">
            Answer {index + 1}
            <br />
            <input value={options[index]?.answer} onChange={(e) => handleOptionChange(index, e)} className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" placeholder="ex: Credit Card" type="text" name="answer" />
            {index === 0 ? <AddButton handleClick={addOption} /> : <RemoveButton handleClick={() => removeOption(index)} />}
        </label>
    )
}

export const AddButton = ({handleClick}: {handleClick: () => void}) => {
    return (
        <Image onClick={handleClick} className="w-6 inline ml-1 hover:scale-110 transition-all cursor-pointer" src={plus_black} alt={"Plus black"} />
    )
}

export const RemoveButton = ({handleClick}: {handleClick: () => void}) => {
    return (
        <Image onClick={handleClick} className="w-6 inline ml-1 hover:scale-110 transition-all cursor-pointer" src={remove_icon} alt={"Plus black"} />
    )
}