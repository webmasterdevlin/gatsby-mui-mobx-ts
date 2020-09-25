import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { getPostByIdAxios, getPostsAxios } from "./json-placeholder.service";
import { JsonPlaceholderType } from "./json-placeholder.type";

export type JsonPlaceholderStoreSchema = {
  readonly posts: JsonPlaceholderType[];
  readonly post: JsonPlaceholderType;
  readonly loading: boolean;
  readonly error: string;

  readonly getPostsAction: () => Promise<void>;
  readonly getPostByIdAction: (id: number) => Promise<void>;
  readonly removePostsAction: () => void;
  readonly temporaryRemovePostByIdAction: (id: number) => void;
  readonly totalPosts: number;
};

export const JsonPlaceholderProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    /*observables*/

    posts: [] as JsonPlaceholderType[],
    post: {} as JsonPlaceholderType,
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

    async getPostByIdAction(id: number) {
      store.loading = true;
      store.error = "";
      try {
        const { data } = await getPostByIdAxios(id);
        store.post = data;
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

    // temporary because this function does not send request to the backend
    temporaryRemovePostByIdAction(id: number) {
      store.posts = store.posts.filter(p => p.id !== id);
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
