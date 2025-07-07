import { Controller, Post, Body } from "@nestjs/common";
import { AgentService } from "./agent.service";

@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async send(@Body("ask") query: string) {
    if (!query || query.trim() === "") {
      return { message: "Please ask something..." };
    }
    const result = await this.agentService.ask(query);
    return { result };
  }
}
