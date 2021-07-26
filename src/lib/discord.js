import { config } from '../../config.js'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

const createDiscordRequest = async body => {
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body,
    redirect: 'follow',
  }

  try {
    const response = await fetch(config.discordWebhookUrl, requestOptions)
    if (response.ok) {
      console.log('Success request')
    }
  } catch (error) {
    console.error(error)
  }
}

const createEmbed = ({ title, color = null, description, imageUrl }) => {
  const embed = {
    title,
    color,
    footer: {
      text: `Exam Helper v ${chrome.runtime.getManifest().version}`,
    },
    timestamp: new Date().toISOString(),
  }

  if (description) embed.description = description
  if (imageUrl) embed.image = { url: imageUrl }

  return embed
}

const discord = {
  startColor: 5763719,
  stopColor: 15548997,
  webhook: {
    content: null,
    embeds: [],
  },
  getWebhookBody: () => {
    return JSON.parse(JSON.stringify(discord.webhook))
  },
}

export { createDiscordRequest, createEmbed, discord }
