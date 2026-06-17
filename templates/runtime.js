(function () {
  const exam = window.STUDI_EXAM
  const root = document.querySelector('[data-exam-root]')
  if (!exam || !root) return

  const state = {
    settings: {
      presentationMode: exam.settings.presentationMode || 'multi',
      totalMinutes: exam.settings.totalMinutes || 45,
      fontFamily: exam.settings.fontFamily || 'system',
      fontSize: exam.settings.fontSize || 17,
    },
    answers: {},
    activeQuestions: [],
    currentIndex: 0,
    elapsedSeconds: 0,
    timerId: null,
    runningSince: null,
    started: false,
  }

  const fontMap = {
    system: 'Inter, "Noto Sans JP", system-ui, sans-serif',
    serif: '"Noto Serif JP", "Yu Mincho", serif',
    mono: '"Roboto Mono", "SFMono-Regular", monospace',
  }

  const els = {
    presentationMode: root.querySelector('[data-setting="presentationMode"]'),
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
    els.presentationMode.value = state.settings.presentationMode
    els.totalMinutes.value = String(state.settings.totalMinutes)
    els.fontFamily.value = state.settings.fontFamily
    els.fontSize.value = String(state.settings.fontSize)
    els.fontSizeOutput.value = `${state.settings.fontSize}px`
    applyFontSettings()
    updateMetrics([])
  }

  function bindEvents() {
    els.presentationMode.addEventListener('change', () => {
      state.settings.presentationMode = els.presentationMode.value
      state.currentIndex = 0
      render()
    })
    els.totalMinutes.addEventListener('input', () => {
      state.settings.totalMinutes = Number(els.totalMinutes.value)
      updateMetrics(state.activeQuestions)
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

    root.querySelector('[data-action="start"]').addEventListener('click', startAttempt)
    root.querySelector('[data-action="pause"]').addEventListener('click', pauseTimer)
    root.querySelector('[data-action="reset"]').addEventListener('click', resetAttempt)
    root.querySelector('[data-action="previous"]').addEventListener('click', () => {
      state.currentIndex = Math.max(state.currentIndex - 1, 0)
      render()
    })
    root.querySelector('[data-action="next"]').addEventListener('click', () => {
      state.currentIndex = Math.min(state.currentIndex + 1, state.activeQuestions.length - 1)
      render()
    })
  }

  function startAttempt() {
    if (!state.started) {
      state.started = true
      state.answers = {}
      state.currentIndex = 0
      state.elapsedSeconds = 0
      state.activeQuestions = groupedRandomQuestions()
      render()
    }

    startTimer()
  }

  function resetAttempt() {
    if (state.timerId) window.clearInterval(state.timerId)
    state.started = false
    state.answers = {}
    state.activeQuestions = []
    state.currentIndex = 0
    state.elapsedSeconds = 0
    state.timerId = null
    state.runningSince = null
    render()
  }

  function startTimer() {
    if (state.timerId) return
    state.runningSince = Date.now()
    state.timerId = window.setInterval(() => {
      const activeElapsed = Math.floor((Date.now() - state.runningSince) / 1000)
      updateMetrics(state.activeQuestions, state.elapsedSeconds + activeElapsed)
    }, 500)
  }

  function pauseTimer() {
    if (!state.timerId) return
    state.elapsedSeconds += Math.floor((Date.now() - state.runningSince) / 1000)
    window.clearInterval(state.timerId)
    state.timerId = null
    state.runningSince = null
    updateMetrics(state.activeQuestions)
  }

  function render() {
    if (!state.started) {
      els.surface.replaceChildren(renderStartMessage())
      els.pager.hidden = true
      updateMetrics([])
      applyFontSettings()
      return
    }

    const shownQuestions =
      state.settings.presentationMode === 'single'
        ? state.activeQuestions.slice(state.currentIndex, state.currentIndex + 1)
        : state.activeQuestions

    els.surface.replaceChildren(...shownQuestions.map((question, index) => renderQuestion(question, index)))

    const singleMode = state.settings.presentationMode === 'single' && state.activeQuestions.length > 1
    els.pager.hidden = !singleMode
    if (singleMode) {
      els.pageStatus.textContent = `${state.currentIndex + 1} / ${state.activeQuestions.length}`
    }

    applyFontSettings()
    updateMetrics(state.activeQuestions)
  }

  function renderStartMessage() {
    const section = document.createElement('section')
    section.className = 'start-message'
    section.innerHTML = `
      <h2>開始を押すと問題が表示されます</h2>
      <p>問題は開始ごとにカテゴリ単位でまとまり、各カテゴリ内でランダムな順番になります。</p>
    `
    return section
  }

  function renderQuestion(question, localIndex) {
    const article = document.createElement('article')
    article.className = 'question-card'
    const displayIndex = state.settings.presentationMode === 'single' ? state.currentIndex + 1 : localIndex + 1
    const selected = state.answers[question.id] || []
    article.innerHTML = `
      <div class="question-meta">
        <span>問${displayIndex}</span>
        <span>分類: ${escapeHtml(question.category)}</span>
        <span>${escapeHtml(exam.patternLabels[question.pattern])}</span>
      </div>
      <h2>${escapeHtml(question.prompt)}</h2>
      <div class="choice-list"></div>
    `

    if (question.figure) {
      article.querySelector('h2').after(renderFigure(question.figure))
    } else if (question.visualHint) {
      const hint = document.createElement('div')
      hint.className = 'visual-hint'
      hint.textContent = question.visualHint
      article.querySelector('h2').after(hint)
    }

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
      feedback.textContent = `${correct ? '正解です。' : '選択を見直してください。'} ${question.explanation}`
      article.append(feedback)
    }

    return article
  }

  function renderFigure(figure) {
    const wrapper = document.createElement('figure')
    wrapper.className = 'question-figure'
    wrapper.innerHTML = `${figureSvg(figure)}<figcaption>${escapeHtml(figure.caption || figure.title || '問題図')}</figcaption>`
    return wrapper
  }

  function figureSvg(figure) {
    const title = escapeHtml(figure.title || '問題図')
    if (figure.kind === 'spectrum') {
      return `
        <svg viewBox="0 0 520 170" role="img" aria-label="${title}">
          <defs>
            <linearGradient id="saturationGradient" x1="0" x2="1">
              <stop offset="0%" stop-color="#d1d5db"/>
              <stop offset="50%" stop-color="#60a5fa"/>
              <stop offset="100%" stop-color="#1d4ed8"/>
            </linearGradient>
          </defs>
          <rect x="24" y="24" width="472" height="72" rx="12" fill="url(#saturationGradient)"/>
          <text x="24" y="132">低彩度</text>
          <text x="430" y="132">高彩度</text>
        </svg>
      `
    }

    if (figure.kind === 'notice') {
      return `
        <svg viewBox="0 0 520 190" role="img" aria-label="${title}">
          <rect x="150" y="24" width="220" height="112" rx="10" fill="#fff7ed" stroke="#b45309" stroke-width="4"/>
          <rect x="174" y="48" width="172" height="18" rx="4" fill="#b45309"/>
          <rect x="174" y="78" width="132" height="14" rx="4" fill="#d97706"/>
          <rect x="174" y="104" width="156" height="14" rx="4" fill="#d97706"/>
          <line x1="260" y1="136" x2="260" y2="172" stroke="#92400e" stroke-width="8"/>
          <text x="260" y="174" text-anchor="middle">標識例</text>
        </svg>
      `
    }

    return `
      <svg viewBox="0 0 520 190" role="img" aria-label="${title}">
        <g fill="#dbeafe" stroke="#2563eb" stroke-width="3">
          <rect x="38" y="54" width="64" height="52" rx="8"/>
          <rect x="118" y="54" width="64" height="52" rx="8"/>
          <rect x="198" y="54" width="64" height="52" rx="8" fill="#bfdbfe"/>
          <rect x="278" y="54" width="64" height="52" rx="8"/>
          <rect x="358" y="54" width="64" height="52" rx="8"/>
        </g>
        <path d="M230 128v34" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
        <path d="m212 146 18 18 18-18" fill="none" stroke="#b45309" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="230" y="34" text-anchor="middle">中央を確認</text>
      </svg>
    `
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

  function groupedRandomQuestions() {
    const categoryOrder = exam.categoryOrder || []
    const orderedCategories = [
      ...categoryOrder,
      ...exam.questions
        .map((question) => question.category)
        .filter((category) => !categoryOrder.includes(category)),
    ]

    return orderedCategories.flatMap((category) =>
      shuffle(exam.questions.filter((question) => question.category === category)),
    )
  }

  function shuffle(items) {
    const result = [...items]
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
    }
    return result
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
      secondsPerRemainingQuestion: unansweredCount === 0 ? 0 : remainingSeconds / unansweredCount,
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
