import { SelectListView } from 'atom-space-pen-views';

module.exports =
class ListView extends SelectListView {
  initialize(data, onConfirm) {
    super();
    this.data = data;
    this.onConfirm = onConfirm;
    this.addClass('remote-ftp-list');
    this.show();
    this.parseData();
    this.currentPane = atom.workspace.getActivePane();
  }

  parseData() {
    const servers = [];

    for (let i = 0; i < this.data.length; i++) {
      let { name } = this.data;

      if (name) {
        name += `[${this.data.host}]`;
      } else {
        name = this.data.host;
      }
    }

    this.setItems(servers);
    this.focusFilterEditor();
  }

  show() {
    this.panel = atom.workspace.addModalPanel(null, this);

    if (this.panel) {
      this.panel.show();
      this.storeFocusedElement();
    }
  }

  cancelled() {
    this.hide();
  }

  hide() {
    if (this.panel) {
      this.panel.destroy();
    }
  }

  viewForItem(item) {
    return `<li>${item}</li>`;
  }

  confirmed(item) {
    this.onConfirm(item);
    this.cancel();
    if (this.currentPane && this.currentPane.isAlive()) {
      this.currentPane.activate();
    }
  }
};
