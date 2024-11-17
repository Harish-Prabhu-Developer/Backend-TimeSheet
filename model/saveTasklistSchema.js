import mongoose from "mongoose";




const saveTasklistSchema =new mongoose.Schema({

    projectname:{
        type:String,
        require:true,
    },
    deliverablename:{
        type:String,
        require:true,

    },    
    subdeliverablename:{
        type:String,
        require:true,
    },
    department:{
        type:String,
        
    
    },
    userlevel: {
        type:String,
        default:""
    },
    selectedrevision: {
      type: String,
      default:""
    },
    date: {
        type: Date,
        default: Date.now 
     
    },
    timespent: {
      type: String,
      require:true
    },
    umail:{
        type:String,
        require:true
    },
    serviceName:{
        type:[String],
        default:[]
    },
    notes:{
        type:String,
        default:""
    }

});
export default mongoose.model("savetasklist",saveTasklistSchema);