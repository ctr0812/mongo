import {Schema, model} from "mongoose";

// 스키마는, 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의
const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    age: Number,
    email: String,
}, {timestamps: true})

// 모델은 스키마를 통해서 만드는 인스턴스, 이 객체를 통하여 데이터를 조회,추가,수정 가능
export const User = model('user', UserSchema)
