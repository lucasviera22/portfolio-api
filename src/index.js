const cors = require("cors");
const express = require ('express');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const path = require("path");

//Environment variables
//require("dotenv").config();

//Static access
api.use(express.static(path.join(__dirname, "..", "public")));

// Middlewares - requirements
const loggerMiddleware = require("./middlewares/logger.middleware");
const notFoundMiddleware = require("./middlewares/not-found.middleware");
const errorsMiddleware = require("./middlewares/errors.middleware");

// Routers - requirements
//const authRouter = require("./routers/auth.router");
const aboutHome = require("./routers/home.router");
const contactRouter = require("./routers/contact.router");
const educationRouter = require("./routers/education.router");
const experienceRouter = require("./routers/experience.router")
const projectsRouter = require ("./routers/projects.router");

// Cors and external middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// Logger middleware must be used at the begining
app.use(loggerMiddleware);
app.all("/*", notFoundMiddleware);
app.use(errorsMiddleware);

// Routers - usage
app.use("/home", aboutHome);
app.use("/contact", contactRouter);
app.use("/education", educationRouter);
app.use("/tech", experienceRouter);
app.use("/projects", projectsRouter);

//Others - errors
app.all("/*", notFoundMiddleware);
app.use(errorsMiddleware);

var server = app.listen(PORT, ()=>{
    console.log('Sever running on port', server.address().port)
});