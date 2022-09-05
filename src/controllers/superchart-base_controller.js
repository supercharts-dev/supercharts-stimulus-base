import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  cssPropertyValue(propertyName) {
    let value = getComputedStyle(this.element).getPropertyValue(propertyName);
    if (value) { return value }
    
    return this.constructor?.defaultCssProperties?.[propertyName]
  }
}