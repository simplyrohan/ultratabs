import { saveTabs, loadTabs } from './save.mjs'
import { getUV, search } from './proxy.mjs'

const { span, iframe, button, img } = van.tags;
const { tags: { "ion-icon": ionIcon } } = van;

export var tabs = [];
export var selectedTab = null;

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

// -------------------------------------
// Objects
function tabItem(tab) {
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
                        else addTab('google.com')
                    }

                    tabView.removeChild(tab.view)
                    tab.view.remove()

                    tab.item.style.animation = 'slide-out-from-bottom 0.1s cubic-bezier(0.12, 0.64, 1, 1)'
                    setTimeout(() => {
                        tabList.removeChild(tab.item)
                        tab.item.remove()
                    }, 75)

                    saveTabs(tabs)
                }, class: 'close'
            },
            ionIcon({ name: 'close', class: 'close-icon' })
        ))
}

function tabFrame(tab) {
    return iframe({
        class: 'tab-frame',
        src: tab.proxiedUrl,
        // sandbox: 'allow-scripts allow-forms allow-same-origin',
        onload: (e) => {
            let parts = e.target.contentWindow.location.pathname.slice(1).split('/')
            // let targetUrl = decodeURIComponent(__uv$config.decodeUrl(parts[parts.length - 1]))
            let targetUrl = decodeURIComponent($scramjet.codec.decode(parts[parts.length - 1]))

            tab.title = tab.view.contentWindow.document.title
            console.log(tab.title)
            tab.item.children[1].textContent = tab.title
            tab.item.children[0].src = getFavicon(targetUrl)

            // Update URL bar
            if (tab == selectedTab) {
                urlInput.value = targetUrl
            }
        }

    })
}

// -------------------------------------

function focusTab(tab) {
    if (selectedTab) {
        selectedTab.view.style.display = 'none'
        selectedTab.item.classList.remove('selectedTab')
    }
    selectedTab = tab
    tab.view.style.display = 'block'

    // Update URL bar
    urlInput.value = tab.url
    tab.item.classList.add('selectedTab')
}

export function getFavicon(url) {
    return 'https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=' + encodeURIComponent(url)
}

export async function addTab(link) {
    let url;

    url = await getUV(link)

    let tab = {} // We aren't populating this because it needs to be passed into the tabFrame and tabItem functions

    tab.title = 'Loading...'
    tab.url = search(link)
    tab.proxiedUrl = url
    tab.icon = null
    tab.view = tabFrame(tab)
    tab.item = tabItem(tab)

    // Fix links such as the Gmail link in the Google search page
    // tab.view.addEventListener('load', () => {
    //     let links = tab.view.contentWindow.document.querySelectorAll('a')
    //     links.forEach(element => {
    //         element.addEventListener("click", event => {
    //             let isTargetTop = event.target.target === "_top";
    //             if (isTargetTop) {
    //                 event.preventDefault();
    //                 addTab(event.target.href);
    //             }
    //         });
    //     })
    // })

    tabs.push(tab)

    tabList.appendChild(
        tab.item
    )

    tabView.appendChild(tab.view)
    focusTab(tab)

    saveTabs(tabs)
}

addTab('google.com')