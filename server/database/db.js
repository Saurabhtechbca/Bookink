import mongoose from "mongoose";

export const connectDB =  () =>{
    const ConnectionString="mongodb://localhost:27017/saurabh";
    mongoose.connect(ConnectionString,{
        dbName: "LIBMGTSYSTEM",
    }).then(()=>{
        console.log(`Database connected successfully.`);
}).catch(err=>{
    console.log('Error connecting to database', err);
});
};
