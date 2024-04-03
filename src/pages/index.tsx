import React from "react";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { api } from "~/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Index() {
  const { user, error, isLoading } = useUser();
  const taskApi = api.task.getAll.useQuery();

  if (isLoading || taskApi.isLoading) return <div>Loading...</div>;
  if (error || taskApi.error) return <div>Error</div>;

  if (!user)
    return (
      <Container size="xl" my={rem(24)}>
        <Stack align="center">
          <Title>Welcome to Linear copy, stranger!</Title>
          <Button component="a" variant="filled" href="/api/auth/login">
            Login
          </Button>
        </Stack>
      </Container>
    );

  return (
    <Container size="xl" my={rem(24)}>
      <Stack align="center">
        <Title order={1}>Welcome {user.name ?? "Dear User"}!</Title>
        <Button component="a" variant="filled" href="/api/auth/logout">
          Logout
        </Button>
        <Title order={2} mb={rem(24)}>
          Tasks
        </Title>
        {taskApi?.data && taskApi.data.length > 0 && (
          <Grid>
            {taskApi.data.map((task, index) => (
              <React.Fragment key={task.id}>
                <Grid.Col span={1}>
                  <Checkbox />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text>{task.status}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text>{task.id}</Text>
                </Grid.Col>
                <Grid.Col span={7}>
                  <Text>{task.title}</Text>
                </Grid.Col>
                {index + 1 !== taskApi.data.length && (
                  <Grid.Col span={12}>
                    <Divider />
                  </Grid.Col>
                )}
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
