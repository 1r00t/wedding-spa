import type { RequestHandler } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ fetch, params }) => {
	const fileName = params.fileName
	const requestUrl = `${BACKEND_URL}/media/pictures/${fileName}`
	const response = await fetch(requestUrl)

	if (response.ok) {
		return new Response(response.body)
	}

	throw error(response.status, 'Bild nicht gefunden!')
}
