import { tool } from "@langchain/core/tools";
import { z } from "zod";
// import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
// import {
//   SystemMessage,
//   ToolMessage
// } from "@langchain/core/messages";

import { config } from "dotenv";
config()

// const llm = new ChatOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     modelName: "gpt-4.1",
//   });

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});


const add = tool(
    async ({ a, b }) => {
      return a + b;
    },
    {
      name: "addition",
      description: "add two numbers",
      schema: z.object({
        a: z.number("the first number"),
        b: z.number("the second number"),
      }),
    }
  );

  const subtraction = tool(
    async ({ a, b }) => {
      return a - b;
    },
    {
      name: "subtraction",
      description: "subtraction two numbers",
      schema: z.object({
        a: z.number("the first number"),
        b: z.number("the second number"),
      }),
    }
  );

  const multiply = tool(
    async ({ a, b }) => {
      return a * b;
    },
    {
      name: "multiply",
      description: "multiplies two numbers",
      schema: z.object({
        a: z.number("the first number"),
        b: z.number("the second number"),
      }),
    }
  );

  const divide = tool(
    async ({ a, b }) => {
      return a/ b;
    },
    {
      name: "divide",
      description: "divide two numbers",
      schema: z.object({
        a: z.number("the first number"),
        b: z.number("the second number"),
      }),
    }
  );


  // Augment the LLM with tools
const tools = [add, subtraction,multiply, divide];
// const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);


// Nodes
async function llmCall(state) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    },
    ...state.messages
  ]);

  return {
    messages: [result]
  };

}

  const toolNode = new ToolNode(tools);

  // Conditional edge function to route to the tool node or end
function shouldContinue(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges(
    "llmCall",
    shouldContinue,
    {
      // Name returned by shouldContinue : Name of next node to visit
      "Action": "tools",
      "__end__": "__end__",
    }
  )
  .addEdge("tools", "llmCall")
  .compile();


// Invoke
const messages = [
  {
role: "user",
content: "what is the modulo of 3 and 4."
}
];
const result = await agentBuilder.invoke({ messages });
console.log(result.messages);
