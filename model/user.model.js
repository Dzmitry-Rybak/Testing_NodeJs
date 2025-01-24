import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.Model("User", userSchema);

export default userModel;
