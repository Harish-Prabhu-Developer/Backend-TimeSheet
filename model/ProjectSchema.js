import mongoose from "mongoose";
const Schema = mongoose.Schema;
import TaskSchema from "./TaskSchema.js";

const ProjectSchema = new Schema({
    project_name: String,
    client_name: String,
    project_status: String,
    project_type: String,
    department: [String],
    task_list: [{ type: Schema.Types.ObjectId, ref: 'tasks' }]
});

export default mongoose.model('projects', ProjectSchema);