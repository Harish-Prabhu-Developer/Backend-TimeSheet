import saveTasklistSchema from "../model/saveTasklistSchema.js";
import registerdataschema from "../model/registerdataschema.js";

export const removetaskdata = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the task exists in the saveTasklistSchema
    const task = await saveTasklistSchema.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

   
    // Remove the task
    const removeid =await saveTasklistSchema.findByIdAndDelete(id);

    // Respond with a success message
    res.status(200).json({ msg: "Task removed successfully",remove:removeid });
  } catch (error) {
    console.log('Error removing task:', error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
