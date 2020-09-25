import React, { useContext, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import {
  jsonPlaceholderContext,
  JsonPlaceholderStoreSchema,
} from "../json-placeholder.context";

const Example = () => {
  /*
  Don't destructure. MobX observable are objects (and derivatives) only.
  When destructuring, any primitive variables will remain at latest values and won't be observable anymore.
  Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.

  example: const { heroes, hero, getHeroes,isLoading } = useContext(heroContext);
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
            {po.title} - By: author with an ID of {po.userId}
          </h2>
          <p>{po.body}</p>
        </div>
      ))}
    </>
  ));
};

export default Example;
