import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PaginatedPostsType, CategoryType } from '$lib/types'


export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	const page = url.searchParams.get('page') || '1'
	if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

	const postsResponse = await fetch(`http://localhost:8000/posts/?page=${page}&picture_ratio=1%2F1&picture_sm=12&picture_md=12&picture_lg=4&picture_xl=4&picture_2xl=4`)

	let paginatedPosts = <PaginatedPostsType>{}

	if (postsResponse.ok) {
		paginatedPosts = await postsResponse.json()
	} else {
		throw error(404, 'Konnte keine Fotos finden!')
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
