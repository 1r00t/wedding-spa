import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PostsResponseType, PostType, PaginationType } from '$lib/types'

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

	const response = await fetch('http://localhost:8000/posts/')

	let posts: PostType[] = []
	let paginatedPosts = <PostsResponseType>{}
	let pagination: PaginationType = {
		next: null,
		current: 1,
		previous: null,
		count: 0
	}
	if (response.ok) {
		paginatedPosts = await response.json()
		posts = paginatedPosts.results
		pagination = {
			next: paginatedPosts.next,
			current: paginatedPosts.current,
			previous: paginatedPosts.previous,
			count: paginatedPosts.count
		}
	}

	return {
		username: locals.user.username,
		posts,
		pagination
	}
}
