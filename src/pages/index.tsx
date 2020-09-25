import React, { useContext } from "react";
import Example from "../JSONPlaceholder/components/example";
import { Box, Button, Container } from "@material-ui/core";
import { useObserver } from "mobx-react-lite";
import {
  jsonPlaceholderContext,
  JsonPlaceholderStoreSchema,
} from "../JSONPlaceholder/json-placeholder.context";

export default function Home() {
  const jsonPlaceholderStore = useContext<JsonPlaceholderStoreSchema>(
    jsonPlaceholderContext
  );

  return useObserver(() => (
    <Container>
      <h1>
        Hello world! Is loading? {jsonPlaceholderStore.loading.toString()}
      </h1>

      <Button
        onClick={() => jsonPlaceholderStore.getPostsAction()}
        variant={"contained"}
        color={"primary"}
      >
        Re-fetch
      </Button>

      <Example />
    </Container>
  ));
}
