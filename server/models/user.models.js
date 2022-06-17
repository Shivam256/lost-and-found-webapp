import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:function(){return this.phone == null}
  },
  phone: {
    type: Number,
    required:function(){return this.email == null}  
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("USER", UserSchema);


export default User;
