/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { Form } from '@/utils/dataStructures';

import mongoose from 'mongoose';
import FormAnswers from "@/server/models/FormAnswers";

const Form = mongoose.model('Form')

export const forms = router({
    createForm: publicProcedure
        .input(z.object({
            title: z.string(),
            fields: z.array(
                z.object({
                    type: z.string(),
                    question: z.string(),
                    options: z.array(
                        z.object({
                            answer: z.string()
                        }))
                })),
            isDraft: z.boolean(),
            creator: z.string()
        }))
        .mutation(async (opts: { input: Form }) => {
            try {
                const { input } = opts
            
                await Form.create({
                    _id: new mongoose.Types.ObjectId(),
                    title: input.title,
                    fields: input.fields,
                    isDraft: input.isDraft,
                    creator: input.creator
                })
            } catch(err) {
                console.log(err)
            }
        }),
    getCreatedForms: publicProcedure
        .input(z.string())
        // .output(z.array(z.object({
        //     _id: z.string(),
        //     title: z.string(),
        //     fields: z.array(
        //         z.object({
        //             type: z.string(),
        //             question: z.string(),
        //             options: z.array(
        //                 z.object({
        //                     answer: z.string()
        //                 }))
        //         })),
        //     isDraft: z.boolean(),
        //     creator: z.string()
        // })))
        .query(async (opts: { input: string; }) => {
            const forms: Form[] = await Form.find({ isDraft: false, creator: opts.input })
            return forms
        }),
    getDraftForms: publicProcedure
        .input(z.string())
        // .output(z.array(z.object({
        //     _id: z.string(),
        //     title: z.string(),
        //     fields: z.array(
        //         z.object({
        //             _id: z.string(),
        //             type: z.string(),
        //             question: z.string(),
        //             options: z.array(
        //                 z.object({
        //                     answer: z.string()
        //                 }))
        //         })),
        //     isDraft: z.boolean(),
        //     creator: z.string()
        // })))
        .query(async (opts: { input: string; }) => {
            const forms: Form[] = await Form.find({ isDraft: true, creator: opts.input })
            if (!forms.length) return []
            return forms
        }),
    getForm: publicProcedure
        .input(z.string())
        .query(async (opts: { input: string; }) => {
            if(!opts.input) return null
            const form:Form | null = await Form.findById(opts.input)
            if(!form) return null
            return form
        }),
    updateForm: publicProcedure
        .input(z.object({
            _id: z.string(),
            title: z.string(),
            fields: z.array(
                z.object({
                    type: z.string(),
                    question: z.string(),
                    options: z.array(
                        z.object({
                            answer: z.string()
                        }))
                })),
            isDraft: z.boolean(),
            creator: z.string()
        }))
        .mutation(async (opts: { input: Form; }) => {
            try {
                const { input } = opts
                
                const form = await Form.findById(input._id)

                if(form) {
                    form.title = input.title
                    form.fields = input.fields
                    form.isDraft = input.isDraft
                    form.creator = input.creator

                    await form.save()
                }
            } catch(err) {
                console.log(err)
            }
        }),

    deleteForm: publicProcedure
        .input(z.string())
        .mutation(async (opts: { input: any; }) => {
            try {
                await Form.findByIdAndDelete(opts.input)
                await FormAnswers.deleteMany({ formId: opts.input })
            } catch(err) {
                console.log(err)
            }
        })
})