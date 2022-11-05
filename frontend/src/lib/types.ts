type Post = {
	id: string
	user: {
		username: string
	}
	foto: string
}

export type PaginatedPosts = {
	count: number
	next: number
	previous: number
	results: Post[]
}
