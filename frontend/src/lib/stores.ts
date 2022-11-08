import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";
import type { CategoryType, PaginatedPostsType, PaginationType, PostType } from "./types";

export const accessToken: Writable<string> = writable('')

export const posts: Writable<PostType[]> = writable([])
export const pagination: Writable<PaginationType> = writable()
export const category: Writable<CategoryType> = writable({ id: 1, name: 'Alle Kategorien' }) // das ist dumm!

export const filteredPosts = derived([category, posts], ([$category, $posts]) => {
    return $posts?.filter(post => post.category.id === $category.id || $category.id === 1)
})


export const paginatedPosts: Writable<PaginatedPostsType> = writable({
    count: 0,
    next: null,
    current: 0,
    previous: null,
    results: []
})