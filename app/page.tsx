import { Aperture } from "lucide-react"

import { BudgetCalculator } from "@/components/budget-calculator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_26%),linear-gradient(180deg,_#0a0a0a,_#111111_45%,_#0f0f0f)] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <section className="space-y-6 pt-2 lg:sticky lg:top-10">
          <Card className="border-zinc-800/80 bg-zinc-950/80 text-zinc-100 shadow-2xl shadow-black/30 backdrop-blur">
            <CardHeader className="space-y-4 border-b border-zinc-800/80">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-sm text-zinc-400">
                <Aperture className="size-4" />
                Buildly
              </div>
              <div className="space-y-3">
                <CardTitle className="max-w-xl text-2xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl">
                  Orçamentos consistentes para projetos pessoais.
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/75 p-4 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]">
                  <p className="text-sm text-zinc-500">Faixa horária</p>
                  <p className="mt-1 font-medium text-zinc-100">R$ 50 a R$ 70</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/75 p-4 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]">
                  <p className="text-sm text-zinc-500">Multiplicador</p>
                  <p className="mt-1 font-medium text-zinc-100">Por complexidade</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/75 p-4 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]">
                  <p className="text-sm text-zinc-500">Saída</p>
                  <p className="mt-1 font-medium text-zinc-100">Cálculo instantâneo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <BudgetCalculator />
      </div>
    </main>
  )
}
