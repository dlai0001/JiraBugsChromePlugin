# How to use:

1. Copy 'settings.js.template' to 'settings.js'
2. Edit 'settings.js' file with your Jira http address and project name to use.
3. In Chrome, open chrome://extensions/, then 'Load Unpacked Extension'
4. In a browser window, open Jira and login so you are authenticated.
5. In Jira, open Administration settings for the project.  In the Component manager, add 
[location:/someexpression] into the component descripiton.  This allows the plugin to 
match expressions with the current tab's location for searching.
6. When you test, you can now click the toolbar button, it'll display a list of Jira 
tickets relating the the matching components.

Copyright: 2013 - BSD

Credits - David Lai
