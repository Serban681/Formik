import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

import mongoose from 'mongoose';

const FormAnswers = mongoose.model('FormAnswers')

export const forms = router({
    submitAnswer: publicProcedure
        .input(z.object({
            formId: z.string(),
            answers: z.array(
                z.object({
                    type: z.string(),
                    answer: z.string(),
                    answers: z.array(z.string()),
                }))
        }))
        .mutation(async (opts: { input: any; }) => {
            try {
                const { input } = opts

                const formAnswers = new FormAnswers({
                    formId: input.formId,
                    answer: input.answer,
                    answers: input.answers
                })

                await formAnswers.save()
            } catch(err) {
                console.log(err)
            }
        }),
    getAnswers: publicProcedure
        .input(z.string())
        .query(async (opts: { input: any; }) => {
            if(!opts.input) return null
            const answers = await FormAnswers.find({ formId: opts.input })

            return answers
        })
})