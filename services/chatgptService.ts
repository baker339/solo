import axios from "axios";

const OPENAI_API_KEY = ""; // Replace with your actual API key
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

const checkIfClimbingRelated = async (description: string): Promise<string> => {
  const messages = [
    { role: "system", content: "You are a climbing expert." },
    {
      role: "user",
      content: `Is this about a climbing or bouldering problem? "${description}"`,
    },
  ];

  const response = await axios.post(
    CHATGPT_API_URL,
    {
      model: "gpt-3.5-turbo",
      messages,
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

const getClimbingBeta = async (description: string): Promise<string> => {
  const messages = [
    { role: "system", content: "You are a climbing expert." },
    {
      role: "user",
      content: `Give me beta or tips for this bouldering problem: "${description}"`,
    },
  ];

  const response = await axios.post(
    CHATGPT_API_URL,
    {
      model: "gpt-3.5-turbo",
      messages,
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

export { generateTrainingPlan, checkIfClimbingRelated, getClimbingBeta };
