import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";
import type { CategoryType, PaginatedPostsType, PaginationType, PostType, UserType } from "./types";

export const user: Writable<UserType> = writable({ username: '', isAuthenticated: false })
export const accessToken: Writable<string> = writable('')
export const category: Writable<CategoryType> = writable({ id: 1, name: 'Alle Kategorien' }) // das ist dumm!
export const paginatedPosts: Writable<PaginatedPostsType> = writable({
    count: 0,
    next: null,
    current: 0,
    previous: null,
    results: []
})