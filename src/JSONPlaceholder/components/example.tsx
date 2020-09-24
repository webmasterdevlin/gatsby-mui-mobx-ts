import React, { useContext, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import {
  jsonPlaceholderContext,
  JsonPlaceholderStore,
} from "../json-placeholder.context";

const Example = () => {
  /* Don't destructure. MobX observable are objects (and derivates) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
   example:
   const { heroes,hero, getHeroes,  postHero, setHero,deleteHero,isLoading } = useContext(heroContext);*/

  const jsonPlaceholderStore = useContext<JsonPlaceholderStore>(
    jsonPlaceholderContext
  );

  useEffect(() => {
    jsonPlaceholderStore.getPostsAction().then();
  }, []);

  return useObserver(() => (
    <>
      <h2>Testing Mobx React Lite</h2>
      <h2>{jsonPlaceholderStore?.totalPosts}</h2>
    </>
  ));
};

export default Example;
