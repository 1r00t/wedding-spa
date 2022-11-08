import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const token = cookies.get('access_token') as string

	return {
		user: locals.user,
		token
	}
}
