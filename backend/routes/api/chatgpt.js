const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Configuration, OpenAIApi } = require("openai");
const mongoose = require("mongoose");
const ChatGPT = mongoose.model("ChatGPT");
const GPTModel = mongoose.model("GPTModel");
const { requireUser } = require("../../config/passport");
// If you're using ES6 imports elsewhere, ensure your setup supports it
// For the sake of this example, I'm using CommonJS for all imports
const {
  chatGPTKey,
  openAPIURL,
  openAPIOrganizationId,
} = require("../../config/keys");
const User = require("../../models/User");

const configuration = new Configuration({
  organization: openAPIOrganizationId,
  apiKey: chatGPTKey,
});

const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

router.post("/", requireUser, async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
  } else {
    console.log("not authenticated");
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userPrompt = req.body.prompt;
  const options = req.body.options || {};
  const { userMessage, ...otherOptions } = options;
  const emailId = req.body.prompt.emailId || null;
  console.log(options)
  // options example

  // temperature: 0.65,
  // max_tokens: 2155,
  // top_p: 0.52,
  // frequency_penalty: 0,
  // presence_penalty: 0,

  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const integratedMessage = [
      userMessage,
      "The email subject is",
      userPrompt.subject,
      "The email body is",
      userPrompt.message
    ].filter(Boolean).join('. ');

    console.log(integratedMessage)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      // options like word limit, max token, temerpature and so on
      ...otherOptions,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant specialized in crafting email responses.",
        },
        {
          role: "user",
          content: integratedMessage,
        },
      ],

    });
    const chatOutput = completion.data.choices[0].message;

    const chatEntry = new ChatGPT({
      userId: req.user ? req.user._id : null, // Assuming you have user authentication and req.user contains the authenticated user
      prompt: {
        subject: userPrompt.subject,
        message: userPrompt.message,
      },
      response: chatOutput,
      modelUsed: "gpt-3.5-turbo-16k-0613", // This is hardcoded for this example. You could also dynamically retrieve it from the completion data if it's provided.
      apiParameters: {
        temperature: 0.7, // This is just a sample value. Replace with actual temperature if used.
        maxTokens: 400, // This is just a sample value. Replace with actual max tokens if used.
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
      email: req.body.prompt.emailId, // Assuming you have an email model and you're passing the email ID to this endpoint.
    });

    try {
      await chatEntry.save();
    } catch (dbError) {
      console.error("Failed to save chat entry:", dbError);
      return res.status(500).json({ error: "Failed to save chat entry." });
    }
    const response = {
      response: chatEntry.response.content,
      prompt: chatEntry.prompt.subject + "\n " + chatEntry.prompt.message,
      promptParams: chatEntry.apiParameters,
      modelUsed: chatEntry.modelUsed,
      responseId: chatEntry.apiResponseMetadata.responseId,
      emailId: chatEntry.email,
    };
    res.json({ [chatEntry._id]: response });
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

router.get("/models", requireUser, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await openai.listEngines();

    response.data.data.forEach(async (model) => {
      const gptModel = new GPTModel({
        modelId: model.id,
        modelOwner: model.owner,
        ready: model.ready,
        modelObject: model.object,
        permissions: model.permissions,
        created: model.created,
      });

      try {
        gptModel.save();
      } catch (dbError) {
        console.error("Failed to save chat entry:", dbError);
        return res.status(500).json({ error: "Failed to save chat entry." });
      }
    });
    res.json({ models: response.data.data });
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

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/plus.login",
      "https://mail.google.com/",
    ],
    accessType: "offline",
    prompt: "consent",

  })
);

router.get(
  "/oauth2/redirect/google",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", { failureRedirect: "https://mailto.naimmiah.com/dashpage" }),
  (req, res) => {
    //save req.accessToken and req.refreshToken to your database, user model
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        googleAccessToken: req.user.accessToken,
        googleRefreshToken: req.user.refreshToken,
      }
    ).exec();
    console.log(req);
    res.redirect("https://mailto.naimmiah.com/dashpage");
  }
);


module.exports = router; // Using CommonJS export here
