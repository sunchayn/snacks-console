import help from 'commands/help.html';
import about from 'commands/about.html';
import bookmarksHTML from 'commands/bookmarks.html';

import Bookmarks from '../Bookmarks/Bookmarks.js';

class InternalCommand {

  constructor(query, terminal) {
    this.terminal = terminal;
    const extractedData = query.match(/-[a-z]*/gi);
    this.found = false;
    if (extractedData !== null) {
      const command = extractedData[0].replace('-', '');
      const args = query.trim().replace('-' + command + ' ', '').split(' ');
      
      if (typeof this[command] !== "undefined") {
        this.found = true;
        this.response = this[command](args);
      }
    }
  }

  help() {
    return help;
  }

  settings() {
    window.location.href = '/settings';
    return this._print('redirecting to settings...');
  }

  documentation() {
    return this._print('documentation...');
  }

  bookmarks(args) {
    const bookmarks = new Bookmarks(false);
    if (args[0] === '-remove') {

      if (typeof args[1] === 'undefined') {
        return this._print('Please specify the bookmark\'s key you want to delete. Type -bookmarks to see all the bookmarked items alongside their keys.');
      } else {
        const key = Number(args[1]);
        bookmarks.remove(key, true);
        return this._print('The specified item has been successfully deleted.');
      }

    } else {

      const resultDOM = document.createRange().createContextualFragment(bookmarksHTML);
      const bookmarksHolder = resultDOM.querySelector('.bookmarks');
      

      bookmarks.constructDOM(bookmarksHolder, this.terminal);

      this.terminal.resultHost.classList.remove('is-empty');
      this.terminal.resultHost.innerHTML = "";
      this.terminal.resultHost.append(resultDOM);

      return this._print('Select your bookmark from the list below.');

    }

  }

  clearrecent() {
    this.terminal.queriesStorage.clear();
    return this._print('All recent queries has been cleared !');
  }

  clear() {
    this.terminal.clear();
    return false;
  }

  about() {
    return about;
  }

  _print(content) {
    return '<div class="terminal-commandResponse">' + content + '</div>';
  }
}


export default InternalCommand;
