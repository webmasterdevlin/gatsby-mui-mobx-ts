import React, { createContext } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { getPostByIdAxios, getPostsAxios } from "./json-placeholder.service";
import { JsonPlaceholderType } from "./json-placeholder.type";

export type JsonPlaceholderStoreSchema = {
  /*state*/
  readonly posts: JsonPlaceholderType[];
  readonly post: JsonPlaceholderType;
  readonly loading: boolean;
  readonly error: string;

  /*non-async actions*/
  readonly removePostsAction: () => void;
  readonly temporaryRemovePostByIdAction: (id: number) => void;

  /*computed or derived values*/
  readonly totalPosts: number;

  /*asynchronous actions*/
  readonly getPostsAction: () => Promise<void>;
  readonly getPostByIdAction: (id: number) => Promise<void>;
};

export const JsonPlaceholderProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    /*observable states*/
    posts: [] as JsonPlaceholderType[],
    post: {} as JsonPlaceholderType,
    loading: false,
    error: "",

    /*non-async actions*/
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
