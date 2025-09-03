const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const deshbordRoutes = require('./routes/dashbordRoutes');

dotenv.config();
const app = express();

//Middleware to handle cors
app.use(
   cors({
    origin:process.env.CLIENT_URL || "*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
   }) 
)

app.use(express.json());
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashbord", deshbordRoutes);


// Serve uploads floder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 4000;;

app.listen(PORT, () => {
    console.log(`server has been started at [http://localhost:${PORT}]`);
})