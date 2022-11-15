import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { PostType } from './types'

export const posts: Writable<PostType[]> = writable([])
export const current: Writable<number> = writable(0)
export const previous: Writable<number | null> = writable(null)
export const next: Writable<number | null> = writable(null)
export const count: Writable<number> = writable(0)
export const categoryId: Writable<number> = writable(1)
