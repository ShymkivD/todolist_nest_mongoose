import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    id: String,
    title : String,
    date: Date,
    done: Boolean
});
