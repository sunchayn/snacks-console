import LocalStorageFacade from '../LocalStorageFacade/LocalStorageFacade.js';

class Bookmarks extends LocalStorageFacade {
  
  constructor(currentQuery) {
    super('bookmarks');

    if (currentQuery !== false) {
      this.currentQuery = currentQuery;
      this.button = document.getElementById('js-bookmark');
      this.icon = this.button.querySelector('.icon');
      if (this.has(currentQuery)) {
        this.icon.classList.remove('empty');
      }
      this._handleEvents();
    }


  }

  _handleEvents() {
    this.button.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.has(this.currentQuery)) {

        this.remove( this.currentQuery );
        this.icon.classList.add('empty')

      } else {

        if ( this.add( this.currentQuery, true ) ) {
          this.icon.classList.remove('empty');
        }

      }

      this.button.blur();
    }.bind(this));
  }

  constructDOM( holder, terminal ) {

    const items = this.getItems();

    for (const key in items) {
      const div = document.createElement('div');
      div.classList.add('bookmark-item');
      div.setAttribute('data-key', key);

      const button = document.createElement('button');
      
      const span1 = document.createElement('span');
      span1.classList.add('bookmark-item-key');
      span1.innerHTML = key;

      const span2 = document.createElement('span');
      span2.classList.add('bookmark-item-query');
      span2.innerHTML = items[key];

      button.appendChild(span1);
      button.appendChild(span2);

      div.appendChild(button);
      holder.appendChild(div);
    }

    this._handleBookmarkClickEvent( holder, terminal );
  }

  _handleBookmarkClickEvent( holder, terminal ) {
    const items = holder.querySelectorAll('.bookmark-item');

    items.forEach(function(target) {
      target.addEventListener('click', function(e) {
        const key = target.dataset.key;
        const query = this.getItem(key);
        if (query !== false) {
          terminal.handleQuery(query, true);
        }        
      }.bind(this));
    }.bind(this));
  }
}

export default Bookmarks;
