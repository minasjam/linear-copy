import React from "react";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { api } from "~/utils/api";
import { useForm } from "@mantine/form";

export const EditForm: React.FC<{
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  onClose: () => void;
}> = ({ id, title, status, onClose }) => {
  const form = useForm({
    initialValues: {
      title,
      id,
      status,
    },
  });

  const apiUtils = api.useUtils();

  const editTaskApi = api.task.edit.useMutation({
    onSuccess: () => {
      void apiUtils.task.getAll.refetch();
      onClose();
    },
  });

  const handleEditTask = () => {
    editTaskApi.mutate({
      id: form.values.id,
      title: form.values.title,
      status: form.values.status,
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleEditTask)}>
      <Stack>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <Select
          label="Status"
          data={["todo", "in-progress", "done"]}
          {...form.getInputProps("status")}
        />
        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
};
