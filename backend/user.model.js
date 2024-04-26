import mongoose from "mongoose";

const userSchema = {
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
};

const user = mongoose.model("user", userSchema);

export default user;