import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  cssPropertyValue(propertyName, defaultValue) {
    let value = getComputedStyle(this.element).getPropertyValue(propertyName);
    if (value) { return value }
    if (defaultValue !== undefined) { return defaultValue }
    
    return this.constructor?.defaultCssProperties?.[propertyName]
  }
}