# ProgressBar class
class ProgressBar
  constructor : (@progress_bar, @max) ->
    @update
  # progress
  compute_and_set : (val) ->
    percent = (val*100)/@max
    console.log val+" / "+@max
    $(@progress_bar+"-meter").width(percent+'%')
    $(@progress_bar+"-meter-text").text(parseInt(percent)+'%')
    if percent >= 100
      clearInterval(@update)

module.exports = ProgressBar
