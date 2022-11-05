import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PaginatedPosts } from '$lib/types'

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

	const postsResponse = await fetch('http://localhost:8000/posts/')

	let posts = <PaginatedPosts>{}
	if (postsResponse.ok) {
		posts = await postsResponse.json()
	}

	return {
		username: locals.user.username,
		posts
	}
}
