'use babel';

import { $$, SelectListView } from 'atom-space-pen-views';

export default class ServerListView extends SelectListView {
  initialize(data = [], onConfirm) {
    super.initialize();

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
      const item = {
        name: this.data[i].name,
        host: this.data[i].host,
        text: '',
        index: i,
      };

      if (item.name) {
        item.text = `${item.name} [${item.host}]`;
      } else {
        item.text = item.host;
      }

      servers.push(item);
    }

    this.setItems(servers);
    this.focusFilterEditor();
  }

  show() {
    if (this.data.length === 0) return;

    this.panel = atom.workspace.addModalPanel({ item: this });

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
    const li = document.createElement('li');
    li.innerHTML = item.text;
    return li;
  }

  confirmed(item) {
    this.onConfirm(item);
    this.cancel();
    if (this.currentPane && this.currentPane.isAlive()) {
      this.currentPane.activate();
    }
  }
}
