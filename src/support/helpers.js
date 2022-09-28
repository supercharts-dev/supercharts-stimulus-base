export function parseContentsAsJSON(el) {
  let str = el.innerHTML.trim()
  if (str === "") {
    return {}
  }
  return JSON.parse(str)
}