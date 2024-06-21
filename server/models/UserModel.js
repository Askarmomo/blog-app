import mongoose, { Schema } from "mongoose"


const schema = new Schema({

    username: String,
    email: String,
    password: String
})

const UserModel = mongoose.model('user', schema)

export default UserModel