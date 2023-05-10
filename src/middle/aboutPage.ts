import http from 'http'
import { renderArtTemplate } from '../utils'
import artTemplate from 'art-template'
/**
 * @name：aboutPage
 * @description： url /about 路由映射
 *
 */

const aboutPage = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	pageSrc: string
) => {
	const { method } = req
	console.log(method)

	if (method === 'GET') {
		// 将读取的html 写入到返回的响应
		renderArtTemplate(pageSrc, (data) => {
			const html = artTemplate.render(data.toString(), {
				name: 'Jack',
				age: 18,
				province: 'dl',
				hobbies: ['写代码', '唱歌', '打游戏'],
				title: '个人信息',
			})
			res.end(html)
		})
	}
}

export default aboutPage
