import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Note', NoteSchema);
