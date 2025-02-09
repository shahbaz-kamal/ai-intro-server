require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7800;
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a cat. Your name is Neko.",
});

app.get("/test", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    res.send("Please provide a prompt");
    return;
  }
  const result = await model.generateContent(prompt);
  // console.log(result.response.text());
  res.send(result.response.text());
});

app.get("/make-decision", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    res.send("Please provide a prompt");
    return;
  }

  // create history
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "when i give you any propmt, You have to tell me the rumour percentages of the prompt",
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "Okay. tell me." }],
      },
      {
        role: "user",
        parts: [
          {
            text: "Apple's next iPhone will be completely portless—no charging, no buttons, just pure AI magic!",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Rumor Probability: 70% - Apple has been moving towards portless design, but complete AI control is unlikely in the near future.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Elon Musk is secretly working on a neural chip that lets you control your phone with your thoughts!",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Rumor Probability: 80% - Neuralink is working on brain-computer interfaces, but full phone control is still in early research.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Cristiano Ronaldo and Messi are planning to launch their own football club!",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Rumor Probability: 50% - Both players have business ventures in football, but no solid evidence of a joint club yet.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "NASA just intercepted a mysterious signal from deep space—could this be first contact?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Rumor Probability: 40% - NASA does receive unexplained signals, but most turn out to have natural explanations.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "GTA 6 will have a secret online mode where players can earn real money!",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Rumor Probability: 60% - GTA 6 may have an advanced economy, but real money transactions remain speculative.",
          },
        ],
      },
    ],
  });

  let result = await chat.sendMessage(prompt);
  // console.log(result.response.text());
  const answer=result.response.text()
  res.send({rumorStatus:answer});
});

app.get("/", (req, res) => {
  res.send("Ai introduction is running");
});
app.listen(port, () => {
  console.log("Ai server is running on port", port);
});
