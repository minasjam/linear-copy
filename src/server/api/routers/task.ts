import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const TASK_NOT_FOUND = "Task not found";

const MOCK_DATA: {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}[] = [
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

let counter = 4;

export const taskRouter = createTRPCRouter({
  // TODO: these need to be authenticated procedures
  getAll: publicProcedure.query(() => {
    return MOCK_DATA;
  }),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        status: z.enum(["todo", "in-progress", "done"]),
      })
    )
    .mutation(({ input: { title, status } }) => {
      const newTask: {
        id: string;
        title: string;
        status: "todo" | "in-progress" | "done";
      } = {
        id: `${counter}`,
        title: title,
        status: status,
      };
      counter++;
      MOCK_DATA.push(newTask);
      return newTask;
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        status: z.enum(["todo", "in-progress", "done"]),
      })
    )
    .mutation(({ input: { id, title, status } }) => {
      const editedTask = MOCK_DATA.find((task) => task.id === id);

      if (editedTask === undefined) throw new Error(TASK_NOT_FOUND);

      editedTask.title = title;
      editedTask.status = status;

      return editedTask;
    }),

  delete: publicProcedure.input(z.string()).mutation(({ input: id }) => {
    const index = MOCK_DATA.findIndex((task) => (task.id = id));
    if (index === -1) throw new Error(TASK_NOT_FOUND);
    const [deletedTask] = MOCK_DATA.splice(index, 1);
    return deletedTask;
  }),
});
