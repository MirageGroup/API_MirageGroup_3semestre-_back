import Express from "express";
import appDataSource from "./infra/data-source";
import Process from "./infra/entities/process.entity";
import Task from "./infra/entities/task.entity";
import User from "./infra/entities/user.entity";
import Role from "./infra/entities/role.entity";
import bodyParser from "body-parser";

const app = Express()
app.use(bodyParser.json())
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

appDataSource.initialize().then(() => {
    console.log("Database initialized succesfully")
})

app.get('/', async (req, res) => {
    console.log(req.body)
    const processRepository = appDataSource.getRepository(Process)
    const process = await processRepository.find({
        where: { id: 1 },
        relations: {
            tasks: true
        }
    })
    const taskRepository = appDataSource.getRepository(Task)
    const task = await taskRepository.find()

    const userRepository = appDataSource.getRepository(User)
    const user = await userRepository.find({ 
        relations: {
            processes: true
        }
    })




    const roleRepository = appDataSource.getRepository(Role)
    const role = await roleRepository.find({
        relations: {
            users: true
        }
    })
    res.send({ process })
})