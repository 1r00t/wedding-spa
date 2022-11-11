interface ImageTypeFile {
	[size: string]: string
}

interface Ratio {
	sources: ImageTypeFile
	media: string
}

interface Picture {
	url: string
	width: number
	height: number
	ratios: { [ratio: string]: Ratio }
}

export type PostType = {
	id: string
	user: {
		username: string
	}
	picture: Picture
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
