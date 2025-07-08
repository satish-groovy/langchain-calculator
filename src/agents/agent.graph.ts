import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { config } from "dotenv";
import { calculatorTools } from "../tools/calculator.tools";
config();

// LangChain implementation
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
});

const llmWithTools = llm.bindTools(calculatorTools);

// Nodes
async function llmCall(state: any) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    },
    ...state.messages,
  ]);

  return {
    messages: [...state.messages, result],
  };
}

const toolNode = new ToolNode(calculatorTools);

// Conditional edge function to route to the tool node or end
function shouldContinue(state: any) {
  // const last = state.messages.at(-1);
  const last =
    state.messages.length > 0
      ? state.messages[state.messages.length - 1]
      : undefined;
  return last?.tool_calls?.length ? "Action" : "__end__";
}

// Build workflow
export const calculatorAgentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    // Name returned by shouldContinue : Name of next node to visit
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();
