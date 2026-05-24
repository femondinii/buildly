import { hourlyRateRange, type ProjectType } from "@/lib/budget/project-types"

export type BudgetEstimateInput = {
  projectType: ProjectType
  hours: number
  hourlyRate: number
}

export type BudgetEstimate = {
  baseAmount: number
  multiplier: number
  totalAmount: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function normalizeBudgetInput({ hours, hourlyRate }: Pick<BudgetEstimateInput, "hours" | "hourlyRate">) {
  return {
    hours: Number.isFinite(hours) && hours > 0 ? hours : 0,
    hourlyRate: clamp(Number.isFinite(hourlyRate) ? hourlyRate : hourlyRateRange.default, hourlyRateRange.min, hourlyRateRange.max),
  }
}

export function calculateBudgetEstimate(input: BudgetEstimateInput): BudgetEstimate {
  const normalizedInput = normalizeBudgetInput(input)
  const baseAmount = normalizedInput.hours * normalizedInput.hourlyRate
  const totalAmount = baseAmount * input.projectType.multiplier

  return {
    baseAmount,
    multiplier: input.projectType.multiplier,
    totalAmount,
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatRate(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}
