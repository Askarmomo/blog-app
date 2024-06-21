import mongoose, { Schema } from "mongoose"


const schema2 = new Schema({

    title: String,
    desc: String,
    file: String
})

const postModel = mongoose.model('post', schema2)

export default postModel