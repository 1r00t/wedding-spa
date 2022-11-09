export type PostType = {
	id: string
	user: {
		username: string
	}
	foto: string
	category: CategoryType
}

export type PaginationType = {
	count: number
	next: number | null
	current: number
	previous: number | null
}

export type PaginatedPostsType = PaginationType & {
	results: PostType[]
}

export type CategoryType = {
	id: number
	name: string
}

export type UserType = {
	username: string
	isAuthenticated: boolean
}

export type TokenType = {
	token_type: 'access' | 'refresh'
	exp: number
	iat: number
	jti: string
	user_id: number
	username: string
}
