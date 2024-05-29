import state from './state.js'
import * as timer from './timer.js'
import * as el from './elements.js'
import * as music from './sounds.js'

// controls
export function running() {
  state.running = document.documentElement.classList.toggle('running')

  el.controls
    .querySelector('[data-action="plus"]')
    .setAttribute('disabled', true)

  el.controls
    .querySelector('[data-action="reduce"]')
    .setAttribute('disabled', true)

  timer.countdown()
}

export function stop() {
  state.running = false
  document.documentElement.classList.toggle('running')

  el.controls.querySelector('[data-action="plus"]').removeAttribute('disabled')

  el.controls
    .querySelector('[data-action="reduce"]')
    .removeAttribute('disabled')

  timer.updateDisplay()
}

export function plus() {
  let minutes = Number(el.minutes.textContent)

  if (minutes < 60) {
    minutes += 5
  }

  timer.updateDisplay(minutes)
}

export function reduce() {
  let minutes = Number(el.minutes.textContent)

  if (minutes > 0) {
    minutes -= 5
  }

  timer.updateDisplay(minutes)
}

// sounds
export function playMusic(clickSound) {
  clickSound = clickSound ?? state.sound

  const buttons = el.sounds.querySelectorAll('button[data-sound]')

  buttons.forEach((button) => {
    const sound = button.dataset.sound

    if (sound !== clickSound) {
      music[sound].pause()
      button.classList.remove('active')
    } else {
      button.classList.toggle('active')

      if (!button.classList.contains('active')) {
        music[clickSound].pause()
        return
      }
      music[clickSound].play()
    }
  })
}
