import { Injectable } from "@nestjs/common";
import { calculatorAgentBuilder } from "./agent.graph";

@Injectable()
export class AgentService {
  async ask(query: string): Promise<any> {
    const result = await calculatorAgentBuilder.invoke({
      messages: [{ role: "user", content: query }],
    });

    const final = result.messages.at(-1)?.content;
    return final || "No response.";
  }
}
