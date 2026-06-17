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
    if (study.examVariants?.length) {
      const variants = buildExamVariants(study)
      await writeFile(path.join(studyDir, 'mock-test', 'index.html'), renderMockTestLandingPage(study, variants))
      for (const variant of variants) {
        await mkdir(path.join(studyDir, 'mock-test', variant.id), { recursive: true })
        await writeFile(
          path.join(studyDir, 'mock-test', variant.id, 'index.html'),
          renderMockTestPage(study, variant, {
            assetPrefix: '../../../..',
            homeHref: '../../../../',
            studyHref: '../../',
          }),
        )
      }
    } else {
      await writeFile(
        path.join(studyDir, 'mock-test', 'index.html'),
        renderMockTestPage(study, buildDefaultVariant(study), {
          assetPrefix: '../../..',
          homeHref: '../../../',
          studyHref: '../',
        }),
      )
    }
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
  const units = renderUnitSections(study)
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

  const examActions = renderExamActions(study)

  return pageShell({
    title: study.title,
    bodyClass: 'study',
    assetPrefix: '../..',
    homeHref: '../../',
    main: `
      ${studyHeader(study)}
      ${examActions}
      <section class="layout-two">
        <div>
          <h2>学習単元</h2>
          <div class="unit-list">${units}</div>
        </div>
        <aside class="source-panel">
          <h2>資料と URL</h2>
          <p>Codex セッションで参照したローカル資料とチャットで渡された URL を記録しています。</p>
          <ul>${sources}</ul>
        </aside>
      </section>`,
  })
}

function renderUnitSections(study) {
  const renderUnit = (unit) => `
    <article class="unit-block">
      <div>
        <h2>${escapeHtml(unit.title)}</h2>
        <p>${escapeHtml(unit.objective)}</p>
        <ul>${unit.outline.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    </article>`

  const unitsHaveExamScope = study.examVariants?.length && study.units.some((unit) => getExamIds(unit).length > 0)
  if (!unitsHaveExamScope) {
    return study.units.map(renderUnit).join('')
  }

  return study.examVariants
    .map((variant) => {
      const variantUnits = study.units.filter((unit) => getExamIds(unit).includes(variant.id))
      if (variantUnits.length === 0) return ''
      return `
        <section class="unit-group">
          <header>
            <h3>${escapeHtml(variant.title)}</h3>
            <p>${escapeHtml(variant.description || `${variant.totalMinutes}分 / ${variant.questionCount}問`)}</p>
          </header>
          ${variantUnits.map(renderUnit).join('')}
        </section>`
    })
    .join('')
}

function renderExamActions(study) {
  if (study.examVariants?.length) {
    const cards = buildExamVariants(study)
      .map(
        (variant) => `
          <article class="exam-choice">
            <div>
              <h2>${escapeHtml(variant.title)}</h2>
              <p>${escapeHtml(variant.description || `${variant.totalMinutes}分 / ${variant.questionCount}問`)}</p>
            </div>
            <a class="button primary" href="./mock-test/${escapeAttribute(variant.id)}/">開始</a>
          </article>`,
      )
      .join('')
    return `
      <section class="action-row">
        <a class="button" href="../../">サイト一覧へ戻る</a>
      </section>
      <section class="exam-choice-grid" aria-label="模擬試験を選択">
        ${cards}
      </section>`
  }

  return `
    <section class="action-row">
      <a class="button primary" href="./mock-test/">模擬テストを開始</a>
      <a class="button" href="../../">サイト一覧へ戻る</a>
    </section>`
}

function renderMockTestLandingPage(study, variants) {
  const cards = variants
    .map(
      (variant) => `
        <article class="exam-choice">
          <div>
            <h2>${escapeHtml(variant.title)}</h2>
            <p>${escapeHtml(variant.description || `${variant.totalMinutes}分 / ${variant.questionCount}問`)}</p>
          </div>
          <a class="button primary" href="./${escapeAttribute(variant.id)}/">開始</a>
        </article>`,
    )
    .join('')

  return pageShell({
    title: `${study.title} 模擬テスト`,
    bodyClass: 'study',
    assetPrefix: '../../..',
    homeHref: '../../../',
    main: `
      ${studyHeader(study)}
      <section class="action-row">
        <a class="button" href="../">学習ページへ戻る</a>
      </section>
      <section class="exam-choice-grid" aria-label="模擬試験を選択">
        ${cards}
      </section>`,
  })
}

function renderMockTestPage(study, variant, links) {
  const categoryOrder = JSON.stringify(variant.categoryOrder)
  const questions = JSON.stringify(variant.questions)
  const settings = JSON.stringify(variant.settings)

  return pageShell({
    title: `${study.title} ${variant.title}`,
    bodyClass: 'mock-test',
    assetPrefix: links.assetPrefix,
    homeHref: links.homeHref,
    main: `
      ${studyHeader(study)}
      <section class="exam-title">
        <p>${escapeHtml(variant.description || `${variant.totalMinutes}分 / ${variant.questionCount}問`)}</p>
        <h2>${escapeHtml(variant.title)}</h2>
      </section>
      <section class="action-row">
        <a class="button" href="${links.studyHref}">学習ページへ戻る</a>
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
      <script src="${links.assetPrefix}/assets/runtime.js"></script>`,
  })
}

function buildExamVariants(study) {
  return study.examVariants.map((variant) => {
    const questions = study.questions.filter((question) => questionMatchesVariant(question, variant.id))
    const categoryOrder = (variant.categoryOrder || study.categories).filter((category) =>
      questions.some((question) => question.category === category),
    )
    return {
      ...variant,
      questions,
      categoryOrder,
      settings: {
        ...study.examSettings,
        presentationMode: variant.presentationMode || study.examSettings.presentationMode,
        totalMinutes: variant.totalMinutes,
      },
    }
  })
}

function buildDefaultVariant(study) {
  return {
    id: 'default',
    title: '模擬テスト',
    totalMinutes: study.examSettings.totalMinutes,
    questionCount: study.questions.length,
    questions: study.questions,
    categoryOrder: study.categories,
    settings: study.examSettings,
  }
}

function questionMatchesVariant(question, variantId) {
  if (Array.isArray(question.examIds)) return question.examIds.includes(variantId)
  return question.examId === variantId
}

function getExamIds(item) {
  if (Array.isArray(item.examIds)) return item.examIds
  if (item.examId) return [item.examId]
  return []
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
    <meta name="description" content="Codexで生成する静的学習ページと模擬テスト" />
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
