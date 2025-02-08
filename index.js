require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7800;
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/test", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    res.send("Please provide a prompt");
    return
  }
  const result = await model.generateContent(prompt);
  // console.log(result.response.text());
  res.send(result.response.text());
});

app.get("/", (req, res) => {
  res.send("Ai introduction is running");
});
app.listen(port, () => {
  console.log("Ai server is running on port", port);
});
