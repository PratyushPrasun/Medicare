import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctorRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';
import path from "path";

const app = express();
<<<<<<< HEAD
import path from "path";
=======
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

>>>>>>> 3a496d2436f45e8c4c170246b2f8e13308c3827f

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
const port = 4000;

const allowedorigins = [
    "https://medicare-eight-nu.vercel.app",
<<<<<<< HEAD
    "http://localhost:5173",
    "http://localhost:5174",
=======
    "https://medicare-u5uv.vercel.app",
>>>>>>> 3a496d2436f45e8c4c170246b2f8e13308c3827f
];

app.use(cors(
    {
        origin: function(origin, callback){
            if(!origin) return callback(null,true);
            if(allowedorigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by"))
        },
        credentials:true,
        methods: ["GET", "POST","PUT","DELETE", "OPTIONS"],
        allowedHeaders:["Content-Type", "Authorization"]
    }
));
app.use(clerkMiddleware());
app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({limit: "20mb", extended:true}));

//DB
connectDB();
//Routes
app.use("/api/doctors", doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/service-appointments",serviceAppointmentRouter);

app.get('/', (req, res)=>{
    res.send("Api Working");
})

app.listen(port, ()=>{
    console.log(`Server is started at localhost${port}`);
})
