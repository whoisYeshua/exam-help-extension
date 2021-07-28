'use strict'

import { createDiscordRequest, createEmbed, discord } from './lib/discord.js'
import { createImgurUploadRequest } from './lib/imgur.js'
import { updateIconStatus, statusStorage } from './lib/status.js'
import { getAllTabs } from './lib/chromeApi.js'

statusStorage.get(status => {
  if (typeof status === 'undefined' || status === 'STOP') {
    updateIconStatus('STOP')
  } else {
    updateIconStatus('START')
  }
})

chrome.runtime.onMessage.addListener(async request => {
  if (request.type === 'START') {
    const tabs = await getAllTabs()

    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type: 'START' })
    }

    const webhook = discord.getWebhookBody()
    webhook.embeds.push(
      createEmbed({ title: 'Extension connected', color: discord.startColor })
    )
    const webhookJson = JSON.stringify(webhook)
    createDiscordRequest(webhookJson)
  } else if (request.type === 'STOP') {
    const tabs = await getAllTabs()

    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type: 'STOP' })
    }

    const webhook = discord.getWebhookBody()
    webhook.embeds.push(
      createEmbed({ title: 'Extension disconnected', color: discord.stopColor })
    )
    const webhookJson = JSON.stringify(webhook)
    createDiscordRequest(webhookJson)
  } else if (request.type === 'CAPTURE') {
    try {
      const img = await chrome.tabs.captureVisibleTab()
      const imgLink = await createImgurUploadRequest(img)

      const webhook = discord.getWebhookBody()
      webhook.embeds.push(
        createEmbed({
          title: 'Screenshot Capture',
          color: discord.startColor,
          description: `**Page Title**: ${request.pageTitle}\n**Host URL**: ${request.pageHost}`,
          imageUrl: imgLink,
        })
      )
      const webhookJson = JSON.stringify(webhook)
      createDiscordRequest(webhookJson)
    } catch (error) {
      console.log(error)
    }
  }
})
