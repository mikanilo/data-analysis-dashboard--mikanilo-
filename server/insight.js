import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

dotenv.config();

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/insight", async (req, res) => {
  try {
    const { prompt } = req.body;
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });
    res.json({ insight: text });
  } catch (error) {
    console.error("AI call failed:", error);
    res.status(500).json({ error: "AI call failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AI insight server listening on port ${PORT}`);
});
