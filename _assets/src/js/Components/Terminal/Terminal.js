import terminalHTML from 'Terminal.html';
import InternalCommand from './InternalCommand.js';
import SQLCommand from './SQLCommand.js';
import FetchedDataManager from './FetchedDataManager.js';
import TextAnimator from './TextAnimator.js';
import QueriesStorage from './QueriesStorage.js';
import Bookmarks from '../Bookmarks/Bookmarks.js';

class Terminal {

  constructor(host, resultHost, state = {}) {
    
    // the element that will host the terminal content
    this.host = host;
    // the element that will host the select queries' results
    this.resultHost = resultHost;
    // external data related to the terminal ( for example: the logged in user )
    this.state = state;

    // a fragment that will hold the terminal DOM during the processing
    this.DOM = document.createRange().createContextualFragment(terminalHTML);
    // a node instance that will be cloned to create new rows 
    this.queryRow = this.DOM.querySelector('.js-terminal-row');
    this.queryRow.classList.remove('js-terminal-row');
    // a node instance that will be cloned to create messages rows
    this.queryWorking = this.DOM.querySelector('.js-terminal-working');
    this.queryWorking.classList.remove('js-terminal-working');

    // initialize the terminal
    this._init();

    // register the events
    this._handleEvents();

    // this.handleQuery('select * from users', true);
  }

  _init() {
    // disable the unwanted features
    this.host.setAttribute('autocomplete', 'off');
    this.host.setAttribute('autocorrect', 'off');
    this.host.setAttribute('autocapitalize', 'off');
    this.host.setAttribute('spellcheck', false);
    
    // replace the placeholder in the template with real data
    this._bindStateToTemplate(this.state, this.DOM);
    // QueriesStorage : is a factory that will take care of management of the recent queries
    this.queriesStorage = new QueriesStorage();
    // Insert the first row in the terminal
    this._insertQueryRow();
  }

  _bindStateToTemplate(state, template) {
    for (const key in state) {
      const value = state[key];
      template.querySelector('[s-template='+ key +']').innerHTML = value;
    }
  }

  _insertQueryRow() {
    const row = this.queryRow.cloneNode(true);
    this.currentQuery = row.querySelector('.terminal-query');
    this._initalizeQuery(this.currentQuery);

    // render the final output
    this.host.appendChild(row);

    // start the cursor inside the query tab
    this.currentQuery.focus();
  }

  _initalizeQuery(query) {
    query.setAttribute('contenteditable', true);
  }

  _deinitalizeQuery(query) {
    query.removeAttribute('contenteditable');
  }

  _handleEvents() {
    // when click anywhere in the terminal (expect previous queries), focus the cursor inside the query tab
    this.host.addEventListener('click', (e) => {
      if (e.target.classList.contains('terminal')) {
        setEndOfContenteditable(this.currentQuery);
      }
    });

    // handle the arrows keys ( load recent queries )
    document.addEventListener('keyup', function(e) {
      // only make this handler works if the user is inside a query row
      if( !e.target.classList.contains('terminal-query') ) {
        return false;
      }

      var key = e.which || e.keyCode;

      // Arrow Key up
      if (key === 38) {
        const fetchedQuery = this.queriesStorage.get('up');
        if (fetchedQuery !== false) {
          this.currentQuery.innerHTML = fetchedQuery;
          setEndOfContenteditable(this.currentQuery);
        }
        return true;
      }

      // Arrow Key down
      if (key === 40) {
        const fetchedQuery = this.queriesStorage.get('down');
        if (fetchedQuery !== false) {
          this.currentQuery.innerHTML = fetchedQuery;
          setEndOfContenteditable(this.currentQuery);
        }
        return true;
      }
    }.bind(this));

    // handle the Enter key to run the query
    document.addEventListener('keypress', function(e) {

      // only make this handler works if the user is inside a query row
      if( !e.target.classList.contains('terminal-query') ) {
        return false;
      }

      var key = e.which || e.keyCode;

      // Enter Key
      if (key === 13) {
        e.preventDefault();
        const query = this.currentQuery.textContent;
        if (query === "") {
          return false;
        }

        this.handleQuery(query);

        return true;
      }
    }.bind(this));

    // hide or show the content ellipse when user scroll
    this.host.addEventListener('scroll', function(e) {
      if (this.host.scrollTop <= 0) {
        this.host.classList.remove('is-scrollable');
      } else {
        if (!this.host.classList.contains('is-scrollable')) {
          this.host.classList.add('is-scrollable');
        }
      }
    }.bind(this));
  }

  handleQuery(query, isExternal = false) {
    if (isExternal) {
      this.currentQuery.innerHTML = query;
    }

    this.queriesStorage.add(query);

    this._deinitalizeQuery(this.currentQuery);
    const result = this._executeQuery(query);

    /* 
    - when a query return false:
    it means don't run the rest of this function to avoid conflict,
    because some queries may handle their console output without the need to print messages or add new query row;
    */
    if (result === false) {
      return false;
    }

    /*
    - when a query return true:
    it means there's no message to print;
     */
    
    // if it's not true it will be an object, there's no need to worry about false status it's handled above;
    if (result !== true) {
      if (result.status === 'success') {
        this._printMessage(result.content);
      } else {
        this._printMessage(result.content, true);
      }
    }

    this._insertQueryRow();
    this.host.scrollTop = this.host.scrollHeight;
  }

  /**
   * [_printMessage this method will print a message in the console, if it's not an error it will indicate the timestamps too]
   * @param  {[string]}  message [the content to print in the console]
   * @param  {Boolean} isError [determine if the message to print is an error message or normal message]
   */
  _printMessage(message, isError = false) {

    const working = this.queryWorking.cloneNode(true);

    const text = working.querySelector('.terminal-text');

    if (isError === true) {
      text.classList.add('terminal-text--error');
      working.querySelector('.terminal-working').remove();
    } else {
      const date = new Date();
      working.querySelector('.terminal-working-date').innerHTML = date.toLocaleTimeString();
    }

    if (message instanceof TextAnimator) {
      text.innerHTML = message.getInitialText();
      message.feedNode(text);
    } else {
      text.innerHTML = message;
    }

    this.host.appendChild(working);
  }

  _pushHtml(html) {
    const content = document.createRange().createContextualFragment(html);
    this.host.appendChild(content);
  }

  _executeQuery(query) {
    // determine if the query is an internal command or a SQL query
    const isSql = (query[0] !== '-');
    let message = {status: '', content: ''};

    if (isSql === true) {
      const textAnimator = new TextAnimator('Running query');
      this._printMessage(textAnimator);
      // - 
      new SQLCommand(query, function(sql) {
        textAnimator.stopAnimation();
        if (sql.error === true) {
          this._printMessage(sql.errorMessage, true);
        } else {
          message.status = 'success';
          message.content = sql.returnedMessage();
          this._printMessage(message.content);

          if (sql.isFetching()) {
            this._displayQueryResult(sql);
          }
        }
        this._insertQueryRow();
      }.bind(this));

      /* 
      returning false here so the caller doesn't insert a new query line as the queries executed through AJAX asynchronously, the callback above will take care of inserting the new query line when the requested is finished.
      */
      return false;

    } else {

      const command = new InternalCommand(query, this);
      if (command.found === false) {
        message.status = 'error';
        message.content = 'Use of unrecognized SQL or Internal Command. Type \'-help\' for addtional help !';
      } else {
        if (command.response === false) {
          message = false;
        } else {
          message = true;
          this._pushHtml(command.response);
        }
      }

    }

    return message;
  }

  _displayQueryResult(sql) {
    const fetchedDataManager = new FetchedDataManager(this, sql);
    const bookmarks = new Bookmarks(sql.query);
  }

  clear() {
    this.host.innerHTML = "";
    this._insertQueryRow();
  }

}

/*
copyright disclaimer :
I did not wrote this function, it's a solution proposed by Nico Burns [https://stackoverflow.com/users/140293/nico-burns] in order to make the cursor jump to the end of a contentEditable when it has a text content.

source : https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
 */
function setEndOfContenteditable(contentEditableElement) {
    var range,selection;
    //Firefox, Chrome, Opera, Safari, IE 9+
    if(document.createRange) {
        //Create a range (a range is a like the selection but invisible)
        range = document.createRange();
        //Select the entire contents of the element with the range
        range.selectNodeContents(contentEditableElement);
        //collapse the range to the end point. false means collapse to end rather than the start
        range.collapse(false);
        //get the selection object (allows you to change selection)
        selection = window.getSelection();
        //remove any selections already made
        selection.removeAllRanges();
        //make the range you have just created the visible selection
        selection.addRange(range);
    }
    //IE 8 and lower
    else if(document.selection)
    { 
        //Create a range (a range is a like the selection but invisible)
        range = document.body.createTextRange();
        //Select the entire contents of the element with the range
        range.moveToElementText(contentEditableElement);
        //collapse the range to the end point. false means collapse to end rather than the start
        range.collapse(false);
        //Select the range (make it the visible selection
        range.select();
    }
}

export default Terminal;
