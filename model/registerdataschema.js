import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const RegisterUserSchema =new mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },    
    dept:{
        type:String,
        require:true,
    },
    Userlevel:{
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    tfa: {
      type: Boolean,
      default: true,
    },
    services: {
      type: [String],
      default: []
    },
    iat: {
      type: String,
      required: true,
    }

});


// Pre-save middleware to hash the password
RegisterUserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
      try {
          const hashedPassword = await bcrypt.hash(this.password, 10); // Hashing the password
          this.password = hashedPassword; // Storing the hashed password
          next(); // Proceed to save
      } catch (err) {
          next(err); // Handle errors
      }
  } else {
      next(); // Proceed if password is not modified
  }
});
export default mongoose.model("registerData",RegisterUserSchema);