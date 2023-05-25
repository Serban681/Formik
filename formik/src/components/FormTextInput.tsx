export default function FormTextInput({labelName, type, value, handleChange}: {labelName: string, type: string, value: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <label className="text-2xl mt-3 block" htmlFor={'text'}>
            {labelName}
            <br />
            <input className="border-black border-[2px] text-sm p-1.5 w-64 focus:outline-none" type={type} name='text' value={value} onChange={handleChange} />
        </label>
    )
}