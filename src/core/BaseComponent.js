import {DomListener} from '@/core/DomListener';

export class BaseComponent extends DomListener {
  renderComponent() {
    throw new Error('Метод renderComponent() должен быть определен')
  }
}
