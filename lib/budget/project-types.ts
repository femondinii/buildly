export type ProjectLevel = "Baixo" | "Médio" | "Alto"

export type ProjectType = {
  id: string
  name: string
  level: ProjectLevel
  multiplier: number
}

export const hourlyRateRange = {
  min: 50,
  max: 70,
  default: 60,
} as const

export const projectTypes: ProjectType[] = [
  { id: "apis", name: "APIs", level: "Baixo", multiplier: 1.6 },
  { id: "dashboards", name: "Dashboards", level: "Baixo", multiplier: 1.8 },
  { id: "automacoes", name: "Automações", level: "Baixo", multiplier: 1.8 },
  { id: "sistemas-administrativos", name: "Sistemas administrativos", level: "Médio", multiplier: 2 },
  { id: "mvps", name: "MVPs", level: "Médio", multiplier: 2 },
  { id: "aplicativos-web", name: "Aplicativos web", level: "Médio", multiplier: 2.2 },
  { id: "crm", name: "CRM", level: "Médio", multiplier: 2.3 },
  { id: "saas", name: "SaaS", level: "Médio", multiplier: 2.5 },
  { id: "integracoes-entre-sistemas", name: "Integrações entre sistemas", level: "Alto", multiplier: 2.7 },
  { id: "ia-aplicada", name: "IA aplicada", level: "Alto", multiplier: 2.8 },
  { id: "e-commerce", name: "E-commerce", level: "Alto", multiplier: 3 },
]

export const projectLevels: ProjectLevel[] = ["Baixo", "Médio", "Alto"]

export function getProjectTypeById(projectTypeId: string) {
  return projectTypes.find((projectType) => projectType.id === projectTypeId)
}
