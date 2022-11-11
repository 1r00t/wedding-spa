import type { RequestHandler } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import type { PaginatedPostsType } from '$lib/types'

export const GET: RequestHandler = async ({ url, fetch }) => {
	const page = url.searchParams.get('page' ?? '1')
	const categoryId = url.searchParams.get('category' ?? '1')

	let requestUrl = ''

	if (Number(categoryId) > 1) {
		requestUrl = `${BACKEND_URL}/posts/categories/${categoryId}/?page=${page}&picture_ratio=1%2F1&picture_sm=10&picture_md=10&picture_lg=4&picture_xl=4&picture_2xl=4`
	} else {
		requestUrl = `${BACKEND_URL}/posts/?page=${page}&picture_ratio=1%2F1&picture_sm=10&picture_md=10&picture_lg=4&picture_xl=4&picture_2xl=4`
	}
	const response = await fetch(requestUrl)

	if (response.ok) {
		const paginatedPosts: PaginatedPostsType = await response.json()

		const next = paginatedPosts.next
		const previous = paginatedPosts.previous
		const posts = paginatedPosts.results
		const current = paginatedPosts.current
		const count = paginatedPosts.count

		return new Response(
			JSON.stringify({
				next,
				previous,
				posts,
				current,
				count
			})
		)
	}

	throw error(response.status, 'Konnte keine Bilder laden!')
}
