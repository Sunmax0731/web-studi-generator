import type { QuestionPattern, StudyTheme } from '../types'

export const questionPatternLabels: Record<QuestionPattern, string> = {
  'single-choice': '択一式',
  cloze: '空欄補充形式',
  'multiple-select': '複数選択式',
  matching: '組み合わせ問題',
  counting: '個数問題',
  'true-false': '正誤方式',
}

export const studyThemes: StudyTheme[] = [
  {
    id: 'fe-exam',
    title: '基本情報技術者試験',
    description:
      'テクノロジ、マネジメント、ストラテジをカテゴリ単位で整理し、午前形式の確認問題と午後対策の読解導線を作る。',
    audience: 'IT 基礎を体系化したい初学者、試験直前にカテゴリ別で弱点を見たい受験者',
    accent: '#2563eb',
    categories: ['テクノロジ', 'マネジメント', 'ストラテジ'],
    sources: [
      { id: 'fe-source-1', kind: 'web', label: '公開シラバス URL', status: 'planned' },
      { id: 'fe-source-2', kind: 'manual', label: '過去問解説メモ', status: 'parsed' },
    ],
    units: [
      {
        id: 'fe-unit-1',
        title: 'アルゴリズムとデータ構造',
        category: 'テクノロジ',
        objective: '計算量、探索、整列、基本データ構造を問題文から判定できる。',
        generatedOutline: ['配列・リスト・木構造', '探索と整列の計算量', '疑似言語の読み取り'],
      },
      {
        id: 'fe-unit-2',
        title: 'プロジェクト管理',
        category: 'マネジメント',
        objective: '進捗、品質、リスクの用語を状況文と結び付けられる。',
        generatedOutline: ['WBS と見積り', '品質管理指標', 'リスク対応'],
      },
      {
        id: 'fe-unit-3',
        title: '経営戦略と法務',
        category: 'ストラテジ',
        objective: '経営分析、知的財産、セキュリティ関連法規の典型論点を識別する。',
        generatedOutline: ['SWOT と PPM', '知的財産権', '個人情報保護'],
      },
    ],
    questions: [
      {
        id: 'fe-q1',
        category: 'テクノロジ',
        pattern: 'single-choice',
        prompt: '二分探索の前提として最も適切なものはどれか。',
        visualHint: '整列済み配列を中央から半分ずつ探索する図を添付可能',
        choices: [
          { id: 'a', label: '対象データがキー順に整列されている' },
          { id: 'b', label: '対象データがハッシュ化されている' },
          { id: 'c', label: '対象データが木構造で保存されている' },
          { id: 'd', label: '対象データが更新されない' },
        ],
        correctChoiceIds: ['a'],
        explanation: '二分探索は整列済みデータを前提に探索範囲を半分に絞る。',
      },
      {
        id: 'fe-q2',
        category: 'マネジメント',
        pattern: 'cloze',
        prompt: 'WBS はプロジェクトの成果物や作業を（　）して管理しやすくする手法である。',
        choices: [
          { id: 'a', label: '階層的に分解' },
          { id: 'b', label: '時系列に暗号化' },
          { id: 'c', label: '担当者別に秘匿' },
          { id: 'd', label: '費用だけで評価' },
        ],
        correctChoiceIds: ['a'],
        explanation: 'WBS は Work Breakdown Structure の略で、作業を階層的に分解する。',
      },
      {
        id: 'fe-q3',
        category: 'ストラテジ',
        pattern: 'matching',
        prompt: 'SWOT 分析の組み合わせとして適切なものを選べ。',
        choices: [
          { id: 'a', label: 'Strength: 強み / Threat: 脅威' },
          { id: 'b', label: 'Strength: 速度 / Threat: 取引' },
          { id: 'c', label: 'Weakness: 市場 / Opportunity: 損失' },
          { id: 'd', label: 'Opportunity: 組織 / Threat: 技術' },
        ],
        correctChoiceIds: ['a'],
        explanation: 'SWOT は強み、弱み、機会、脅威の 4 要素で分析する。',
      },
    ],
  },
  {
    id: 'color-test',
    title: '色彩検定',
    description:
      '色相、明度、彩度、配色技法、慣用色名を視覚教材と選択式問題で往復できるページを作る。',
    audience: '配色理論を資格学習と制作実務の両方に使いたい学習者',
    accent: '#0f766e',
    categories: ['色の三属性', '配色', '色名・慣用色'],
    sources: [
      { id: 'color-source-1', kind: 'note', label: '公式テキスト要約', status: 'parsed' },
      { id: 'color-source-2', kind: 'pdf', label: '配色演習 PDF', status: 'review-ready' },
    ],
    units: [
      {
        id: 'color-unit-1',
        title: '色の三属性',
        category: '色の三属性',
        objective: '色相、明度、彩度の違いを図と文章で説明できる。',
        generatedOutline: ['色相環', '明度スケール', '彩度の変化'],
      },
      {
        id: 'color-unit-2',
        title: '配色技法',
        category: '配色',
        objective: '類似色相、補色色相、トーン配色を例から判定する。',
        generatedOutline: ['類似配色', '補色配色', 'トーン統一'],
      },
    ],
    questions: [
      {
        id: 'color-q1',
        category: '色の三属性',
        pattern: 'true-false',
        prompt: '彩度は色の鮮やかさを表す属性である。',
        visualHint: '低彩度から高彩度へ変化するカラーバーを添付可能',
        choices: [
          { id: 'a', label: '正しい' },
          { id: 'b', label: '誤り' },
        ],
        correctChoiceIds: ['a'],
        explanation: '彩度は色の鮮やかさ、明度は明るさを表す。',
      },
      {
        id: 'color-q2',
        category: '配色',
        pattern: 'multiple-select',
        prompt: 'トーンをそろえた配色の効果として適切なものをすべて選べ。',
        choices: [
          { id: 'a', label: '統一感が出やすい' },
          { id: 'b', label: '印象を制御しやすい' },
          { id: 'c', label: '色相差が必ずなくなる' },
          { id: 'd', label: '明度と彩度の方向性をそろえられる' },
        ],
        correctChoiceIds: ['a', 'b', 'd'],
        explanation: 'トーン配色は明度・彩度のまとまりを使って印象を整える。',
      },
    ],
  },
  {
    id: 'trap-hunting',
    title: '狩猟免許（わな）',
    description:
      '法令、鳥獣判別、わなの安全管理を、文章と図示ヒントを組み合わせた模擬テストに展開する。',
    audience: 'わな猟免許の出題形式に慣れたい受験者、安全管理を復習したい実務前の学習者',
    accent: '#b45309',
    categories: ['法令', '鳥獣判別', 'わなの構造と安全'],
    sources: [
      { id: 'trap-source-1', kind: 'web', label: '自治体講習資料 URL', status: 'planned' },
      { id: 'trap-source-2', kind: 'manual', label: '講習会ノート', status: 'parsed' },
    ],
    units: [
      {
        id: 'trap-unit-1',
        title: 'わな猟の基本法令',
        category: '法令',
        objective: '禁止事項、標識、区域制限などを状況文から判断する。',
        generatedOutline: ['狩猟期間と区域', '標識の設置', '禁止猟法'],
      },
      {
        id: 'trap-unit-2',
        title: 'わなの構造と安全確認',
        category: 'わなの構造と安全',
        objective: 'くくりわな・箱わなの特徴と点検観点を説明できる。',
        generatedOutline: ['くくりわな', '箱わな', '見回りと事故防止'],
      },
    ],
    questions: [
      {
        id: 'trap-q1',
        category: 'わなの構造と安全',
        pattern: 'counting',
        prompt: 'わな設置時の安全確認として適切なものはいくつあるか。標識の設置、見回り計画、錯誤捕獲時の連絡先確認、周辺利用者への配慮。',
        choices: [
          { id: 'a', label: '1 個' },
          { id: 'b', label: '2 個' },
          { id: 'c', label: '3 個' },
          { id: 'd', label: '4 個' },
        ],
        correctChoiceIds: ['d'],
        explanation: '列挙された 4 項目はいずれも安全管理に関係する確認項目である。',
      },
      {
        id: 'trap-q2',
        category: '法令',
        pattern: 'single-choice',
        prompt: 'わなを設置した場合に必要な表示として最も適切なものはどれか。',
        visualHint: '標識札の配置例を図で示せる',
        choices: [
          { id: 'a', label: '設置者情報などを示す標識' },
          { id: 'b', label: '獲物の販売価格' },
          { id: 'c', label: '任意の装飾札' },
          { id: 'd', label: '設置場所の地価' },
        ],
        correctChoiceIds: ['a'],
        explanation: 'わなの設置には設置者を確認できる標識などの法令遵守が必要になる。',
      },
    ],
  },
]
