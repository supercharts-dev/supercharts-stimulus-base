import SuperchartBaseController from './superchart-base_controller.js'
import Chartjs from 'chart.js/auto'

export default class extends SuperchartBaseController {
  static targets = [ "chartjsOptions", "chartjsData", "chartjsCanvas" ]
  
  connect() {
    this.drawChart()
  }
  
  disconnect() {
    this.teardownChart()
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
    this.chart.update()
  }
  
  get chartjsData() {
    if (!this.hasChartjsDataTarget) {
      console.warn(`The chart needs options in json format.`)
      return {}
    }
    JSON.parse(this.chartjsOptionsTarget.innerHTML.trim())
  }
  
  get chartjsOptions() {
    if (!this.hasChartjsOptionsTarget) {
      console.warn(`The chart needs options in json format.`)
      return {}
    }
    
    return {
      ...this.defaultOptions,
      ...JSON.parse(this.chartjsOptionsTarget.innerHTML.trim())
    }
  }
  
  get defaultOptions() {
    return {}
  }
}