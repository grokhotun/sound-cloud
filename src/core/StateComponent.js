import {BaseComponent} from '@/core/BaseComponent';

export class StateComponent extends BaseComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  useState(state = {}) {
    this.state = {
      ...state
    }
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }
    this.$root.html(this.template)
  }
}
