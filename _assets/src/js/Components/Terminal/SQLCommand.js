let axios = require('axios');

axios = axios.create({
  baseURL: '/api/',
});

class SQLCommand {

  constructor(query, callback) {

    this.result = {};

    this.error = false;
    this.errorMessage = '';

    this.count = 0;
    this.affectedRows = 0;

    this.query = query.toLowerCase();

    // hold the AJAX response object
    this.response = {};

    // determine the query type
    // 1: means a fetching query which requires inserting the returned rows in the DOM
    // 2: means an altering query which requires showing the affected rows number in the console
    // if (this.query.startsWith('select')) {
    //   this.type = 1;
    // } else {
    //   this.type = 2;
    // }
    
    // send an AJAX request to run the query
    // a response object will be added to the instance.
    this._performTheRequest().then(function() {
      // check if a network failure has been occurred 
      if (typeof this.status === 'undefined' || this.status >= 300) {
        this.error = true;
        this.errorMessage = 'unfortunately, something went wrong. This error has nothing to do with your query it\'s a network error ( HTTP Status #' + this.status + ' )';
        callback(this);
        return false;
      }

      if (this.data.error === true) {
        this.error = true;
        this.errorMessage = this.data.message;
      }

      if (typeof this.data.fetching !== "undefined") {
        this.fetching = this.data.fetching;
        this.currentPage = this.data.currentPage;
        this.count = this.data.count;
        this.totalPages = this.data.totalPages;
        this.rowsPerPage = this.data.rowsPerPage;
      }

      callback(this);

    }.bind(this));


  }

  isFetching() {
    return this.fetching;
  }

  returnedMessage() {
    return this.data.message || '';
  }

  async _performTheRequest() {

    return await axios.post('/query', {
        query: this.query
    })
    .then(function (response) {
      this.status = response.status;
      this.data = response.data;
    }.bind(this))
    .catch(function (error) {
      this.status = error.status;
    }.bind(this));
    
  }

  nextPage(callback) {
    if (this.currentPage === this.totalPages) {
      return false;
    }

    const page = this.currentPage + 1;
    this._page(page, callback);
  }

  prevPage(callback) {
    if (this.currentPage === 1) {
      return false;
    }

    const page = this.currentPage - 1;
    this._page(page, callback);
  }

  async _page(page, callback) {
    return await axios.post('/page', {
      query: this.query,
      page: page
    })
    .then(function (response) {
      this.data = response.data;
      this.currentPage = response.data.currentPage;
      callback();

    }.bind(this))
    .catch(function (error) {

      this.status = error.status;
      console.log(error);

    }.bind(this));
  }

  getData() {
    return this.data;
  }

}


export default SQLCommand;