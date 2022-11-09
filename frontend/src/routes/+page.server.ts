import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PaginatedPostsType, CategoryType } from '$lib/types'

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

	const postsResponse = await fetch('http://localhost:8000/posts/')

	let paginatedPosts = <PaginatedPostsType>{}

	if (postsResponse.ok) {
		paginatedPosts = await postsResponse.json()
	}

	const categoriesResponse = await fetch('http://localhost:8000/posts/categories/')

	let categories: CategoryType[] = []
	if (categoriesResponse.ok) {
		categories = await categoriesResponse.json()
	}

	return {
		paginatedPosts,
		categories
	}
}
