# 🧮 Gemini Calculator Agent (LangChain + TypeScript)

This project demonstrates how to build a simple **LLM-based calculator agent** using **Google Gemini** (via API key) and **LangChain** in **TypeScript**. The agent interprets natural language arithmetic and uses custom tools to calculate the result.

---

## 📦 Features

- 💬 Uses `gemini-2.5-pro` via Google Generative AI API
- 🔧 Custom LangChain calculator tool (e.g., evaluates math expressions)
- 📡 API key authentication (no OAuth required)
- 🚀 Extensible for adding more tools or agents

---

## 🛠️ Tech Stack

- **TypeScript**
- **LangChain**
- **@google/generative-ai**
- **dotenv** for environment management

## 📁 Folder Structure

📂src<br>
┣ 📄main.ts # Entry point (agent setup & run)<br>
┣ 📂agent/ # Module for calculator setup<br>
┣ 📄tools/calculator.tools.ts # Custom calculator tool<br>
┣ 📄.env # Gemini API key<br>
┣ 📄package.json<br>

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/satish-groovy/langchain-calculator.git
cd langchain-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your .env

```bash
GEMINI_API_KEY=your_api_key_here
```

### 4. Start project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
