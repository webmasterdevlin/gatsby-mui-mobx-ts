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
        Is fetching? {jsonPlaceholderStore.loading.toString()}
      </h1>
      <h2>Total posts: {jsonPlaceholderStore.totalPosts}</h2>
      <h2 style={{color:"purple"}}>You have chosen: {jsonPlaceholderStore.post.title}</h2>
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
