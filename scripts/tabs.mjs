import { getFavicon } from './utils.mjs';
import { setTransport, setWisp, getProxied, makeURL } from '/lethal-js/lethal.mjs'

const { span, iframe, button, img } = van.tags;
const { tags: { "ion-icon": ionIcon } } = van;

var tabs = [];
var selectedTab = null;

// Side bar
const sideBar = document.querySelector('header');

const closeSideBar = document.getElementById('close-sidebar');
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
window.onmousemove = (e) => {
    if (e.clientX < 50) {
        sideBar.classList.add('hovered')
    }
    else {
        sideBar.classList.remove('hovered')
    }
}

closeSideBar.onclick = () => {
    sideBar.classList.toggle('closed')
    tabView.classList.toggle('full-width')
}
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
const tabItem = (tab) => {
    return button(
        {
            onclick: (e) => {
                if (!e.target.classList.contains('close') && !e.target.classList.contains('close-icon')) {

                    focusTab(tab)
                }
            }, class: 'tab-item hover-focus1'
        },
        img({ src: getFavicon(tab.url) }),
        span(tab.title),

        button(
            {
                onclick: () => {
                    tabs.splice(tabs.indexOf(tab), 1)

                    if (tab == selectedTab) {
                        selectedTab = null
                        if (tabs.length) focusTab(tabs[tabs.length - 1])
                        else setTimeout(() => { addTab('google.com') }, 100)
                    }

                    tabView.removeChild(tab.view)
                    tab.view.remove()

                    localStorage.setItem('tabs', JSON.stringify(tabs.map(tab => { return tab.url })))

                    tab.item.style.animation = 'slide-out-from-bottom 0.1s cubic-bezier(0.12, 0.64, 1, 1)'
                    setTimeout(() => {
                        tabList.removeChild(tab.item)
                        tab.item.remove()
                    }, 75)
                }, class: 'close'
            },
            ionIcon({ name: 'close', class: 'close-icon' })
        ))
}

const tabFrame = (tab) => {
    return iframe({
        class: 'tab-frame',
        src: tab.proxiedUrl,
        sandbox: 'allow-scripts allow-forms allow-same-origin',
        onload: (e) => {
            let parts = e.target.contentWindow.location.pathname.slice(1).split('/')
            let targetUrl = decodeURIComponent(__uv$config.decodeUrl(parts[parts.length - 1]))

            tab.title = tab.view.contentWindow.document.title
            console.log(tab.title)
            tab.url = targetUrl
            tabList.children[tabs.indexOf(tab)].children[1].textContent = tab.title
            tabList.children[tabs.indexOf(tab)].children[0].src = getFavicon(targetUrl)

            // Update URL bar
            if (tab == selectedTab) {
                urlInput.value = targetUrl
            }

            localStorage.setItem('tabs', JSON.stringify(tabs.map(tab => { return tab.url })))
        }
    })
}

function focusTab(tab) {
    if (selectedTab) {
        selectedTab.view.style.display = 'none'
        tabList.children[tabs.indexOf(selectedTab)].classList.remove('selectedTab')
    }
    selectedTab = tab
    tab.view.style.display = 'block'

    // Update URL bar
    urlInput.value = tab.url

    tabList.children[tabs.indexOf(tab)].classList.add('selectedTab')
}

async function addTab(link) {
    let url;

    await setTransport('epoxy')
    await setWisp('wss://wisp.mercurywork.shop/wisp/')
    // url = await getUV(link)
    console.log(makeURL(link))
    url = await getProxied(makeURL(link))

    let tab = {} // We aren't populating this because it needs to be passed into the tabFrame and tabItem functions

    tab.title = 'Loading...'
    // tab.url = search(link)
    tab.url = makeURL(link)
    tab.proxiedUrl = url
    tab.icon = null
    tab.view = tabFrame(tab)
    tab.item = tabItem(tab)

    // Fix links such as the Gmail link in the Google search page
    tab.view.addEventListener('load', () => {
        let links = tab.view.contentWindow.document.querySelectorAll('a')
        links.forEach(element => {
            element.addEventListener("click", event => {
                let isTargetTop = event.target.target === "_top";
                if (isTargetTop) {
                    event.preventDefault();
                    addTab(event.target.href);
                }
            });
        })
    })

    tabs.push(tab)

    tabList.appendChild(
        tab.item
    )

    tabView.appendChild(tab.view)
    focusTab(tab)
}

let savedTabs = JSON.parse(localStorage.getItem('tabs'))
if (savedTabs) {
    savedTabs.forEach((tab, index) => {
        setTimeout(() => {
            addTab(tab)
        }, index * 2000)
    })
}
else {
    addTab('google.com')
}