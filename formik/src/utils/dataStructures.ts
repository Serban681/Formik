export interface Form {
    _id?: string,
    title: string,
    fields: {
        type: string,
        question: string,
        options: {
            answer: string
        }[]
    }[],
    isDraft: boolean,
    creator: string
}