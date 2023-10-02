const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

// If you're using ES6 imports elsewhere, ensure your setup supports it
// For the sake of this example, I'm using CommonJS for all imports
const { chatGPTKey, openAPIURL } = require("../../config/keys");

const configuration = new Configuration({
  organization: "org-GGSIN1dNV9PKXSHj4ku4Gi1r",
  apiKey: chatGPTKey,
});

const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

router.post("/", async (req, res) => {
  const userInput = req.body.prompt;

  if (!userInput) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  console.log(userInput);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userInput,
    });
    console.log(completion.data.choices[0].text);
    const chatOutput = completion.data.choices[0].text;
    res.json({ response: chatOutput });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).json({ error: "Failed to get a response from ChatGPT." });
    } else {
      console.log(error.message);
      res.status(500).json({ error: "Failed to get a response from ChatGPT." });
    }
  }
});

module.exports = router; // Using CommonJS export here
