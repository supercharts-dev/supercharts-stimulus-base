import { identifierForContextKey } from "@hotwired/stimulus-webpack-helpers"

import SuperchartBaseController from "./superchart-base_controller"

export const controllerDefinitions = [
  [SuperchartBaseController, "superchart-base_controller.js"],
].map(function(d) {
  const key = d[1]
  const controller = d[0]
  return {
    identifier: identifierForContextKey(key),
    controllerConstructor: controller
  }
})

export {
  SuperchartBaseController,
}
