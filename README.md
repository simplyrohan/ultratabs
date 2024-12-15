# ultratabs
An Ultraviolet powered proxy

# Commands
To build the CSS, run 
```
sass styles/sass/:styles/css
```

# Notes
Yes, I know that its terrible to put the built JS files for baremux, uv, and epoxy in the repository, but i'm working on an easy way to build that without npm so just wait.

# Bugs
- [x] When clicking a link, the icon doesnt update (move it to the event listner)
- [x] Some links don't work/are blocked (eg Gmail on google.com) (Ultraviolet bug possibly)
     - [ ] Spotify login link still doesn't work (`#` href?)
- [x] Slightly buggy tab closing if you do things to fast

# To Do
- [ ] Save tabs in localStorage
- [ ] Make it look more like Arc
     - [ ] Move the new tab button
     - [ ] Add bookmarks/pinned tabs
     - [ ] Hide sidebar
     - [ ] Better color
- [ ] New tab page
- [ ] Settings
      - [ ] Tab disguise
      - [ ] Colors
      - [ ] Search Engine
- [ ] Move the UI to a UI module and that is the script root