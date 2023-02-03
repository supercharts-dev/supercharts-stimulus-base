import * as d3 from "d3"

export function parseContentsAsJSON(el) {
  let str = el.innerHTML.trim()
  if (str === "") {
    return {}
  }
  return JSON.parse(str)
}

export function parseContentsAsCsv(el) {
  let str = el.innerHTML.trim()
  return d3.csvParse(str)
}