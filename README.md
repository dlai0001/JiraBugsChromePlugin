How to use:

# Copy 'settings.js.template' to 'settings.js'
# Edit 'settings.js' file with your Jira http address and project name to use.
# In Chrome, open chrome://extensions/, then 'Load Unpacked Extension'
# In a browser window, open Jira and login so you are authenticated.
# In Jira, open Administration settings for the project.  In the Component manager, add 
[location:/someexpression] into the component descripiton.  This allows the plugin to 
match expressions with the current tab's location for searching.
# When you test, you can now click the toolbar button, it'll display a list of Jira 
tickets relating the the matching components.