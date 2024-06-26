import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { api } from "~/utils/api";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { useUser } from "@auth0/nextjs-auth0/client";
// locals
import { EditForm } from "~/components/EditForm";

const SPAN = {
  id: 1,
  status: 2,
  title: 7,
  actions: 2,
};

const HEADERS = [
  { span: SPAN.id, title: "ID" },
  { span: SPAN.status, title: "Status" },
  { span: SPAN.title, title: "Title" },
  { span: SPAN.actions, title: "Actions" },
];

export default function Index() {
  const { user, error, isLoading } = useUser();

  const form = useForm({
    initialValues: {
      task: "",
      // TODO: some sort of an enum here would be good
      status: "todo" as "todo" | "in-progress" | "done",
    },
  });

  const apiUtils = api.useUtils();
  const getAllTaskApi = api.task.getAll.useQuery();
  const addTaskApi = api.task.add.useMutation({
    onSuccess: () => {
      void apiUtils.task.getAll.refetch();
    },
  });
  const deleteTaskApi = api.task.delete.useMutation({
    onSuccess: () => {
      void apiUtils.task.getAll.refetch();
    },
  });

  const handleAddTask = () => {
    if (!form.values.task) return;
    addTaskApi.mutate({ title: form.values.task, status: form.values.status });
    form.reset();
  };

  if (isLoading || getAllTaskApi.isLoading) return <div>Loading...</div>;
  if (error || getAllTaskApi.error) return <div>Error</div>;

  if (!user)
    return (
      <Container size="xl" my={rem(24)}>
        <Stack align="center">
          <Title>Welcome to Linear copy, stranger!</Title>
          <Button component="a" variant="filled" href="/api/auth/login">
            Log in
          </Button>
        </Stack>
      </Container>
    );

  return (
    <Container size="xl" my={rem(24)}>
      <Stack align="center">
        <Title order={1}>Welcome {user.name ?? "Dear User"}!</Title>
        <Button component="a" variant="filled" href="/api/auth/logout">
          Log out
        </Button>
        <Stack gap={rem(24)} w="100%">
          <Title order={2}>Tasks</Title>
          <form onSubmit={form.onSubmit(handleAddTask)}>
            <Group align="flex-end">
              <TextInput
                style={{ flexGrow: 1 }}
                size="md"
                label="New task"
                required
                {...form.getInputProps("task")}
                data-test-id="task-input"
              />
              <Select
                style={{ flexGrow: 1 }}
                size="md"
                label="Status"
                required
                data={["todo", "in-progress", "done"]}
                {...form.getInputProps("status")}
              />
              <Button size="md" type="submit">
                Add
              </Button>
            </Group>
          </form>
          {getAllTaskApi?.data && getAllTaskApi.data.length > 0 && (
            <Grid mt={rem(16)} align="center">
              {HEADERS.map((header, index) => (
                <Grid.Col span={header.span} key={`header-${index}`}>
                  <Text fw={900}>{header.title}</Text>
                </Grid.Col>
              ))}
              {getAllTaskApi.data.map((task, index) => (
                <React.Fragment key={task.id}>
                  <Grid.Col span={SPAN.id}>
                    <Text>{task.id}</Text>
                  </Grid.Col>
                  <Grid.Col span={SPAN.status}>
                    <Text>{task.status}</Text>
                  </Grid.Col>
                  <Grid.Col span={SPAN.title}>
                    <Text>{task.title}</Text>
                  </Grid.Col>
                  <Grid.Col span={SPAN.actions}>
                    <Group>
                      <Button
                        size="sm"
                        color="yellow"
                        onClick={() =>
                          modals.open({
                            title: "Edit the task?",
                            centered: true,
                            children: (
                              <EditForm
                                id={task.id}
                                title={task.title}
                                status={task.status}
                                onClose={() => modals.closeAll()}
                              />
                            ),
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => {
                          deleteTaskApi.mutate(task.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Grid.Col>
                  {index + 1 !== getAllTaskApi.data.length && (
                    <Grid.Col span={12}>
                      <Divider />
                    </Grid.Col>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
