(function () {
  const exam = window.STUDI_EXAM
  const root = document.querySelector('[data-exam-root]')
  if (!exam || !root) return

  const state = {
    settings: {
      presentationMode: exam.settings.presentationMode || 'multi',
      category: 'すべて',
      totalMinutes: exam.settings.totalMinutes || 45,
      fontFamily: exam.settings.fontFamily || 'system',
      fontSize: exam.settings.fontSize || 17,
    },
    answers: {},
    currentIndex: 0,
    elapsedSeconds: 0,
    timerId: null,
    runningSince: null,
  }

  const fontMap = {
    system: 'Inter, "Noto Sans JP", system-ui, sans-serif',
    serif: '"Noto Serif JP", "Yu Mincho", serif',
    mono: '"Roboto Mono", "SFMono-Regular", monospace',
  }

  const els = {
    presentationMode: root.querySelector('[data-setting="presentationMode"]'),
    category: root.querySelector('[data-setting="category"]'),
    totalMinutes: root.querySelector('[data-setting="totalMinutes"]'),
    fontFamily: root.querySelector('[data-setting="fontFamily"]'),
    fontSize: root.querySelector('[data-setting="fontSize"]'),
    fontSizeOutput: root.querySelector('[data-font-size-output]'),
    surface: root.querySelector('[data-question-surface]'),
    pager: root.querySelector('[data-pager]'),
    pageStatus: root.querySelector('[data-page-status]'),
    elapsed: root.querySelector('[data-metric="elapsed"]'),
    average: root.querySelector('[data-metric="average"]'),
    remaining: root.querySelector('[data-metric="remaining"]'),
    pace: root.querySelector('[data-metric="pace"]'),
  }

  initialiseControls()
  bindEvents()
  render()

  function initialiseControls() {
    for (const category of exam.categories) {
      const option = document.createElement('option')
      option.value = category
      option.textContent = category
      els.category.append(option)
    }

    els.presentationMode.value = state.settings.presentationMode
    els.category.value = state.settings.category
    els.totalMinutes.value = String(state.settings.totalMinutes)
    els.fontFamily.value = state.settings.fontFamily
    els.fontSize.value = String(state.settings.fontSize)
    els.fontSizeOutput.value = `${state.settings.fontSize}px`
  }

  function bindEvents() {
    els.presentationMode.addEventListener('change', () => {
      state.settings.presentationMode = els.presentationMode.value
      state.currentIndex = 0
      render()
    })
    els.category.addEventListener('change', () => {
      state.settings.category = els.category.value
      state.currentIndex = 0
      render()
    })
    els.totalMinutes.addEventListener('input', () => {
      state.settings.totalMinutes = Number(els.totalMinutes.value)
      updateMetrics(filteredQuestions())
    })
    els.fontFamily.addEventListener('change', () => {
      state.settings.fontFamily = els.fontFamily.value
      applyFontSettings()
    })
    els.fontSize.addEventListener('input', () => {
      state.settings.fontSize = Number(els.fontSize.value)
      els.fontSizeOutput.value = `${state.settings.fontSize}px`
      applyFontSettings()
    })

    root.querySelector('[data-action="start"]').addEventListener('click', startTimer)
    root.querySelector('[data-action="pause"]').addEventListener('click', pauseTimer)
    root.querySelector('[data-action="reset"]').addEventListener('click', resetTimer)
    root.querySelector('[data-action="previous"]').addEventListener('click', () => {
      state.currentIndex = Math.max(state.currentIndex - 1, 0)
      render()
    })
    root.querySelector('[data-action="next"]').addEventListener('click', () => {
      state.currentIndex = Math.min(state.currentIndex + 1, filteredQuestions().length - 1)
      render()
    })
  }

  function startTimer() {
    if (state.timerId) return
    state.runningSince = Date.now()
    state.timerId = window.setInterval(() => {
      const activeElapsed = Math.floor((Date.now() - state.runningSince) / 1000)
      updateMetrics(filteredQuestions(), state.elapsedSeconds + activeElapsed)
    }, 500)
  }

  function pauseTimer() {
    if (!state.timerId) return
    state.elapsedSeconds += Math.floor((Date.now() - state.runningSince) / 1000)
    window.clearInterval(state.timerId)
    state.timerId = null
    state.runningSince = null
    updateMetrics(filteredQuestions())
  }

  function resetTimer() {
    if (state.timerId) window.clearInterval(state.timerId)
    state.elapsedSeconds = 0
    state.timerId = null
    state.runningSince = null
    updateMetrics(filteredQuestions())
  }

  function render() {
    const questions = filteredQuestions()
    const shownQuestions =
      state.settings.presentationMode === 'single'
        ? questions.slice(state.currentIndex, state.currentIndex + 1)
        : questions

    els.surface.replaceChildren(...shownQuestions.map((question, index) => renderQuestion(question, index)))

    const singleMode = state.settings.presentationMode === 'single' && questions.length > 1
    els.pager.hidden = !singleMode
    if (singleMode) {
      els.pageStatus.textContent = `${state.currentIndex + 1} / ${questions.length}`
    }

    applyFontSettings()
    updateMetrics(questions)
  }

  function renderQuestion(question, localIndex) {
    const article = document.createElement('article')
    article.className = 'question-card'
    const displayIndex =
      state.settings.presentationMode === 'single' ? state.currentIndex + 1 : localIndex + 1
    const selected = state.answers[question.id] || []
    article.innerHTML = `
      <div class="question-meta">
        <span>問${displayIndex}</span>
        <span>${escapeHtml(question.category)}</span>
        <span>${escapeHtml(exam.patternLabels[question.pattern])}</span>
      </div>
      <h2>${escapeHtml(question.prompt)}</h2>
      ${question.visualHint ? `<div class="visual-hint">${escapeHtml(question.visualHint)}</div>` : ''}
      <div class="choice-list"></div>
    `

    const choiceList = article.querySelector('.choice-list')
    for (const choice of question.choices) {
      const button = document.createElement('button')
      button.type = 'button'
      button.setAttribute('aria-pressed', selected.includes(choice.id) ? 'true' : 'false')
      button.innerHTML = `<b>${escapeHtml(choice.id.toUpperCase())}</b><span>${escapeHtml(choice.label)}</span>`
      button.addEventListener('click', () => selectChoice(question, choice.id))
      choiceList.append(button)
    }

    if (selected.length > 0) {
      const feedback = document.createElement('div')
      const correct = isAnswerCorrect(question, selected)
      feedback.className = correct ? 'answer-feedback correct' : 'answer-feedback'
      feedback.textContent = `${correct ? '正答です。' : '選択を見直してください。'} ${question.explanation}`
      article.append(feedback)
    }

    return article
  }

  function selectChoice(question, choiceId) {
    const previous = state.answers[question.id] || []
    const next =
      question.pattern === 'multiple-select'
        ? previous.includes(choiceId)
          ? previous.filter((id) => id !== choiceId)
          : [...previous, choiceId]
        : [choiceId]
    state.answers[question.id] = next
    render()
  }

  function filteredQuestions() {
    if (state.settings.category === 'すべて') return exam.questions
    return exam.questions.filter((question) => question.category === state.settings.category)
  }

  function updateMetrics(questions, liveElapsed = state.elapsedSeconds) {
    const answeredCount = questions.filter((question) => (state.answers[question.id] || []).length > 0).length
    const stats = calculateExamStats({
      answeredCount,
      elapsedSeconds: liveElapsed,
      totalQuestions: questions.length,
      totalMinutes: state.settings.totalMinutes,
    })
    els.elapsed.textContent = formatDuration(liveElapsed)
    els.average.textContent = formatDuration(stats.averageAnswerSeconds)
    els.remaining.textContent = formatDuration(stats.remainingSeconds)
    els.pace.textContent = `${stats.unansweredCount}問 / ${formatDuration(stats.secondsPerRemainingQuestion)}`
  }

  function applyFontSettings() {
    document.documentElement.style.setProperty(
      '--exam-font-family',
      fontMap[state.settings.fontFamily] || fontMap.system,
    )
    document.documentElement.style.setProperty('--exam-font-size', `${state.settings.fontSize}px`)
  }

  function calculateExamStats(progress) {
    const totalSeconds = Math.max(Number(progress.totalMinutes) || 0, 0) * 60
    const elapsedSeconds = Math.max(Number(progress.elapsedSeconds) || 0, 0)
    const answeredCount = Math.max(Number(progress.answeredCount) || 0, 0)
    const totalQuestions = Math.max(Number(progress.totalQuestions) || 0, 0)
    const unansweredCount = Math.max(totalQuestions - answeredCount, 0)
    const remainingSeconds = Math.max(totalSeconds - elapsedSeconds, 0)

    return {
      averageAnswerSeconds: answeredCount === 0 ? 0 : elapsedSeconds / answeredCount,
      remainingSeconds,
      unansweredCount,
      secondsPerRemainingQuestion:
        unansweredCount === 0 ? 0 : remainingSeconds / unansweredCount,
    }
  }

  function formatDuration(seconds) {
    const safeSeconds = Math.max(Math.round(Number(seconds) || 0), 0)
    const minutes = Math.floor(safeSeconds / 60)
    const restSeconds = safeSeconds % 60
    return `${minutes}:${restSeconds.toString().padStart(2, '0')}`
  }

  function isAnswerCorrect(question, selectedChoiceIds) {
    const expected = [...question.correctChoiceIds].sort()
    const actual = [...selectedChoiceIds].sort()
    return expected.length === actual.length && expected.every((id, index) => id === actual[index])
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
  }
})()
