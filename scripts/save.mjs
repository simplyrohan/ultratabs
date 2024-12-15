export function saveTabs(tabs) {
    const data = JSON.stringify(tabs);
    localStorage.setItem('tabs', data);
}


export function loadTabs() {
    const data = localStorage.getItem('tabs');
    return JSON.parse(data);
}
