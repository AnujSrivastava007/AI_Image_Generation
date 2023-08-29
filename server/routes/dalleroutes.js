import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    //   response_format: "b64_json",
    });
    // console.log(aiResponse.data[0].url);
    const image = aiResponse.data[0].url; 
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json("Something went wrong");
  }
});

export default router;
