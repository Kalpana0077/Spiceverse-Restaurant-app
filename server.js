import app from "./app.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Set port (default 4000 if not in .env)
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

