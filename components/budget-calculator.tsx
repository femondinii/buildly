"use client"

import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  calculateBudgetEstimate,
  formatCurrency,
  formatRate,
} from "@/lib/budget/calculate-budget"
import {
  getProjectTypeById,
  hourlyRateRange,
  projectLevels,
  projectTypes,
} from "@/lib/budget/project-types"

function parseNumber(value: string, fallback: number) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

export function BudgetCalculator() {
  const [projectTypeId, setProjectTypeId] = useState(projectTypes[0]?.id ?? "")
  const [hours, setHours] = useState("20")
  const [hourlyRate, setHourlyRate] = useState(String(hourlyRateRange.default))

  const selectedProjectType = getProjectTypeById(projectTypeId) ?? projectTypes[0]
  const hoursValue = parseNumber(hours, 0)
  const hourlyRateValue = parseNumber(hourlyRate, hourlyRateRange.default)

  const estimate = useMemo(() => {
    if (!selectedProjectType) {
      return null
    }

    return calculateBudgetEstimate({
      projectType: selectedProjectType,
      hours: hoursValue,
      hourlyRate: hourlyRateValue,
    })
  }, [hoursValue, hourlyRateValue, selectedProjectType])

  return (
    <Card className="border-zinc-800/80 bg-zinc-950/90 text-zinc-100 shadow-2xl shadow-black/30 backdrop-blur">
      <CardHeader className="space-y-2 border-b border-zinc-800/80">
        <CardTitle className="text-xl text-zinc-50">Calculadora de orçamento</CardTitle>
        <CardDescription className="text-zinc-400">
          Simule o preço do projeto com o multiplicador de complexidade e a sua faixa de hora.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <Field>
          <FieldLabel htmlFor="project-type" className="text-zinc-100">
            Tipo do projeto
          </FieldLabel>
          <FieldContent>
            <Select value={projectTypeId} onValueChange={setProjectTypeId}>
              <SelectTrigger id="project-type" className="w-full border-zinc-800 bg-zinc-900/90 text-zinc-100 shadow-none">
                <SelectValue placeholder="Selecione o tipo do projeto" />
              </SelectTrigger>
              <SelectContent>
                {projectLevels.map((level) => (
                  <SelectGroup key={level}>
                    <SelectLabel className="text-zinc-400">{level}</SelectLabel>
                    {projectTypes
                      .filter((projectType) => projectType.level === level)
                      .map((projectType) => (
                        <SelectItem key={projectType.id} value={projectType.id}>
                          <span className="flex w-full items-center justify-between gap-3">
                            <span>{projectType.name}</span>
                            <span className="text-zinc-500 text-xs">
                              {projectType.multiplier.toFixed(1)}x
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
          <FieldDescription>
            Os multiplicadores são separados por nível de complexidade para manter a precificação consistente.
          </FieldDescription>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="hours" className="text-zinc-100">
              Horas estimadas
            </FieldLabel>
            <FieldContent>
              <Input
                id="hours"
                type="number"
                min="1"
                step="1"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                className="border-zinc-800 bg-zinc-900/90 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
                placeholder="Ex: 24"
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="hourly-rate" className="text-zinc-100">
              Valor da hora
            </FieldLabel>
            <FieldContent>
              <Input
                id="hourly-rate"
                type="number"
                min={hourlyRateRange.min}
                max={hourlyRateRange.max}
                step="1"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                className="border-zinc-800 bg-zinc-900/90 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
                placeholder="Ex: 60"
              />
            </FieldContent>
          </Field>
        </div>
        <div className="grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-500">Projeto</p>
            <p className="font-medium text-zinc-100">{selectedProjectType?.name ?? "—"}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Multiplicador</p>
            <p className="font-medium text-zinc-100">{selectedProjectType ? `${selectedProjectType.multiplier.toFixed(1)}x` : "—"}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Base</p>
            <p className="font-medium text-zinc-100">{formatRate(hourlyRateValue)} por hora</p>
          </div>
        </div>
        <Card className="border-zinc-800 bg-zinc-900/70 shadow-none">
          <CardContent className="space-y-3 p-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-zinc-500">Valor estimado</span>
              <strong className="text-3xl tracking-tight text-zinc-50">
                {estimate ? formatCurrency(estimate.totalAmount) : "R$ 0,00"}
              </strong>
            </div>
            <div className="grid gap-2 text-sm text-zinc-400 sm:grid-cols-3">
              <p>{hoursValue.toLocaleString("pt-BR")} horas</p>
              <p>{formatRate(hourlyRateValue)} / hora</p>
              <p>Base: {formatCurrency(estimate?.baseAmount ?? 0)}</p>
            </div>
            <p className="text-sm text-zinc-500">
              O cálculo multiplica o esforço pelas horas e aplica o fator do tipo de projeto.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
