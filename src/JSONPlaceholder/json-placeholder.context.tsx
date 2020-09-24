import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { getPostsAxios } from "./json-placeholder.service";
import { JsonPlaceholderType } from "./json-placeholder.type";

export type JsonPlaceholderStore = {
  posts: JsonPlaceholderType[];
  post: JsonPlaceholderType;
  loading: boolean;
  error: string;

  getPostsAction: () => Promise<void>;
  totalPosts: any;
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

    /*actions*/
    async getPostsAction() {
      store.loading = true;
      store.error = "";
      try {
        const { data } = await getPostsAxios();
        store.posts = data;
      } catch (e) {
        store.error = e.message;
      } finally {
        store.loading = false;
      }
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

export const jsonPlaceholderContext = createContext<JsonPlaceholderStore>(null);
