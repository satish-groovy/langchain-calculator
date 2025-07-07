import { tool } from "@langchain/core/tools";
import { z } from "zod";

const add = tool(async ({ a, b }) => a + b, {
  name: "addition",
  description: "Add two numbers",
  schema: z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  }),
});

const subtraction = tool(async ({ a, b }) => a - b, {
  name: "subtraction",
  description: "subtraction two numbers",
  schema: z.object({
    a: z.number().describe("the first number"),
    b: z.number().describe("the second number"),
  }),
});

const multiply = tool(async ({ a, b }) => a * b, {
  name: "multiply",
  description: "multiplies two numbers",
  schema: z.object({
    a: z.number().describe("the first number"),
    b: z.number().describe("the second number"),
  }),
});

const divide = tool(async ({ a, b }) => a / b, {
  name: "divide",
  description: "divide two numbers",
  schema: z.object({
    a: z.number().describe("the first number"),
    b: z.number().describe("the second number"),
  }),
});

// Augment the LLM with tools
export const calculatorTools = [add, subtraction, multiply, divide];
