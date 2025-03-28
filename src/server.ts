import { json } from "body-parser"
import Express from "express"
import { init } from "./db/mongo/mongo"
import { appRoute } from "./routes"

const app = Express()
app.use(json())
app.use("api", appRoute)

app.listen(3000, async () => {
    await init()
    console.log('apprunning on port 3000')
})
