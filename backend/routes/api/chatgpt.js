const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");
const mongoose = require("mongoose");
const ChatGPT = mongoose.model("ChatGPT");
const { requireUser } = require("../../config/passport");
// If you're using ES6 imports elsewhere, ensure your setup supports it
// For the sake of this example, I'm using CommonJS for all imports
const {
  chatGPTKey,
  openAPIURL,
  openAPIOrganizationId,
} = require("../../config/keys");

const configuration = new Configuration({
  organization: openAPIOrganizationId,
  apiKey: chatGPTKey,
});

const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

router.post("/", requireUser, async (req, res) => {
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

    const chatEntry = new ChatGPT({
      userId: req.user ? req.user._id : null, // Assuming you have user authentication and req.user contains the authenticated user
      prompt: userInput,
      response: chatOutput,
      modelUsed: "text-davinci-003", // This is hardcoded for this example. You could also dynamically retrieve it from the completion data if it's provided.
      apiParameters: {
        temperature: 0.7, // This is just a sample value. Replace with actual temperature if used.
        maxTokens: 150, // This is just a sample value. Replace with actual max tokens if used.
      },
      apiResponseMetadata: {
        duration: completion.data.duration, // Assuming the API returns a duration field
        responseId: completion.data.id, // Assuming the API returns an id field
      },
      errorData: null, // This would be populated in the catch block if there was an error. For now, it's null.
      userContext: {
        deviceInfo: req.headers["user-agent"], // This captures the device/browser info but may need further parsing to be more meaningful.
        userAgent: req.headers["user-agent"], // Just using user agent as an example. Adjust accordingly.
        location: req.ip, // Captures IP address as a rough location indicator. Consider integrating with an IP geolocation service for better location data.
      },
      costData: 0, // Assuming you're not capturing cost info for now. Adjust if needed.
      version: "1.0", // Example versioning. Update based on your needs.
      interactionType: "API", // This is a hardcoded example. You might want to specify whether it's a manual input, API request, etc.
      feedback: null, // Assuming no feedback is provided at this stage.
      userBehavior: {
        interactionFrequency: 1, // Example value. You might want to increment this based on user's interactions.
        responseReadingDuration: 5, // Example value in seconds. You'd need additional logic to capture actual reading duration.
        followUpQueries: 0, // Example value. Increment this if user makes follow-up queries.
        modifiedPrompt: false, // Example value. Determine this based on user behavior.
      },
      timestamp: Date.now(), // This will capture the current date and time.
    });

    try {
      await chatEntry.save();
    } catch (dbError) {
      console.error("Failed to save chat entry:", dbError);
      return res.status(500).json({ error: "Failed to save chat entry." });
    }

    res.json({ response: chatEntry });
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
