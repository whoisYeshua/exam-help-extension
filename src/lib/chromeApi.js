async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

async function getAllTabs() {
  const queryOptions = { windowId: chrome.windows.WINDOW_ID_CURRENT }
  const tabs = await chrome.tabs.query(queryOptions)
  return tabs
}

export { getCurrentTab, getAllTabs }
