import { Button, Container, Stack, Title, rem } from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container size="xl" my={rem(24)}>
      {user ? (
        <Stack align="center">
          <Title>Welcome {user.name}!</Title>
          <Button component="a" variant="filled" href="/api/auth/logout">
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack align="center">
          <Title>Welcome to Linear copy, stranger!</Title>
          <Button component="a" variant="filled" href="/api/auth/login">
            Login
          </Button>
        </Stack>
      )}
    </Container>
  );
}
