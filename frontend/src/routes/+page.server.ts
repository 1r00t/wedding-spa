import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
export const load: PageServerLoad = async ({ fetch, locals }) => {
	if (!locals.user?.isAuthenticated) {
		throw redirect(303, '/login')
	}
	const response = await fetch('/api/posts?page=1')
	if (response.ok) {
		const { posts, current, previous, next, count } = await response.json()
		return {
			posts,
			current,
			previous,
			next,
			count
		}
	}
}
