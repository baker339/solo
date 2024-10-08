// chatgptService.ts
import axios from "axios";

const OPENAI_API_KEY =
  "sk-svcacct-_pJpOIMtag8ODM0lW2yUoOa1uHkNRHOCEM9ROn8Hj6pKGvmj9O4Pi_FwzKzbH5-T3BlbkFJyGA9L9KSIgPmzYuxKiS6m-jYSifpOcJ9WoVfh4qSHgtZge6zwSlmQvwuVbAYT_AA"; // Replace with your actual API key
const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";

const generateTrainingPlan = async (userResponses: any): Promise<string> => {
  const messages = [
    { role: "system", content: "You are a fitness coach." },
    {
      role: "user",
      content: `Based on the following user responses, generate a comprehensive training plan: ${JSON.stringify(
        userResponses
      )}`,
    },
  ];

  const response = await axios.post(
    CHATGPT_API_URL,
    {
      model: "gpt-3.5-turbo",
      messages: messages,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
};

export { generateTrainingPlan };
