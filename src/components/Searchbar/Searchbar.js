import {getSearchbar} from '@/components/Searchbar/searchbar.template';
import {setSearchQuery} from '@/redux/actions';
import {$} from '@/core/Dom';
import {StateComponent} from '@/core/StateComponent';

export class Searchbar extends StateComponent {
  static className = 'searchbar'

  constructor($root, options) {
    super($root, {
      name: 'Searchbar',
      watch: [],
      listeners: ['input'],
      ...options
    })
  }

  get template() {
    return getSearchbar(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(setSearchQuery($target.value()))
  }
}
