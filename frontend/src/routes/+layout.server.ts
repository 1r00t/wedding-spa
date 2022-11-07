import type { LayoutServerLoad } from './$types'

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const accessToken = cookies.get('access_token') as string

	return {
		user: locals.user,
		accessToken
	}
}
