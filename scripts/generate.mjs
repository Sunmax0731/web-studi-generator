import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { questionPatternLabels, validateStudy } from './lib/schema.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const studiesDir = path.join(repoRoot, 'studies')
const templatesDir = path.join(repoRoot, 'templates')
const distDir = path.join(repoRoot, 'dist')

async function main() {
  const studies = await loadStudies()
  await rm(distDir, { recursive: true, force: true })
  await mkdir(path.join(distDir, 'assets'), { recursive: true })
  await cp(path.join(templatesDir, 'site.css'), path.join(distDir, 'assets', 'site.css'))
  await cp(path.join(templatesDir, 'runtime.js'), path.join(distDir, 'assets', 'runtime.js'))
  await cp(path.join(templatesDir, 'favicon.svg'), path.join(distDir, 'favicon.svg'))

  await writeFile(path.join(distDir, 'index.html'), renderIndex(studies))

  for (const study of studies) {
    const studyDir = path.join(distDir, 'studies', study.slug)
    await mkdir(path.join(studyDir, 'mock-test'), { recursive: true })
    await writeFile(path.join(studyDir, 'index.html'), renderStudyPage(study))
    await writeFile(path.join(studyDir, 'mock-test', 'index.html'), renderMockTestPage(study))
  }

  console.log(`Generated ${studies.length} studies into ${path.relative(repoRoot, distDir)}`)
}

async function loadStudies() {
  const registry = JSON.parse(await readFile(path.join(studiesDir, 'registry.json'), 'utf8'))
  const studies = []

  for (const entry of registry.studies) {
    const studyRoot = path.join(studiesDir, entry.id)
    const config = JSON.parse(await readFile(path.join(studyRoot, 'study.config.json'), 'utf8'))
    const units = JSON.parse(await readFile(path.join(studyRoot, 'data', 'units.json'), 'utf8'))
    const questions = JSON.parse(await readFile(path.join(studyRoot, 'data', 'questions.json'), 'utf8'))
    const study = { ...config, units, questions }
    const errors = validateStudy(study, entry.id)
    if (errors.length > 0) {
      throw new Error(errors.join('\n'))
    }
    studies.push(study)
  }

  return studies
}

function renderIndex(studies) {
  const cards = studies
    .map(
      (study) => `
        <article class="study-card">
          <div class="accent" style="--accent:${escapeAttribute(study.accent)}"></div>
          <div>
            <h2><a href="./studies/${escapeAttribute(study.slug)}/">${escapeHtml(study.title)}</a></h2>
            <p>${escapeHtml(study.description)}</p>
            <div class="tag-row">${study.categories.map((category) => `<span>${escapeHtml(category)}</span>`).join('')}</div>
          </div>
        </article>`,
    )
    .join('')

  return pageShell({
    title: '資格試験学習ページ',
    bodyClass: 'home',
    assetPrefix: '.',
    homeHref: './',
    main: `
      <section class="hero-band">
        <h1>資格試験学習ページ</h1>
      </section>
      <section class="study-grid" aria-label="生成済み学習サイト">
        ${cards}
      </section>`,
  })
}

function renderStudyPage(study) {
  const units = study.units
    .map(
      (unit) => `
        <article class="unit-block">
          <div>
            <h2>${escapeHtml(unit.title)}</h2>
            <p>${escapeHtml(unit.objective)}</p>
            <ul>${unit.outline.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </div>
        </article>`,
    )
    .join('')
  const sources = study.sources
    .map(
      (source) => `
        <li>
          <span>${escapeHtml(source.kind)}</span>
          ${source.url ? `<a href="${escapeAttribute(source.url)}">${escapeHtml(source.label)}</a>` : `<strong>${escapeHtml(source.label)}</strong>`}
          ${source.path ? `<code>${escapeHtml(source.path)}</code>` : ''}
        </li>`,
    )
    .join('')

  return pageShell({
    title: study.title,
    bodyClass: 'study',
    assetPrefix: '../..',
    homeHref: '../../',
    main: `
      ${studyHeader(study)}
      <section class="action-row">
        <a class="button primary" href="./mock-test/">模擬テストを開始</a>
        <a class="button" href="../../">サイト一覧へ戻る</a>
      </section>
      <section class="layout-two">
        <div>
          <h2>学習単元</h2>
          <div class="unit-list">${units}</div>
        </div>
        <aside class="source-panel">
          <h2>資料と URL</h2>
          <p>Codex セッションでは、この一覧にローカル資料とチャットで渡された URL を追記し、生成データを更新します。</p>
          <ul>${sources}</ul>
        </aside>
      </section>`,
  })
}

function renderMockTestPage(study) {
  const categoryOrder = JSON.stringify(study.categories)
  const questions = JSON.stringify(study.questions)
  const settings = JSON.stringify(study.examSettings)

  return pageShell({
    title: `${study.title} 模擬テスト`,
    bodyClass: 'mock-test',
    assetPrefix: '../../..',
    homeHref: '../../../',
    main: `
      ${studyHeader(study)}
      <section class="action-row">
        <a class="button" href="../">学習ページへ戻る</a>
      </section>
      <section class="exam-app" data-exam-root>
        <aside class="settings-panel" aria-label="模擬テスト設定">
          <h2>表示と時間の設定</h2>
          <label>表示方法
            <select data-setting="presentationMode">
              <option value="multi">1ページに複数問</option>
              <option value="single">1ページに1問</option>
            </select>
          </label>
          <label>全体の解答時間（分）
            <input data-setting="totalMinutes" type="number" min="5" max="240" step="5" />
          </label>
          <label>フォント
            <select data-setting="fontFamily">
              <option value="system">System UI</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </label>
          <label>フォントサイズ <output data-font-size-output></output>
            <input data-setting="fontSize" type="range" min="14" max="24" />
          </label>
          <div class="timer-buttons">
            <button type="button" data-action="start">開始</button>
            <button type="button" data-action="pause">一時停止</button>
            <button type="button" data-action="reset">リセット</button>
          </div>
        </aside>
        <section class="exam-workspace">
          <div class="metric-grid" aria-label="解答状況">
            <div><span>全体の解答時間</span><strong data-metric="elapsed">0:00</strong></div>
            <div><span>平均回答時間</span><strong data-metric="average">0:00</strong></div>
            <div><span>残りの解答時間</span><strong data-metric="remaining">0:00</strong></div>
            <div><span>残問 / 1問あたり</span><strong data-metric="pace">0問 / 0:00</strong></div>
          </div>
          <div class="question-surface" data-question-surface></div>
          <div class="pager" data-pager hidden>
            <button type="button" data-action="previous">前の問題</button>
            <span data-page-status></span>
            <button type="button" data-action="next">次の問題</button>
          </div>
        </section>
      </section>
      <script>
        window.STUDI_EXAM = {
          categoryOrder: ${categoryOrder},
          questions: ${questions},
          settings: ${settings},
          patternLabels: ${JSON.stringify(questionPatternLabels)}
        };
      </script>
      <script src="../../../assets/runtime.js"></script>`,
  })
}

function studyHeader(study) {
  return `
    <header class="study-header" style="--accent:${escapeAttribute(study.accent)}">
      <p class="label">Generated Study Site</p>
      <h1>${escapeHtml(study.title)}</h1>
      <p>${escapeHtml(study.description)}</p>
      <div class="tag-row">${study.categories.map((category) => `<span>${escapeHtml(category)}</span>`).join('')}</div>
    </header>`
}

function pageShell({ title, bodyClass, assetPrefix, homeHref, main }) {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Codex で生成する静的学習ページと模擬テスト" />
    <link rel="icon" href="${assetPrefix}/favicon.svg" />
    <link rel="stylesheet" href="${assetPrefix}/assets/site.css" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body class="${escapeAttribute(bodyClass)}">
    <header class="site-top">
      <a class="brand" href="${homeHref}"><span>SG</span> Studi Generator</a>
    </header>
    <main>${main}</main>
  </body>
</html>
`
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#96;')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
