const express = require('express');
const cors = require('cors');
const app = express();
const {PORT} = require('./config/serverConfig');

const {connectDB} = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);


async function serverStart(){
    try{
       
    app.listen(PORT,()=>{
        console.log("Server is running")
    })
    }   catch(error){
        console.log(error)
    
        
    }
    }
    
    serverStart()