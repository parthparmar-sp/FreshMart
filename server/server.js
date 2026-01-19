import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("FreshMart Server is Running");
})
const PORT = process.env.PORT || 5000;
// const MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost:27017/freshmart';


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})

