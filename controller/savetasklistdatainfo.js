import registerdataschema from "../model/registerdataschema.js";
import ProjectSchema from "../model/ProjectSchema.js";
import DeliverableSchema from "../model/DeliverableSchema.js";
import SubDeliverableSchema from "../model/SubDeliverableSchema.js";
import TaskSchema from "../model/TaskSchema.js";
import saveTasklistSchema from "../model/saveTasklistSchema.js";

export const savetasklistdata =async(req,res)=>{

    try {
        const { umail, _id } = req.body;

        // Check if the user exists in the register data schema
        const registerExist = await registerdataschema.findOne({ email: umail });
    
        if (!registerExist) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Check if the task list document already exists
        let task;
        if (_id) {
          // Update the existing task list document
          task = await saveTasklistSchema.findByIdAndUpdate(_id, req.body, { new: true });
        } else {
          // Create a new task list document
          task = new saveTasklistSchema(req.body);
          await task.save();
        }
    
        res.status(200).json({ message: _id ? 'Task updated successfully' : 'Task saved successfully', data: task });
               

    } catch (error) {
        console.log(error.message);
         res.status(300).json({error:"Internel Server Error"}) 
    }

};



