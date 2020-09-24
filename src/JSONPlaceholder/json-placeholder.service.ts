import { api } from "../utils/axios.config";
import { JsonPlaceholderType } from "./json-placeholder.type";

export async function getPostsAxios() {
  return await api.get<JsonPlaceholderType[]>("posts");
}
