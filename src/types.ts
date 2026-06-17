export type QuestionPattern =
  | 'single-choice'
  | 'cloze'
  | 'multiple-select'
  | 'matching'
  | 'counting'
  | 'true-false'

export type PresentationMode = 'single' | 'multi'

export type SourceKind = 'web' | 'pdf' | 'note' | 'manual'

export type StudySource = {
  id: string
  kind: SourceKind
  label: string
  status: 'planned' | 'parsed' | 'review-ready'
}

export type StudyUnit = {
  id: string
  title: string
  category: string
  objective: string
  generatedOutline: string[]
}

export type Choice = {
  id: string
  label: string
}

export type StudyQuestion = {
  id: string
  category: string
  pattern: QuestionPattern
  prompt: string
  visualHint?: string
  choices: Choice[]
  correctChoiceIds: string[]
  explanation: string
}

export type StudyTheme = {
  id: string
  title: string
  description: string
  audience: string
  accent: string
  categories: string[]
  sources: StudySource[]
  units: StudyUnit[]
  questions: StudyQuestion[]
}

export type ExamSettings = {
  presentationMode: PresentationMode
  totalMinutes: number
  fontFamily: string
  fontSize: number
  categoryFilter: string
}

export type ExamProgress = {
  answeredCount: number
  elapsedSeconds: number
  totalQuestions: number
  totalMinutes: number
}

export type ExamStats = {
  averageAnswerSeconds: number
  remainingSeconds: number
  unansweredCount: number
  secondsPerRemainingQuestion: number
  completionRate: number
}
