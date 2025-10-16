import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not found in .env");
  process.exit(1);
}

const userId = "68ef6f578ce3e7a06e5a9976"; // your admin _id from DB
const NEW_PASSWORD = "Admin12345"; // TEMP password — change after login

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { strict: false });

const User = mongoose.model("UserForReset", UserSchema, "users"); // explicitly use 'users' collection

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(NEW_PASSWORD, salt);

    const result = await User.findByIdAndUpdate(
      userId,
      { password: hashed },
      { new: true }
    );

    if (!result) {
      console.error("User not found — check the userId or collection name");
    } else {
      console.log(`Password for user ${result.email} updated successfully.`);
      console.log(`Temporary password: ${NEW_PASSWORD}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();