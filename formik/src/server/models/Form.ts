import mongoose from "mongoose"

const FormSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    fields: [{
        type: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: [{
            answer: {
                type: String,
            }
        }]
    }],
    isDraft: {
        type: Boolean,
        required: true,
        default: true
    },
    creator: {
        type: String,
    }
})

export default mongoose.model('Form', FormSchema)