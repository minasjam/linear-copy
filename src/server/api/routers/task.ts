import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

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
  // TODO: these need to be authenticated procedures
  getAll: publicProcedure.query(() => {
    return MOCK_DATA;
  }),

  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input: { title } }) => {
      const newTask = {
        id: String(MOCK_DATA.length + 1),
        title: title,
        status: "todo",
      };
      MOCK_DATA.push(newTask);
      return newTask;
    }),
});
