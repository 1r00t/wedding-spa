export type PostType = {
	id: string
	user: {
		username: string
	}
	foto: string
}

export type PaginationType = {
	count: number
	next: number | null
	current: number
	previous: number | null
}

export type PostsResponseType = PaginationType & {
	results: PostType[]
}
