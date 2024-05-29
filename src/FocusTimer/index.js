import state from './state.js'
import * as events from './events.js'
import * as timer from './timer.js'
import * as action from './actions.js'

export function start(minutes, seconds, sound) {
  state.minutes = minutes
  state.seconds = seconds
  state.sound = sound

  timer.updateDisplay()

  events.registerControls()

  action.playMusic()
}
