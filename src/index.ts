import Express from "express";
import AWS from "aws-sdk";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
import multer from 'multer';
import multerS3 from 'multer-s3';

const app = Express()
app.use(bodyParser.json())
require('dotenv').config()
app.use(cors());

const s3Client = new S3Client({ region: process.env.AWS_REGION })

const upload = multer({
    storage: multer.memoryStorage(),
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

appDataSource.initialize().then(() => {
    console.log("Database initialized succesfully")
})

app.get('/', async (req, res) => {
    res.send("Hello World!")
})

app.post('/upload', upload.single('file'), async (req, res) => {
        const params = {
            Bucket: 'shorts-bucket',
            Key: req.file?.originalname,
            Body: req.file?.buffer,
        }
        
        try{
            const url = await s3Client.send(new PutObjectCommand(params));
            res.send(url)
        } catch(err){
            console.error(err)
            res.status(500).send(err)
        }
        




    /* const command = new PutObjectCommand({
        Bucket: "shorts-bucket",
        Key: "yyyyyy.txt",
        Body: "Hello S3!",
    })

    try{
        const response = await client.send(command)
        console.log(response)
    } catch(err){
        console.error(err)
    }  */
})

app.use('/process', processRouter)
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/iso', isoRouter)