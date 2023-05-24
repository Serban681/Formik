export default function SectionTitle({children}: {children: React.ReactNode}) {


    return (
        <div className={'text-3xl font-medium mt-10 text-black relative'}>
            {children}
            {/* <div className="w-16 h-3 bg-yellow absolute bottom-0 right-0 z-[-1]"/> */}
        </div>
    )
}