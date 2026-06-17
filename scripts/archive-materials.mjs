import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const materialsDir = path.join(repoRoot, 'materials')
const studiesDir = path.join(repoRoot, 'studies')
const studyId = process.argv[2]

if (!studyId) {
  console.error('Usage: npm run archive:materials -- <study-id>')
  process.exitCode = 1
} else {
  archiveMaterials(studyId).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}

async function archiveMaterials(targetStudyId) {
  const sourceEntries = await safeReaddir(materialsDir)
  if (sourceEntries.length === 0) {
    console.log('materials is already empty')
    return
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const targetDir = path.join(studiesDir, targetStudyId, 'sources', stamp)
  await mkdir(targetDir, { recursive: true })

  for (const entry of sourceEntries) {
    const from = path.join(materialsDir, entry)
    const to = path.join(targetDir, entry)
    await rename(from, to)
  }

  await removeEmptyMaterialsTree(materialsDir)
  console.log(`Archived ${sourceEntries.length} materials item(s) to ${path.relative(repoRoot, targetDir)}`)
}

async function safeReaddir(dir) {
  try {
    return await readdir(dir)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

async function removeEmptyMaterialsTree(dir) {
  const exists = await stat(dir).then(() => true, () => false)
  if (!exists) return
  const entries = await readdir(dir)
  if (entries.length === 0) {
    await rm(dir, { recursive: true, force: true })
  }
}
