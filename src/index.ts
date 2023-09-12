import Express from "express";
import appDataSource from "./infra/data-source";

const app = Express()
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

appDataSource.initialize().then(() => {
    console.log("Database initialized succesfully")
})

app.get('/', (req, res) => {
    res.send("Hello World!")
})