import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGO_URI =
  "mongodb+srv://varupulahemanth:lDneA7ZXVPPtNT1O@myproject.cjgykkf.mongodb.net/Dockerp?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Schema & Model
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
});

// 'mydb' is your collection name
const Employee = mongoose.model("Employee", employeeSchema, "mydb");

// Routes
app.post("/api/employees", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // check data
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).json({ error: "Error saving employee" });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
