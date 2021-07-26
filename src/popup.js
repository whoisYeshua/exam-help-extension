'use strict'

import './popup.css'
import { updateIconStatus, statusText, statusStorage } from './lib/status.js'
;(function () {
  function setupStatus(initialValue = 'STOP') {
    console.log(statusText(initialValue))
    document.getElementById('status').innerHTML = statusText(initialValue)
    updateIconStatus(initialValue)

    document.getElementById('startBtn').addEventListener('click', () => {
      updateStatus({
        type: 'START',
      })
    })

    document.getElementById('stopBtn').addEventListener('click', () => {
      updateStatus({
        type: 'STOP',
      })
    })
  }

  function updateStatus({ type }) {
    let readableStatus = statusText(type)
    updateIconStatus(type)

    statusStorage.set(type, () => {
      document.getElementById('status').innerHTML = readableStatus

      chrome.runtime.sendMessage({ type })
    })
  }

  function restoreStatus() {
    statusStorage.get(status => {
      if (typeof status === 'undefined') {
        statusStorage.set('STOP', () => {
          setupStatus()
        })
      } else {
        setupStatus(status)
      }
    })
  }

  document.addEventListener('DOMContentLoaded', restoreStatus)
})()
