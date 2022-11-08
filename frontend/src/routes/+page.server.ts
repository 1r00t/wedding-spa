import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PaginatedPostsType, PostType, PaginationType, CategoryType } from '$lib/types'

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

	const postsResponse = await fetch('http://localhost:8000/posts/')

	let posts: PostType[] = []
	let paginatedPosts = <PaginatedPostsType>{}
	let pagination: PaginationType = {
		next: null,
		current: 1,
		previous: null,
		count: 0
	}
	if (postsResponse.ok) {
		paginatedPosts = await postsResponse.json()
		posts = paginatedPosts.results
		pagination = {
			next: paginatedPosts.next,
			current: paginatedPosts.current,
			previous: paginatedPosts.previous,
			count: paginatedPosts.count
		}
	}

	const categoryResponse = await fetch('http://localhost:8000/posts/categories/')

	let categories: CategoryType[] = []
	if (categoryResponse.ok) {
		categories = await categoryResponse.json()
	}

	return {
		posts,
		pagination,
		categories
	}
}
