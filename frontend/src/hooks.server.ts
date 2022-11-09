import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const username = event.cookies.get('username')
	if (username) {
		event.locals.user = {
			username,
			isAuthenticated: true
		}
	} else {
		event.locals.user = {
			username: '',
			isAuthenticated: false
		}
	}

	return await resolve(event)
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const accessToken = event.cookies.get('access_token') || ''
	if (accessToken) {
		request.headers.set('Authorization', `Token ${accessToken}`)
		request.headers.set('Accept', 'application/json')
		request.headers.set('Content-Type', 'application/json')
	}
	return fetch(request)
}
