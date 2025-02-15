const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Job Position: Software engineer, Company:name, job requirement: react, node js\ndepending on the information given gove me 10 interview questions with answers in Json Format\ngive Question and answer as field in Json\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"Question\": \"Describe your experience with React. What are some of its key advantages and disadvantages, in your opinion?\",\n    \"Answer\": \"I have [Number] years of experience working with React. Its key advantages include its component-based architecture, virtual DOM for performance, and strong community support. Disadvantages can include the complexity of managing state in large applications and the initial learning curve.\"\n  },\n  {\n    \"Question\": \"Explain the concept of JSX in React. Why is it used?\",\n    \"Answer\": \"JSX is a syntax extension to JavaScript that allows you to write HTML-like structures within your JavaScript code. It's used in React to describe the user interface (UI) in a declarative way, making the code more readable and maintainable. It's ultimately transformed into regular JavaScript calls to `React.createElement`.\"\n  },\n  {\n    \"Question\": \"What are React Hooks? Give some examples and explain their purpose.\",\n    \"Answer\": \"React Hooks are functions that let you 'hook into' React state and lifecycle features from functional components. Examples include `useState` (for managing state), `useEffect` (for side effects), `useContext` (for accessing context), and `useReducer` (for complex state logic). They make it easier to reuse stateful logic and keep components cleaner.\"\n  },\n  {\n    \"Question\": \"How do you handle state management in React?  Describe different approaches (e.g., useState, Context API, Redux) and when you might choose one over another.\",\n    \"Answer\": \"I've used various state management approaches. `useState` is good for simple, component-local state. The Context API is suitable for sharing state across a component tree without prop drilling. For more complex applications with global state and predictable state transitions, I've used Redux, or newer alternatives like Zustand or Recoil, depending on the specific needs of the project.\"\n  },\n  {\n    \"Question\": \"Explain the virtual DOM in React and how it improves performance.\",\n    \"Answer\": \"The virtual DOM is a lightweight, in-memory representation of the actual DOM. When the state of a React component changes, React creates a new virtual DOM and compares it to the previous one. It then calculates the minimal set of changes that need to be applied to the real DOM, minimizing expensive DOM manipulations and improving performance.\"\n  },\n  {\n    \"Question\": \"Describe your experience with Node.js. What are some of its strengths and weaknesses?\",\n    \"Answer\": \"I have [Number] years of experience working with Node.js. Strengths include its non-blocking, event-driven architecture, which makes it suitable for building scalable network applications. Its vast ecosystem of npm packages is also a huge advantage. Weaknesses can include its single-threaded nature (requiring clustering for CPU-intensive tasks) and the callback hell problem (addressed by Promises and async/await).\"\n  },\n  {\n    \"Question\": \"Explain how you would handle asynchronous operations in Node.js. What are Promises and async/await, and how do they help?\",\n    \"Answer\": \"I handle asynchronous operations using Promises and async/await. Promises represent the eventual completion (or failure) of an asynchronous operation. Async/await provides a more readable and synchronous-like syntax for working with Promises, reducing callback nesting and improving code clarity.\"\n  },\n  {\n    \"Question\": \"What are some popular Node.js frameworks or libraries that you've used, and what are their purposes? (e.g., Express.js, NestJS)\",\n    \"Answer\": \"I've used Express.js extensively for building web applications and APIs. It provides a minimal and flexible framework with features like routing, middleware support, and templating engines.  I've also explored NestJS, which provides a more structured architecture based on TypeScript and design patterns like dependency injection, making it suitable for building scalable and maintainable server-side applications.\"\n  },\n  {\n    \"Question\": \"How do you handle errors in Node.js? Describe different error handling strategies.\",\n    \"Answer\": \"I handle errors using try-catch blocks for synchronous code and by attaching `.catch()` handlers to Promises for asynchronous code. I also use middleware in Express.js to handle errors globally, logging them and sending appropriate error responses to the client.  Proper error logging and monitoring are crucial for identifying and resolving issues in a Node.js application.\"\n  },\n  {\n    \"Question\": \"How would you approach debugging a performance issue in a React and Node.js application?\",\n    \"Answer\": \"Debugging performance issues would involve a multi-faceted approach.  On the React side, I'd use the React Profiler to identify performance bottlenecks in components.  For Node.js, I'd use profiling tools like `node --inspect` and tools like `clinic.js` to analyze CPU usage, memory leaks, and event loop delays.  I'd also use logging and monitoring tools to track request latency and identify slow queries or database operations.\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  export const chatSession = model.startChat({
    generationConfig,
  });