import { bindable, bindingMode } from 'aurelia-framework';

export class SecretMessageCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) message: string;
  @bindable allowDestruction: boolean = false;

  constructor() {
    setInterval(() => this.deleteMessage(), 10000);
  }

  deleteMessage() {
    if (this.allowDestruction === true) {
      this.message = '';
    }
  }
}

