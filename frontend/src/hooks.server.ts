import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token') || ''
	if (accessToken) {
		const response = await fetch('http://localhost:8000/get_user/', {
			headers: {
				Authorization: `Token ${accessToken}`
			}
		})

		if (response.ok) {
			const json = await response.json()
			event.locals.user = {
				isAuthenticated: true,
				username: json.username
			}
		}
	} else {
		event.locals.user = {
			isAuthenticated: false,
			username: ''
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
