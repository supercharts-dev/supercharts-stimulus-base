import SuperchartBaseController from './superchart-base_controller.js'
import Chartjs from "../support/chartjs.js"
import { parseContentsAsJSON } from "../support/helpers.js"

export default class extends SuperchartBaseController {
  static targets = [ "chartjsOptions", "chartjsData", "chartjsCanvas" ]
  
  connect() {
    this.drawChart()
    this.watchColorScheme()
  }
  
  disconnect() {
    this.teardownChart()
    this.unwatchColorScheme()
  }
  
  drawChart() {
    if (!this.hasChartjsCanvasTarget) {
      console.warn(`The chart needs a canvas element`)
      return
    }
    this.chart = new Chartjs(this.chartjsCanvasTarget.getContext('2d'), {
      data: this.chartjsData,
      options: this.chartjsOptions
    })
  }
  
  teardownChart() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = undefined
    }
  }
  
  updateChart() {
    this.chart.data = this.chartjsData
    this.chart.options = this.chartjsOptions
    this.chart.update()
  }
  
  handleColorSchemeChange() {
    this.updateChart()
  }
  
  watchColorScheme() {
    this.colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.colorSchemeQuery.addListener(this.handleColorSchemeChange.bind(this))
  }
  
  unwatchColorScheme() {
    if (this.colorSchemeQuery === undefined) { return }
    this.colorSchemeQuery.removeListener(this.handleColorSchemeChange)
    this.colorSchemeQuery = undefined
  }
  
  get chartjsData() {
    if (!this.hasChartjsDataTarget) {
      console.warn(`The chart needs options in json format.`)
      return {}
    }
    return parseContentsAsJSON(this.chartjsOptionsTarget)
  }
  
  get chartjsOptions() {
    if (!this.hasChartjsOptionsTarget) {
      console.warn(`The chart needs options in json format.`)
      return {}
    }
    
    return {
      ...this.defaultOptions,
      ...parseContentsAsJSON(this.chartjsOptionsTarget)
    }
  }
  
  get defaultOptions() {
    return {}
  }
  
  parseForCssVars(options) {
    const instance = this
    const parse = function(obj) {
      
      const type = function(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
      }
      
      const hasCssVar = function(obj) {
        if (Object.keys(obj).length > 1) { return false }
        if (!obj.hasOwnProperty('cssVar')) { return false }
        if (type(obj.cssVar) !== 'string') { return false }
        if (obj.cssVar.slice(0, 2) !== '--') { return false }
        return true
      }
      
      if (type(obj) === 'object') {
        if (hasCssVar(obj)) {
          return instance.cssPropertyValue(obj.cssVar)
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              obj[key] = parse(obj[key]);
            }
          }
        }
      }
      
      return obj;
    }
    
    return parse(options);
  }
}