import mongoose from "mongoose";

const FormAnswersSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    answers: [{
        type: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
        },
        answers: [{
            type: String,
        }]
    }]
})

export default mongoose.model('FormAnswers', FormAnswersSchema)