import { CreateEventInputSchema, GetAllEventsInput, GetEventBySlugInput, GetSimilarEventsBySlugInput } from "../schemas/event/event.input.schema";
import { CreateEventOutput, GetAllEventsOutput, GetEventBySlugOutput, GetSimilarEventsBySlugOutput } from "../schemas/event/event.output.schema";
import { baseOc } from "./base";

export const createEventContract = baseOc.input(CreateEventInputSchema).output(CreateEventOutput).route({
    method: "POST",
    path: "/events"
});

export const getAllEventsContract = baseOc.input(GetAllEventsInput).output(GetAllEventsOutput).route({
    path:"/events",
    method: "GET"
});

export const getEventBySlugContract = baseOc.input(GetEventBySlugInput).output(GetEventBySlugOutput).route({
    path: "/events/{slug}",
    method: "GET"
});

export const getSimilarEventsBySlugContract = baseOc.input(GetSimilarEventsBySlugInput).output(GetSimilarEventsBySlugOutput).route({
    path: "/events/{slug}/similar",
    method: "GET"
});