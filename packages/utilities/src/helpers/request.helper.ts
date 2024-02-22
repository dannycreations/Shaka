import got, { CancelableRequest, Options, Response } from 'got'

export * from 'got'
export const request = got

export async function requestTimeout<T>(options: Options & LongRunningRequestOptions) {
	const { initialTimeout = 10 * 1000, transmissionTimeout = 30 * 1000, totalTimeout = 60 * 1000 } = options

	const instance = got(options) as CancelableRequest<Response<T>>

	const cancel = () => instance.cancel()
	const _totalTimeout = setTimeout(cancel, totalTimeout)
	let _initialTimeout = setTimeout(cancel, initialTimeout)

	instance.on('downloadProgress', () => {
		clearTimeout(_initialTimeout)
		_initialTimeout = setTimeout(cancel, transmissionTimeout)
	})

	try {
		return await instance
	} finally {
		clearTimeout(_totalTimeout)
		clearTimeout(_initialTimeout)
	}
}

interface LongRunningRequestOptions {
	initialTimeout?: number
	transmissionTimeout?: number
	totalTimeout?: number
}
