import {
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  PanelTop,
  Settings2,
  Sparkles,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import { questionPatternLabels, studyThemes } from './data/themes'
import {
  calculateExamStats,
  filterQuestionsByCategory,
  formatDuration,
  isAnswerCorrect,
} from './lib/examMetrics'
import type { ExamSettings, StudyQuestion, StudyTheme } from './types'

const defaultSettings: ExamSettings = {
  presentationMode: 'multi',
  totalMinutes: 45,
  fontFamily: 'system',
  fontSize: 17,
  categoryFilter: 'すべて',
}

const fontFamilyOptions = [
  { value: 'system', label: 'System UI', css: 'Inter, "Noto Sans JP", system-ui, sans-serif' },
  { value: 'serif', label: 'Serif', css: '"Noto Serif JP", "Yu Mincho", serif' },
  { value: 'mono', label: 'Mono', css: '"Roboto Mono", "SFMono-Regular", monospace' },
]

function App() {
  const [activeThemeId, setActiveThemeId] = useState(studyThemes[0].id)
  const [settings, setSettings] = useState<ExamSettings>(defaultSettings)
  const [elapsedSeconds, setElapsedSeconds] = useState(9 * 60 + 30)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({
    'fe-q1': ['a'],
    'fe-q2': ['a'],
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const activeTheme = studyThemes.find((theme) => theme.id === activeThemeId) ?? studyThemes[0]
  const categories = ['すべて', ...activeTheme.categories]
  const visibleQuestions = useMemo(
    () => filterQuestionsByCategory(activeTheme.questions, settings.categoryFilter),
    [activeTheme.questions, settings.categoryFilter],
  )
  const safeQuestionIndex = Math.min(currentQuestionIndex, Math.max(visibleQuestions.length - 1, 0))
  const shownQuestions =
    settings.presentationMode === 'single'
      ? visibleQuestions.slice(safeQuestionIndex, safeQuestionIndex + 1)
      : visibleQuestions
  const answeredCount = visibleQuestions.filter((question) => selectedAnswers[question.id]?.length).length
  const stats = calculateExamStats({
    answeredCount,
    elapsedSeconds,
    totalMinutes: settings.totalMinutes,
    totalQuestions: visibleQuestions.length,
  })
  const selectedFont = fontFamilyOptions.find((font) => font.value === settings.fontFamily)

  const updateTheme = (theme: StudyTheme) => {
    setActiveThemeId(theme.id)
    setSettings((current) => ({ ...current, categoryFilter: 'すべて' }))
    setCurrentQuestionIndex(0)
  }

  const updateAnswer = (question: StudyQuestion, choiceId: string) => {
    setSelectedAnswers((current) => {
      const previous = current[question.id] ?? []
      const allowsMultiple = question.pattern === 'multiple-select'
      const next = allowsMultiple
        ? previous.includes(choiceId)
          ? previous.filter((id) => id !== choiceId)
          : [...previous, choiceId]
        : [choiceId]

      return { ...current, [question.id]: next }
    })
  }

  return (
    <main className="app-shell">
      <aside className="project-rail" aria-label="テーマ一覧">
        <div className="brand">
          <div className="brand-mark">SG</div>
          <div>
            <h1>Studi Generator</h1>
            <p>学習ページ生成基盤</p>
          </div>
        </div>

        <nav className="theme-list">
          {studyThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={theme.id === activeThemeId ? 'theme-button active' : 'theme-button'}
              onClick={() => updateTheme(theme)}
            >
              <span className="theme-accent" style={{ background: theme.accent }} />
              <span>
                <strong>{theme.title}</strong>
                <small>{theme.categories.join(' / ')}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="rail-note">
          <Sparkles size={18} />
          <p>資料 URL、PDF、ノートを Codex が読み取り、学習単元と模擬テストに変換する前提の土台です。</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="overline">Generator Workspace</p>
            <h2>{activeTheme.title}</h2>
          </div>
          <div className="topbar-actions">
            <button type="button" className="ghost-button">
              <FileText size={18} />
              資料を追加
            </button>
            <button type="button" className="primary-button">
              <Sparkles size={18} />
              ページ構成を生成
            </button>
          </div>
        </header>

        <div className="content-grid">
          <section className="main-column" aria-label="学習ページ生成設定">
            <GeneratorBlueprint theme={activeTheme} />
            <QuestionPatternMatrix />
            <StudyOutline theme={activeTheme} />
          </section>

          <aside className="preview-column" aria-label="模擬テストプレビュー">
            <ExamSettingsPanel
              categories={categories}
              settings={settings}
              setSettings={(next) => {
                setSettings(next)
                setCurrentQuestionIndex(0)
              }}
            />

            <section className="metrics-grid" aria-label="解答状況">
              <MetricCard icon={<Clock3 size={18} />} label="全体の解答時間" value={formatDuration(elapsedSeconds)} />
              <MetricCard label="平均回答時間" value={formatDuration(stats.averageAnswerSeconds)} />
              <MetricCard label="残りの解答時間" value={formatDuration(stats.remainingSeconds)} />
              <MetricCard
                label="残問 / 1問あたり"
                value={`${stats.unansweredCount}問 / ${formatDuration(stats.secondsPerRemainingQuestion)}`}
              />
            </section>

            <div className="timer-controls">
              <button type="button" onClick={() => setElapsedSeconds((seconds) => Math.max(seconds - 60, 0))}>
                -1分
              </button>
              <button type="button" onClick={() => setElapsedSeconds((seconds) => seconds + 60)}>
                +1分
              </button>
            </div>

            <section
              className="exam-preview"
              style={{
                fontFamily: selectedFont?.css,
                fontSize: `${settings.fontSize}px`,
              }}
            >
              <div className="section-heading">
                <div>
                  <p className="overline">Live Preview</p>
                  <h3>模擬テスト</h3>
                </div>
                <span>{settings.presentationMode === 'single' ? '1ページ1問' : '1ページ複数問'}</span>
              </div>

              {shownQuestions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  displayIndex={settings.presentationMode === 'single' ? safeQuestionIndex + 1 : index + 1}
                  selectedChoiceIds={selectedAnswers[question.id] ?? []}
                  onSelect={(choiceId) => updateAnswer(question, choiceId)}
                />
              ))}

              {settings.presentationMode === 'single' && visibleQuestions.length > 1 ? (
                <div className="pager">
                  <button
                    type="button"
                    disabled={safeQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((index) => Math.max(index - 1, 0))}
                  >
                    前の問題
                  </button>
                  <span>
                    {safeQuestionIndex + 1} / {visibleQuestions.length}
                  </span>
                  <button
                    type="button"
                    disabled={safeQuestionIndex >= visibleQuestions.length - 1}
                    onClick={() =>
                      setCurrentQuestionIndex((index) => Math.min(index + 1, visibleQuestions.length - 1))
                    }
                  >
                    次の問題
                  </button>
                </div>
              ) : null}
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}

function GeneratorBlueprint({ theme }: { theme: StudyTheme }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="overline">Blueprint</p>
          <h3>学習ページ生成フロー</h3>
        </div>
        <span>{theme.sources.length} sources</span>
      </div>
      <div className="pipeline">
        {[
          ['資料収集', 'URL / PDF / ノートを登録'],
          ['Codex 抽出', '要点、語句、図示候補を構造化'],
          ['設問化', 'カテゴリ別に 6 パターンへ変換'],
          ['公開前レビュー', '解説と正答を人が確認'],
        ].map(([title, detail]) => (
          <div className="pipeline-step" key={title}>
            <CheckCircle2 size={18} />
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
      <div className="source-list">
        {theme.sources.map((source) => (
          <div className="source-row" key={source.id}>
            <span>{source.kind.toUpperCase()}</span>
            <strong>{source.label}</strong>
            <em>{source.status}</em>
          </div>
        ))}
      </div>
    </section>
  )
}

function QuestionPatternMatrix() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="overline">Mock Test Schema</p>
          <h3>対応する設問提示パターン</h3>
        </div>
        <Layers3 size={20} />
      </div>
      <div className="pattern-grid">
        {Object.values(questionPatternLabels).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  )
}

function StudyOutline({ theme }: { theme: StudyTheme }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="overline">Study Page</p>
          <h3>生成される学習単元</h3>
        </div>
        <BookOpenCheck size={20} />
      </div>
      <div className="unit-list">
        {theme.units.map((unit) => (
          <article key={unit.id} className="unit-row">
            <span>{unit.category}</span>
            <div>
              <h4>{unit.title}</h4>
              <p>{unit.objective}</p>
              <ul>
                {unit.generatedOutline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExamSettingsPanel({
  categories,
  settings,
  setSettings,
}: {
  categories: string[]
  settings: ExamSettings
  setSettings: (settings: ExamSettings) => void
}) {
  return (
    <section className="panel settings-panel">
      <div className="section-heading">
        <div>
          <p className="overline">Runtime Settings</p>
          <h3>表示と時間</h3>
        </div>
        <Settings2 size={20} />
      </div>

      <label>
        表示方法
        <div className="segmented">
          <button
            type="button"
            className={settings.presentationMode === 'multi' ? 'selected' : ''}
            onClick={() => setSettings({ ...settings, presentationMode: 'multi' })}
          >
            複数問
          </button>
          <button
            type="button"
            className={settings.presentationMode === 'single' ? 'selected' : ''}
            onClick={() => setSettings({ ...settings, presentationMode: 'single' })}
          >
            1問
          </button>
        </div>
      </label>

      <label>
        カテゴリ
        <select
          value={settings.categoryFilter}
          onChange={(event) => setSettings({ ...settings, categoryFilter: event.currentTarget.value })}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>

      <label>
        全体の解答時間（分）
        <input
          type="number"
          min="5"
          max="180"
          value={settings.totalMinutes}
          onChange={(event) => setSettings({ ...settings, totalMinutes: Number(event.currentTarget.value) })}
        />
      </label>

      <label>
        フォント
        <select
          value={settings.fontFamily}
          onChange={(event) => setSettings({ ...settings, fontFamily: event.currentTarget.value })}
        >
          {fontFamilyOptions.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        フォントサイズ {settings.fontSize}px
        <input
          type="range"
          min="14"
          max="22"
          value={settings.fontSize}
          onChange={(event) => setSettings({ ...settings, fontSize: Number(event.currentTarget.value) })}
        />
      </label>
    </section>
  )
}

function MetricCard({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{icon ?? <PanelTop size={18} />}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function QuestionCard({
  question,
  displayIndex,
  selectedChoiceIds,
  onSelect,
}: {
  question: StudyQuestion
  displayIndex: number
  selectedChoiceIds: string[]
  onSelect: (choiceId: string) => void
}) {
  const answered = selectedChoiceIds.length > 0
  const correct = answered && isAnswerCorrect(question, selectedChoiceIds)

  return (
    <article className="question-card">
      <div className="question-meta">
        <span>問{displayIndex}</span>
        <span>{question.category}</span>
        <span>{questionPatternLabels[question.pattern]}</span>
      </div>
      <p className="question-prompt">{question.prompt}</p>
      {question.visualHint ? <div className="visual-hint">{question.visualHint}</div> : null}
      <div className="choice-list">
        {question.choices.map((choice) => (
          <button
            type="button"
            key={choice.id}
            className={selectedChoiceIds.includes(choice.id) ? 'choice selected' : 'choice'}
            onClick={() => onSelect(choice.id)}
          >
            <span>{choice.id.toUpperCase()}</span>
            {choice.label}
          </button>
        ))}
      </div>
      {answered ? (
        <div className={correct ? 'answer-result correct' : 'answer-result'}>
          {correct ? '正答です。' : '選択を見直してください。'} {question.explanation}
        </div>
      ) : null}
    </article>
  )
}

export default App
