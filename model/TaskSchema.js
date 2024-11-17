
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import DeliverableSchema from "./DeliverableSchema.js";

const TaskSchema = new Schema({
    vertical_name: String,
    service_name: String,
    is_checked: Boolean,
    deliverable_info: [{ type: Schema.Types.ObjectId, ref: 'deliverables' }]
});

export default mongoose.model('tasks', TaskSchema);