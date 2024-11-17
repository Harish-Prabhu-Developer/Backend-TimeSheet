
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubDeliverableSchema = new Schema({
    sub_deliverable_name: String,
    subdeliverable_no: Number,
    selected_user: [String]
});

export default mongoose.model('subDeliverables', SubDeliverableSchema);
