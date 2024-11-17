import saveTasklistSchema from "../model/saveTasklistSchema.js";
import registerdataschema from "../model/registerdataschema.js";

export const gettimesheetdateprojectinfo =async(req,res)=>{

    try {
        const { uemail, ulevel} = req.params;

 // Check if the user exists in the register data schema
 const registerExist = await registerdataschema.findOne({ email: uemail });

 if (!registerExist) {
   return res.status(404).json({ error: 'User not found' });
 }

 // Query the saveTasklistSchema based on umail and ulevel
 const task = await saveTasklistSchema.find({ umail:uemail, userlevel: ulevel });
 
 if (task.length === 0) {
   return res.status(404).json({ error: 'No tasks found for the given criteria' });
 }
 // Send the found tasks as the response
 res.status(200).json({result:task});               

    } catch (error) {
        console.log(error.message);
         res.status(300).json({error:"Internel Server Error"}) 
    }

};