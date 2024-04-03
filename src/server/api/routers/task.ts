import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const MOCK_DATA = [
  {
    id: "1",
    title: "Task 1",
    status: "todo",
  },
  {
    id: "2",
    title: "Task 2",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Task 3",
    status: "done",
  },
];

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return MOCK_DATA;
  }),
});
