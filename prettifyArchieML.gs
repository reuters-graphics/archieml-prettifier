function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Prettify', 'prettifyArchieML')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

const whitespacePattern = ' ';
const slugBlacklist = whitespacePattern + '\[\\\]\{\}\:';
const startKey = new RegExp('^\\s*([^' + slugBlacklist + ']+)[ \t\r]*:[ \t\r]*').toString().slice(1,-1);
const commandKey = new RegExp('^\\s*:[ \t\r]*(endskip|ignore|skip|end).*?(\n|\r|$)', 'i').toString().slice(1,-1);
const arrayElement = new RegExp('^\\s*\\*[ \t\r]*').toString().slice(1,-1);
const scopePattern = new RegExp('^\\s*(\\[|\\{)[ \t\r]*([\+\.]*)[ \t\r]*([^' + slugBlacklist + ']*)[ \t\r]*(?:\\]|\\})').toString().slice(1,-1);
const mustache = new RegExp('{{.*}}').toString().slice(1,-1);

function prettifyArchieML() {
  prettifyTags(startKey);
  prettifyTags(commandKey);
  prettifyTags(arrayElement);
  prettifyTags(scopePattern);
  prettifyMustaches(mustache);
}

function prettifyMustaches(searchPattern) {
  const body = DocumentApp.getActiveDocument().getBody();
  let foundElement = body.findText(searchPattern);
  while (foundElement !== null) {
    const foundText = foundElement.getElement().asText();
    const start = foundElement.getStartOffset();
    const end = foundElement.getEndOffsetInclusive();
    
    foundText.setBold(start, end, false);
    foundText.setFontFamily(start, end, 'Consolas');
    foundText.setBackgroundColor(start, end, "#D08770");

    foundElement = body.findText(searchPattern, foundElement);
  }
}


function prettifyTags(searchPattern) {
  const body = DocumentApp.getActiveDocument().getBody();
  let foundElement = body.findText(searchPattern);
  while (foundElement !== null) {
    const foundText = foundElement.getElement().asText();
    const start = foundElement.getStartOffset();
    const end = foundElement.getEndOffsetInclusive();
    
    foundText.setBold(start, end, true);
    foundText.setFontFamily(start, end, 'Consolas');
    foundText.setBackgroundColor(start, end, "#8FBCBB");
    
    foundElement = body.findText(searchPattern, foundElement);
  }
}
