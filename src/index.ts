import Express from "express";

const app = Express()
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

app.get('/', (req, res) => {
    res.send("Hello World!")
})