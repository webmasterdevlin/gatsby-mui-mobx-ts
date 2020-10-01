import React, { useContext, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import {
  jsonPlaceholderContext,
  JsonPlaceholderStoreSchema,
} from "../json-placeholder.context";
import { Button } from "@material-ui/core";

const Example = () => {
  /*
  Don't destructure. MobX observable are objects (and derivatives) only.
  When destructuring, any primitive variables will remain at latest values and won't be observable anymore.
  Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.

  Example: const { heroes, hero, getHeroes,isLoading } = useContext(heroContext);
  */

  const jsonPlaceholderStore = useContext<JsonPlaceholderStoreSchema>(
    jsonPlaceholderContext
  );

  useEffect(() => {
    jsonPlaceholderStore.getPostsAction().then();
  }, []);

  return useObserver(() => (
    <>
      {jsonPlaceholderStore?.posts.map(po => (
        <div key={po.id}>
          <h2>
            {po.title}
          </h2>
          <p>{po.body}</p>
          <Button
            onClick={() => jsonPlaceholderStore.getPostByIdAction(po.id).then()}
            variant={"outlined"}
            color={"secondary"}
            style={{ marginRight: "2rem" }}
          >
            Details
          </Button>
          <Button
            onClick={() =>
              jsonPlaceholderStore.temporaryRemovePostByIdAction(po.id)
            }
            variant={"text"}
            color={"default"}
          >
            Temporary Delete
          </Button>
        </div>
      ))}
    </>
  ));
};

export default Example;
