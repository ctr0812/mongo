import mongoose from "mongoose";
import express from "express";
import {User} from "./models/Users.js";

const app = express();

const users = [];
const MONGO_URI = "mongodb+srv://test:test@cluster0.s95qpjg.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.use(express.json());

        app.get('/users', async (req, res) => {
            try {
                const users = await User.find();
                return res.send({users});
            } catch (e) {
                console.log(e);
                return res.status(500).send({err: e.message});
            }

        })

        app.post('/users', async (req, res) => {
            try {
                let {username, name} = req.body;
                if (!username) return res.status(400).send({err: 'username is required'});
                if (!name || !name.first || !name.last) return res.status(400).send({err: "Both first and last required"});

                const user = new User(req.body)
                await user.save();
                return res.send(user);
            } catch (e) {
                console.log(e);
                return res.status(500).send({err: e.message});
            }

        })


        app.listen(3000, async () => console.log('server listening on port 3000'));
    } catch (e) {
        console.log(e)
    }

}

server();