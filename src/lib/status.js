import { statusAssociations } from '../variables/statusAssociations.js'

const updateIconStatus = status => {
  chrome.action.setIcon({
    path: statusAssociations[status].logoPath,
  })
}

const statusText = status => statusAssociations[status].text

const statusStorage = {
  get: callback => {
    chrome.storage.sync.get(['status'], result => {
      callback(result.status)
    })
  },
  set: (value, callback) => {
    chrome.storage.sync.set(
      {
        status: value,
      },
      () => {
        callback()
      }
    )
  },
}

export { updateIconStatus, statusText, statusStorage }
