import http from 'http'
import router from './router'

import { STATIC } from './setting'
import { renderStatic } from './utils'

const server = http.createServer((req, res) => {
	try {
		const { url } = req
		if (url && Reflect.has(router, url)) {
			// 路由符合页面的存在
			const { serverRequest, page } = Reflect.get(router, url)
			serverRequest(req, res, page)
		} else if (url && url.indexOf(`/${STATIC}/`) === 0) {
			// 静态文件
			renderStatic(url).pipe(res)
		} else {
			// 路由不存在的话 跳转错误页面
			const { serverRequest, page } = router['error']
			serverRequest(req, res, page)
		}
	} catch {
		const { serverRequest, page } = router['error']
		serverRequest(req, res, page)
	}
})

server.listen('8080', () => {
	console.log('启动服务')
})
