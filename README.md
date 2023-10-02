# MailTo

MailTo is a website that uses AI technology to assist users in crafting appropriate email responses.

## Background and Overview

In today's fast-paced digital world, communication has become both instantaneous and voluminous. With the rise in electronic communication, businesses and professionals face an overwhelming number of emails on a daily basis. While timely responses enhance customer satisfaction and professionalism, crafting thoughtful and appropriate responses requires time and effort. Many businesses face a challenge: how to maintain efficient communication without compromising on quality.

Recognizing the need for efficient, consistent, and high-quality email responses, a team of engineers came together to conceptualize MailTo. "MailTo" is an innovative AI-driven platform designed to assist users in crafting appropriate and effective email responses.

## Functionality and MVP

- [ ] User authorization: sign up and log in
- [ ] CRUD Email Session: Users can set and customize their preferences for email interactions, initiate a new email session, view existing ones, edit email contents or settings, and delete sessions no longer needed.
- [ ] AI-Generated Response: Based on the incoming email content and user preferences, the system will generate an appropriate email response, which users can choose to use, modify, or discard.
- [ ] Search Previous Email: Allows users to search through their past emails (sent or received) using keywords.
- [ ] Sending Email: Once the user is satisfied with the email content, they can send it directly from the platform.

## Technologies and Technical Challenges

MailTo is built with the MERN stack (MongoDB, Express, React, and Node). The technologies we will use:

- Backend: Express with Node.js
- Frontend: React, Redux
- Database: MongoDB
- AI and Machine Learning: OpenAI GPT
- Authentication: JWT
- Email Integration: Gmail API.

#### Technical Challenges:

-   Backend: Express with Node.js

    *   Performance: Node.js runs on a single-threaded event loop. CPU-bound tasks can block the event loop and degrade performance.
    *   Error Handling: Proper handling of synchronous and asynchronous errors in Express routes and middleware.
-   Frontend: React, Redux
    *   Component Optimization: Ensuring that React components don't re-render unnecessarily. Techniques like memoization can help.
    *   State Management: Handling complex application state with Redux requires a good understanding of actions, reducers, and store.
-   Database: MongoDB
    *   Data Consistency: MongoDB uses eventual consistency, which might cause issues in situations where strict consistency is required.
    *   Query Performance: Without proper indexing, query performance can degrade, especially with large datasets.
-   AI and Machine Learning: OpenAI GPT
    *   Integrating OpenAI's GPT with your backend to generate responses in real-time.
    *   Model Tuning: Ensuring the AI model gives relevant and appropriate email responses.
    *   Cost Management: AI inference can be expensive. Monitoring and managing API call costs.
-   Authentication: JWT
    *   Token Security: Ensuring JWT tokens are stored securely (e.g., not in local storage due to XSS attacks).

## Accomplished over the Weekend

*   All members of the team finished the MERN tutorials
*   Implement user authorization on database backend - Naim(completed on Sunday)
*   Wrote Project Proposal and planned work for the week.

## Group Members and Work Breakdown

-   Fanyi Tang - Team Lead

-   Sanjid Dewan - Frontend

-   Naim Miah - Backend

-   Yinyin Huang - Flex

### Day 1
- **Fanyi Tang (Team Lead):**
    * Coordinate the initial team meeting to discuss and finalize the week's objectives.
    * Review the technical architecture with the team.

- **Sanjid Dewan (Frontend):**
    * Set up the React app with a basic folder structure.
    * Start designing the layout and user interface mockups.

- **Naim Miah (Backend):**
    * Set up the basic Express server with Node.js.
    * Establish initial routes and controllers.
    * Working on the ChatGPT API

- **Yinyin Huang (Flex):**
    * Collaborate with Naim to set up MongoDB, create initial models.
    * Assist Sanjid with basic component creation in React.

### Day 2:
- **Fanyi Tang:**
    * Review progress from Day 1.
    * Coordinate a check-in meeting to address any blockers.

- **Sanjid Dewan:**
    * Begin coding essential React components, starting with user authorization (login/signup forms).
    * Integrate Redux for state management.

- **Naim Miah:**
    * Implement ChatGPT API in the backend.

- **Yinyin Huang:**
    * Assist in setting up JWT authentication.
    * Begin work on the email session models in MongoDB.

### Day 3:
- **Fanyi Tang:**
    * Review progress from Day 2.
    * Facilitate a meeting for feedback and adjustments.

- **Sanjid Dewan:**
    * Work on the User Preference Input interface in React.
    * Test user authentication flow from the frontend.

- **Naim Miah:**
    * Implement API endpoints related to email CRUD operations.
    * Set up initial API endpoint for AI-Generated Response.

- **Yinyin Huang:**
    * Integrate OpenAI GPT for the email response suggestion.
    * Assist with frontend tasks, specifically connecting React to backend API endpoints.

### Day 4:
- **Fanyi Tang:**
    * Coordinate a halfway-checkpoint meeting.
    * Assist team members in any roadblocks or challenges.

- **Sanjid Dewan:**
    * Implement the Search Previous Email feature on the frontend.
    * Test and refine the user interface.

- **Naim Miah:**
    * Implement backend logic for searching previous emails.
    * Test and ensure smooth integration with the frontend.

- **Yinyin Huang:**
    * Work on integrating email services like Gmail API.
    * Refine AI-generated response mechanics based on test results.

### Day 5:
- **Fanyi Tang:**
    * Facilitate a review meeting for what's been accomplished.
    * Plan the weekend's goals.

- **Sanjid Dewan:**
    * Implement any bonus features or further refine the user interface.
    * Focus on debugging and testing the frontend components.

- **Naim Miah:**
    * Further optimize the backend, address any lag or performance issues.
    * Work on refining and securing the JWT authentication process.

- **Yinyin Huang:**
    * Test the email integration thoroughly to ensure reliable email sends.
    * Assist with either frontend or backend based on where there's a need.

### Weekend (Optional Work/Refinement):
- **Fanyi Tang:**
    * Organize a team check-in, if needed.
    * Assist in any area that requires attention.

- **Sanjid Dewan:**
    * Optimize the frontend
    * Documentation for frontend components.

- **Naim Miah:**
    * Backup database and ensure all data flows are functional.
    * Documentation for API endpoints.

- **Yinyin Huang:**
    * Finalize any pending tasks, be it on the AI integration or email systems.
    * Help with documentation or testing as required.
