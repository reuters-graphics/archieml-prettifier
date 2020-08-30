![](badge.svg)

# archieml-prettifier

Google Apps Script to prettify [ArchieML](http://archieml.org/) formatted docs.

![](images/title.png)

### To use

*Fair warning, Google Apps Scripts is a terrible development environment. These instructions are tedious and must be done for __every__ doc you want to format.*

---

1. Open the Google Doc you want to prettify and under the `Tools` menu select the `Scripts editor` option.

<img src='images/menu.png' height='300' />

2. This will open up a new window for a Google Apps Script Project.

<img src='images/project.png' height='200' />

3. Click the `Untitled project` name in the upper left and rename your project **ArchieML**.

<img src='images/project-name.png' height='200' />

4. Copy the code from the `prettifyArchieML.gs` file in this repo and use it to replace the code in your `Code.gs` file in the Apps Script Editor.

<img src='images/code.png' height='250' />

5. Save the project and close the Apps Script window.

6. Go back to your document and refresh the page. Under `Add-ons` you'll now see a `ArchieML` option. Click on any of the options.

<img src='images/plugin.png' height='200' />

7. Follow the dialogue to authorize the app. (You'll be warned the app isn't verified, but nevermind.)

<img src='images/authorization.png' height='200' />

8. Once you've authorized the script, you can now use the Add-on options.
