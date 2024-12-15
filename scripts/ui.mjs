import { tabs, selectedTab, addTab, getFavicon } from './tabs.mjs'
const { span, iframe, button, img } = van.tags;
const { tags: { "ion-icon": ionIcon } } = van;

// Controls
const pageBack = document.getElementById('page-back');
const pageForward = document.getElementById('page-forward');
const pageRefresh = document.getElementById('page-refresh');

// URL Bar
const urlForm = document.getElementById('url-form');
const urlInput = document.getElementById('url-input');

// New Tab Button
const newTabButton = document.getElementById('new-tab');

// Tab List
const tabList = document.getElementById('tab-list');

// Tab View
const tabView = document.getElementById('tab-view');

// Event Listeners
pageBack.onclick = () => {
    selectedTab.view.contentWindow.history.back()
}

pageForward.onclick = () => {
    selectedTab.view.contentWindow.history.forward()
}

pageRefresh.onclick = () => {
    selectedTab.view.contentWindow.location.reload()

}

newTabButton.onclick = () => {
    addTab('google.com')
}


urlForm.onsubmit = async (e) => {
    e.preventDefault()
    selectedTab.view.src = await getUV(urlInput.value)
}

// Objects

addTab('google.com', tabItem, tabFrame, tabList, tabView)