import { config } from '../../config.js'

const myHeaders = new Headers()
myHeaders.append('Authorization', `Client-ID ${config.imgurClientId}`)

const createImgurUploadRequest = async img => {
  const formdata = new FormData()
  formdata.append('image', img.slice(23))

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  }

  try {
    const response = await fetch(
      'https://api.imgur.com/3/image',
      requestOptions
    )
    if (response.ok) {
      const { data } = await response.json()
      return data.link
    }
  } catch (error) {
    console.error(error)
  }
}

export { createImgurUploadRequest }
