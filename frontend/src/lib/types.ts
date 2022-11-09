export type PictureSourcesType = {
	'100': string
	'200': string
	'300': string
	'400': string
	'500': string
	'600': string
	'700': string
	'800': string
	'900': string
	'1000': string
	'1100': string
	'1200': string
}

export type PictureType = {
	url: string
	width: number
	height: number
	ratios: {
		null: {
			sources: {
				'image/webp': PictureSourcesType
			}
		}
		'1/1': {
			sources: {
				'image/webp': PictureSourcesType
			}
		}
	}
}

export type PostType = {
	id: string
	user: {
		username: string
	}
	picture: PictureType
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
