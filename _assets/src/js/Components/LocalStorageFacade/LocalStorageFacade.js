
class LocalStorageFacade {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = JSON.parse( localStorage.getItem(this.storageKey) );

    if (this.items === null) {
      this.items = [];
    }

    this.count = this.items.length;
    this.currentIndex = this.count;
  }

  getItems() {
    return this.items;
  }

  getItem(key) {
    return this.items[key] || false;
  }

  has(item) {
    return this.items.includes(item);
  }

  add(item, exclusive = false) {
    
    if (exclusive === true && this.has(item)) {
      return false;
    }

    if (this.items[this.count - 1] === item) {
      return false;
    }

    this.items.push(item);
    this.count++;
    this.currentIndex = this.count;
    localStorage.setItem( this.storageKey, JSON.stringify(this.items) );

    return true;
  }

  get (direction) {
    if (this.count === 0) {
      return false;
    }

    if (direction === 'up') {

      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex++;
        return false;
      }

    } else if (direction === 'down') {

      this.currentIndex++;
      if (this.currentIndex > this.count) {
        this.currentIndex--;
        return false;
      }

    }

    if (typeof this.items[this.currentIndex] === 'undefined') {
      return false;
    }

    return this.items[this.currentIndex];

  }

  remove(target, byIndex = false) {
    if ( byIndex ) {
      this.items.splice(target, 1);
    } else {
      this.items = this.items.filter(e => e !== target);
    }
    
    this.count--;
    this.currentIndex--;
    localStorage.setItem( this.storageKey, JSON.stringify(this.items) );
  }

  clear() {
    this.items = [];
    this.count = 0;
    this.currentIndex = 1;
    localStorage.removeItem( this.storageKey );
  }
}

export default LocalStorageFacade;
