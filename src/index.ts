import Express, { NextFunction, Request, Response } from "express";
import appDataSource from "./infra/data-source";
import bodyParser from "body-parser";
import { process as processRouter } from './routes/process.router';
import { user as userRouter } from "./routes/user.router";
import { task as taskRouter } from "./routes/task.router"
import { iso as isoRouter } from "./routes/iso.router"
import cors from "cors";

const app = Express()
require('dotenv').config()
app.use(bodyParser.json())
app.use(cors());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    
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

app.use('/process', processRouter)
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/iso', isoRouter)