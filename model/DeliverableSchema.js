import mongoose from "mongoose";
const Schema = mongoose.Schema;
import SubDeliverableSchema from "./SubDeliverableSchema.js";

const DeliverableSchema = new Schema({
    deliverable_name: String,
    deliverable_no: Number,
    deliverable_category: String,
    is_selected: Boolean,
    isdeliverable: Boolean,
    sub_deliverable_info: [{ type: Schema.Types.ObjectId, ref: 'subDeliverables' }]
});

export default mongoose.model('deliverables', DeliverableSchema);