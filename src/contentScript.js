'use strict'

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
import { statusStorage } from './lib/status.js'

const pageTitle = document.head
  .getElementsByTagName('title')[0]
  .innerText.trim()
const pageHost = document.location.host

console.log(`**Current page**: ${pageTitle}\n**Current host**: ${pageHost}`)

const keyListener = async event => {
  if (event.code == 'KeyZ') {
    console.log('Делаем скриншот')
    chrome.runtime.sendMessage({ type: 'CAPTURE', pageTitle, pageHost })
  }
}

statusStorage.get(status => {
  if (status === 'START') {
    document.addEventListener('keydown', keyListener)
  }
})

// // Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'START') {
    document.addEventListener('keydown', keyListener)
  }

  if (request.type === 'STOP') {
    document.removeEventListener('keydown', keyListener)
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({})
  return true
})
