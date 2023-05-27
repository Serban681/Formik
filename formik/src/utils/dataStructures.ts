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

export interface Answer {
    type: string,
    answer: string,
    answers: string[]
}

export interface FormAnswers {
    formId: string,
    answers: Answer[]
}