import "server-only";
import { mainRouter } from "@/server/routes";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";

globalThis.$client = createRouterClient(
  mainRouter
)