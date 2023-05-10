import http from 'http'
import fs from 'fs'

/**
 * @name：uploadPage
 * @description： url /uploadPage 路由映射
 *
 */

const uploadFile = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	pageSrc: string
) => {
	const { method } = req
	console.log(method)

	if (method === 'POST') {
		// 读取图片
		req.setEncoding('binary') // 二进制将数据读取出来
		const boundary = req.headers['content-type']
			?.split('; ')[1]
			.replace('boundary=', '')

		let formData = ''

		// 获取请求 体中的数据
		req.on('data', (chunk) => {
			formData += chunk
		})

		// 处理formdata 格式数据
		req.on('end', () => {
			// 1.截图从image/jpeg位置开始后面所有的数据
			const imgType = 'image/jpeg'
			const imageTypePosition = formData.indexOf(imgType) + imgType.length
			let imageData = formData.substring(imageTypePosition)
			console.log(123)

			// 2.imageData开始位置会有两个空格
			imageData = imageData.replace(/^\s\s*/, '')

			// 3.替换最后的boundary
			imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))

			// 4.将imageData的数据存储到文件中
			fs.writeFile('./bar.png', imageData, 'binary', () => {
				console.log('文件存储成功')
				res.end('文件上传成功~')
			})
		})
	}
}

export default uploadFile
