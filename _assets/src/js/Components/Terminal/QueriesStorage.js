import LocalStorageFacade from '../LocalStorageFacade/LocalStorageFacade.js';

class QueriesStorage extends LocalStorageFacade {
  constructor() {
    super('commands');
  }

}
export default QueriesStorage;
