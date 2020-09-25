import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { getPostsAxios } from "./json-placeholder.service";
import { JsonPlaceholderType } from "./json-placeholder.type";

export type JsonPlaceholderStoreSchema = {
  readonly posts: JsonPlaceholderType[];
  readonly post: JsonPlaceholderType;
  readonly loading: boolean;
  readonly error: string;

  readonly getPostsAction: () => Promise<void>;
  readonly removePostsAction: () => void;
  readonly totalPosts: any;
};

export const JsonPlaceholderProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    /*observables*/
    posts: [],
    post: {
      userId: 0,
      id: 0,
      title: "",
      body: "",
    },
    loading: false,
    error: "",

    /*asynchronous actions*/
    async getPostsAction() {
      store.loading = true;
      store.error = "";
      try {
        const { data } = await getPostsAxios();
        store.posts = data;
      } catch (e) {
        store.setError(e);
      } finally {
        store.loading = false;
      }
    },

    /*plain actions*/

    removePostsAction() {
      store.posts = [];
      store.loading = false;
    },

    setError({ message }) {
      store.error = message;
      alert(message);
    },

    /*computed values also known as derived state*/

    get totalPosts() {
      return store.posts.length;
    },
  }));

  return (
    <jsonPlaceholderContext.Provider value={store}>
      {children}
    </jsonPlaceholderContext.Provider>
  );
};
export const jsonPlaceholderContext = createContext<JsonPlaceholderStoreSchema>(
  null
);
