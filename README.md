<h1 align="center" style="font-size: 7rem">Ultratabs</h1>
<p align="center">A powerful webproxy based on the Arc Browser</p>

![Ultraviolet](https://img.shields.io/badge/Ultraviolet-Powered-purple?style=for-the-badge)
![Arc](https://img.shields.io/badge/Arc-Inspired-000000?style=for-the-badge&logo=arc&logoColor=white)
<hr>

> [!IMPORTANT]  
> This site will not function until you provide it a Wisp server. Modify this at `/scripts/proxy.mjs`. I'm working on a better way to specify the server

# Commands
To build the CSS, run 
```
sass styles/sass/:styles/css
```
# Bugs
- [ ] Spotify login doesn't work (fix: switch to scramjet + unstable libcurl)

# To Do
- [x] Save tabs in localStorage
     - A little glitchy and overall I don't think its worth the pain; may be removed
- [ ] Make it look more like Arc
     - [x] Move the new tab button
     - [ ] Add bookmarks/pinned tabs (**Important!!**)
     - [x] Hide sidebar
     - [ ] Better URL bar
     - [x] Better color
- [ ] Settings
     - [ ] Tab disguise
     - [ ] Colors
     - [ ] Search Engine
     - [ ] Custom Wisp server
     - [ ] Scramjet/UV, Epoxy/Libcurl, etc
- [ ] Better tab system
     - [ ] Drag + Drop
     - [ ] Rename Tabs
     - [ ] Folders
