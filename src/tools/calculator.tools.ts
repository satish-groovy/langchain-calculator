import { tool } from "@langchain/core/tools";
import { z } from "zod";

//Define schema for calculator tool
const schema = z.object({
  a: z.number().describe("The first number"),
  b: z.number().describe("The first number"),
}) as any;

const add = tool(async ({ a, b }) => a + b, {
  name: "addition",
  description: "Add two numbers",
  schema,
});

const subtraction = tool(async ({ a, b }) => a - b, {
  name: "subtraction",
  description: "subtraction two numbers",
  schema,
});

const multiply = tool(async ({ a, b }) => a * b, {
  name: "multiply",
  description: "multiplies two numbers",
  schema,
});

const divide = tool(async ({ a, b }) => a / b, {
  name: "divide",
  description: "divide two numbers",
  schema,
});

// Augment the LLM with tools
export const calculatorTools = [add, subtraction, multiply, divide];
