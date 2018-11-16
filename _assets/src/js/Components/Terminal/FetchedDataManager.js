import resultHTML from 'Result.html';
import Table from '../Table/Table.js';

class FetchedDataManager {
  
  constructor(terminal, sql) {

    // a fragment that will hold the queries results DOM during the processing
    const resultDOM = document.createRange().createContextualFragment(resultHTML);
    
    terminal._bindStateToTemplate({query: sql.query, count: sql.count, rowsPerPage: sql.rowsPerPage}, resultDOM);

    const columns = resultDOM.querySelector('.js-columns');

    // put it in the object because we will need it for pagination
    this.rows = resultDOM.querySelector('.js-rows');
    this.resultTableWrapper = resultDOM.querySelector('.table');
    const data = sql.getData();

    this.table = new Table();
    this.table.constructDOM(columns, this.rows, data);

    this._appendResult(terminal, resultDOM);
    this._fixTableStyling(this.table, columns, this.rows);


    this.nextPageButton = terminal.resultHost.querySelector('.js-next');
    this.prevPageButton = terminal.resultHost.querySelector('.js-prev');
    const isTherePages = this._prepareNavigationArrows(sql);
    if ( isTherePages ) {
      this._registerEvents(terminal, sql);
    }
  }

  _appendResult(terminal, resultDOM) {
    terminal.resultHost.classList.remove('is-empty');
    terminal.resultHost.innerHTML = "";
    terminal.resultHost.append(resultDOM);
  }

  _prepareNavigationArrows(sql) {

    if (sql.currentPage === 1) {
      this.prevPageButton.setAttribute('disabled', 'disabled');
    }

    if (sql.currentPage === sql.totalPages) {
      this.nextPageButton.setAttribute('disabled', 'disabled');
    }

    return sql.totalPages !== 1;

  }

  _fixTableStyling(table, columns, rows) {
    const scrollHook = document.getElementById('scroll-hook');
    const simplebar = new SimpleBar(scrollHook);
    table.fixStylingIssues(columns, rows, simplebar.getScrollElement('x'));
  }

  _registerEvents(terminal, sql) {

    this.nextPageButton.addEventListener('click', function() {
      this.resultTableWrapper.classList.add('is-loading');
      sql.nextPage(function() {

        this._appendNewPage(sql);

        if (sql.currentPage === sql.totalPages) {
          this.nextPageButton.setAttribute('disabled', 'disabled');
        } 

        if (this.prevPageButton.hasAttribute('disabled')){
          this.prevPageButton.removeAttribute('disabled');
        }

      }.bind(this));
    }.bind(this));

    this.prevPageButton.addEventListener('click', function() {
      this.resultTableWrapper.classList.add('is-loading');
      sql.prevPage(function() {

        this._appendNewPage(sql);

        if (sql.currentPage === 1) {
          this.prevPageButton.setAttribute('disabled', 'disabled');
        } 

        if (this.nextPageButton.hasAttribute('disabled')){
          this.nextPageButton.removeAttribute('disabled');
        }

      }.bind(this));
    }.bind(this));
  }

  _appendNewPage(sql) {
    const rowsFragment = document.createDocumentFragment();
    this.table.constructRows(rowsFragment, sql.getData());
    this.rows.innerHTML = "";
    this.rows.append(rowsFragment);
    this.resultTableWrapper.classList.remove('is-loading');
  }

}

export default FetchedDataManager;