const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

const validRoutes = require("./routes/index");
const { notFound, errorHandler, errorHandlerMiddleware } = require("./middleware/index");
const connectDB = require("./db/app");

app.use(cors());
app.use(express.json());

app.use("/app/v0/", validRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_API);

        app.listen(port, () => {
            console.log(`app listening at port ${port}`);
        });
    } catch (error) {
        console.error("Error starting the app:", error);
        setTimeout(start, 1000);
    }
};

start()
    .then()
    .catch((e) => console.log(e));
