import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import errorHandler  from "./middlewares/ErrorHandlingMiddleware.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.use("/api", router)
app.use(errorHandler)
const start = () => {
    try {
        mongoose.connect("mongodb+srv://kuldashev:mO5JzQd3x8annG8z@cluster0.mx0psud.mongodb.net/?retryWrites=true&w=majority").then(() => {
            console.log("mongodb ulandi");
        }).catch(error => {
            console.log("mongodb ulanishida xato", error)
        })
        app.listen(PORT, () => {
            console.log(`backend ${PORT} portda ishga tushdi`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()