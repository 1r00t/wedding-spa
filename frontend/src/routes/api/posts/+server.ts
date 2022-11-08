import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, fetch }) => {
	// TODO: wenn ?category= angegeben wird, dann muss der request an /posts/categories/<id>/ gehen
	const page = url.searchParams.get('page' ?? '1')
	const categoryId = url.searchParams.get('category' ?? '1')

	const response = await fetch(`http://localhost:8000/posts/categories/${categoryId}/?page=${page}`)

	if (response.ok) return new Response(JSON.stringify(await response.json()))

	return new Response(JSON.stringify({ url }))
}
