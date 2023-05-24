/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { colors } from "@/utils/colors"

type BigBtnProps = {
    handleClick?: (e: any) => void;
    children: React.ReactNode;
}

export const BigBtn = ({children, handleClick}: BigBtnProps) => {
    return (
        <button onClick={handleClick} className="bg-pink text-white px-6 py-2.5 font-regular text-lg border-solid border-3 border-black shadow-std hover:scale-110 transition-all">{children}</button>
    )
}

export const Btn = ({children, handleClick, index = null}: {handleClick?: (e: any) => void; children: React.ReactNode; index?: number | null}) => {
    return (
        <button onClick={handleClick} className={`${index !== null ? colors[index] : 'bg-pink'} text-white px-8 py-1.5 font-regular text-base border-solid border-3 border-black shadow-std hover:scale-110 transition-all`}>{children}</button>
    )
}