# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$ ->
  $(".img-avatar").on "click", ->
    $(this).next().click()

  $(".file-avatar").on "change", (input) ->
    evt = input.target
    if evt.files and evt.files[0]
      reader = new FileReader()
      reader.onload = (e) ->
        $(evt).prev().attr "src", e.target.result
        return

      reader.readAsDataURL evt.files[0]