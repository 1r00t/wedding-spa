import type { Handle, HandleFetch } from '@sveltejs/kit'
import { decodeJWT } from '$lib/helpers'

export const handle: Handle = async ({ event, resolve }) => {
	const refreshToken = event.cookies.get('refresh') || ''
	const accessToken = event.cookies.get('access') || ''

	if (accessToken) {
		const access = decodeJWT(accessToken)
		if (access.exp * 1000 < new Date().getTime()) {
			// access token expired. get a new one with refresh token
			console.log('access expired')
			if (refreshToken) {
				const refresh = decodeJWT(refreshToken)
				if (refresh.exp * 1000 < new Date().getTime()) {
					console.log('refresh expired')
					// refresh expired as well back to login
					event.locals.user = { username: '', isAuthenticated: false }
					return await resolve(event)
				} else {
					// get new access token
					console.log('getting new access token')
					const response = await fetch('http://localhost:8000/token/refresh/', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ refresh: refreshToken })
					})
					if (response.ok) {
						const json = await response.json()
						event.cookies.set('access', json.access)
						event.locals.user = {
							username: access.username,
							isAuthenticated: true
						}
					}
				}
			}
		} else {
			// access token is valid
			event.locals.user = {
				username: access.username,
				isAuthenticated: true
			}
		}
	} else {
		// we have no token cookies
		event.locals.user = {
			username: '',
			isAuthenticated: false
		}
	}

	return await resolve(event)
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const accessToken = event.cookies.get('access') || ''
	if (accessToken) {
		request.headers.set('Authorization', `Bearer ${accessToken}`)
		request.headers.set('Accept', 'application/json')
		request.headers.set('Content-Type', 'application/json')
	}
	return fetch(request)
}
