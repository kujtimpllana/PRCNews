import express from "express"
import newsRoute from "./routes/news.js"
import usersRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"

import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin:"*",
    credentials: true,
}))

app.use("/api/news", newsRoute)
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)

app.listen(9000, () => {
    console.log("Connected!")
})