class Terminal {



  constructor() {


  }

  /**
   * [constructDOM build the table columns and records]
   * @columns : DOM Element passed by reference ( tr )
   * @rows    : DOM Element passed by reference ( tbody )
   * @data    : array of objects that hold the table data
   */
  constructDOM(columns, rows, data) {
    for (const key in data.columns) {
      const th = document.createElement('th');
      const button = document.createElement('button');
      button.innerHTML = data.columns[key];
      th.appendChild(button);
      columns.appendChild(th);
    }

    this.constructRows(rows, data);
  }
  /**
   * [constructRows build the table records]
   * @rows    : DOM Element passed by reference ( tbody )
   * @data    : array of objects that hold the table data
   */
  constructRows(rows, data) {
    for (const key in data.rows) {
      const tr =  document.createElement('tr');
      for (const _key in data.rows[key]) {
        const td = document.createElement('td');
        const span = document.createElement('span');
        span.innerHTML = data.rows[key][_key];
        td.appendChild(span);
        tr.appendChild(td);
      }
      rows.appendChild(tr);
    }
  }

  fixStylingIssues(columns, rows, scrollableContent) {
    this._matchHeaderToRows(columns, rows);
    scrollableContent.addEventListener('scroll', function(e) {
      columns.parentElement.style.left = -e.currentTarget.scrollLeft + 'px';
    });
  }

  _matchHeaderToRows(columns, rows) {
    const firstRow = rows.querySelector('tr');

    if (firstRow === null) {
      return false;
    }

    const rowChildren = firstRow.childNodes;
    const columnChildren = columns.childNodes;


    for(const key in rowChildren) {
      if (typeof rowChildren[key].firstChild === "undefined") {
        continue;
      }

      columnChildren[key].style.minWidth = rowChildren[key].offsetWidth + 'px';
    }

  }
}

export default Terminal;
