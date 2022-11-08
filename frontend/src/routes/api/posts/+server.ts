import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, fetch }) => {
	const page = url.searchParams.get('page' ?? '1')

	const response = await fetch(`http://localhost:8000/posts/?page=${page}`)

	if (response.ok) return new Response(JSON.stringify(await response.json()))

	return new Response(JSON.stringify({ url }))
}
