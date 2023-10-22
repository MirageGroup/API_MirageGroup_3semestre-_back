import Express from "express";
import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import appDataSource from "./infra/data-source";
import Process from "./infra/entities/process.entity";
import Task from "./infra/entities/task.entity";
import User from "./infra/entities/user.entity";
import Role from "./infra/entities/role.entity";
import bodyParser from "body-parser";
import { process as processRouter } from './routes/process.router';
import { user as userRouter } from "./routes/user.router";
import { task as taskRouter } from "./routes/task.router"
import { iso as isoRouter } from "./routes/iso.router"
import cors from "cors"; // Import the cors middleware

const app = Express()
app.use(bodyParser.json())
require('dotenv').config()
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

appDataSource.initialize().then(() => {
    console.log("Database initialized succesfully")
})

app.get('/', async (req, res) => {
    res.send("Hello World!")
})

app.use('/process', processRouter)
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/iso', isoRouter)