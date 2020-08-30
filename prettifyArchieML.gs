function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
    .addItem('Prettify ArchieML', 'prettifyArchieML')
    .addItem('Prettify mustache tags', 'prettifyMustaches')
    .addItem('Prettify comments', 'prettifyComments')
    .addItem('Prettify all', 'prettifyAll')
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
const comments = new RegExp('^#\\s*.*$').toString().slice(1,-1);

function prettifyArchieML() {
  prettifyTags(startKey);
  prettifyTags(commandKey);
  prettifyTags(arrayElement);
  prettifyTags(scopePattern);
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
    foundText.setForegroundColor(start, end, "#5E81AC");
    foundText.setBackgroundColor(start, end, "#FFFFFF");
    
    foundElement = body.findText(searchPattern, foundElement);
  }
}

function prettifyMustaches() {
  const body = DocumentApp.getActiveDocument().getBody();
  let foundElement = body.findText(mustache);
  while (foundElement !== null) {
    const foundText = foundElement.getElement().asText();
    const start = foundElement.getStartOffset();
    const end = foundElement.getEndOffsetInclusive();
    
    foundText.setBold(start, end, false);
    foundText.setFontFamily(start, end, 'Consolas');
    foundText.setForegroundColor(start, end, "#BF616A");
    foundText.setBackgroundColor(start, end, "#FFFFFF");

    foundElement = body.findText(mustache, foundElement);
  }
}

function prettifyComments() {
  const body = DocumentApp.getActiveDocument().getBody();
  let foundElement = body.findText(comments);
  while (foundElement !== null) {
    const foundText = foundElement.getElement().asText();
    const start = foundElement.getStartOffset();
    const end = foundElement.getEndOffsetInclusive();
    
    foundText.setBold(start, end, false);
    foundText.setFontFamily(start, end, 'Consolas');
    foundText.setForegroundColor(start, end, "#aaaaaa");
    foundText.setBackgroundColor(start, end, "#ffffff");

    foundElement = body.findText(comments, foundElement);
  }
}

function prettifyAll() {
  prettifyArchieML();
  prettifyMustaches();
  prettifyComments();
}
