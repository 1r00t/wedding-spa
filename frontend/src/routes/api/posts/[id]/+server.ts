import type { RequestHandler } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ fetch, params }) => {
	const postId = params.id

	const requestUrl = `${BACKEND_URL}/posts/${postId}/?picture_ratio=4%2F3&picture_sm=10&picture_md=10&picture_lg=10&picture_xl=10&picture_2xl=10`

	const response = await fetch(requestUrl)

	if (response.ok) {
		return new Response(
			JSON.stringify({
				post: await response.json()
			})
		)
	}

	throw error(response.status, 'Konnte keine Bilder laden!')
}
