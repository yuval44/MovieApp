const express = require('express')
const app = express()

// - Connect to mongodb
require("./configs/database")


// - Middlewares
app.use(express.json()) // For parsing application/json
const cors = require('cors')
app.use(cors())


// - Routes
const usersRouter = require("./routers/usersRouter")
app.use("/users", usersRouter)

const membersRouter = require("./routers/membersRouter")
app.use("/members", membersRouter)

const subscriptionsRouter = require("./routers/subscriptionRouter")
app.use("/subscriptions", subscriptionsRouter)

const moviesRouter = require("./routers/movieRouter")
app.use("/movies", moviesRouter)

const loginRouter = require("./routers/loginRouter")
app.use("/login", loginRouter)


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})

