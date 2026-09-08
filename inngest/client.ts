// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "AI-Code-Reviewer", isDev: process.env.NODE_ENV === "development",
  });