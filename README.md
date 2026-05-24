# 🏗 Buildly

Minha ferramenta pessoal para calcular orçamentos de projetos sem ficar doidão com contas. Simples, rápida e sem distrações.

## Por que existe?

Cansado de fazer contas de cabeça ou abrir a calculadora toda vez que preciso estimar um projeto? O Buildly é basicamente uma calculadora de orçamento que entende que projetos diferentes têm complexidades diferentes. Uma API simples não é a mesma coisa que um e-commerce com IA integrada.

Então aqui tem:
- ✏️ Uma faixa de preço fixa (R$ 50–70/hora pra mim)
- 📊 Multiplicadores por tipo de projeto
- 🎯 Um lugar único pra chutar os números e ver quanto custa

## Stack

- Next.js 16 (Turbopack é rápido demais)
- TypeScript (porque errar custa caro)
- shadcn/ui (componentes bonitos prontos)
- Tailwind (sem escrever CSS na mão)
- Dark mode por padrão (meus olhos agradecem)

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000) e é isso.

## Os Multiplicadores

Cada tipo de projeto tem um multiplicador que leva em conta a complexidade:

| Tipo | Nível | Mult |
|---|---|---|
| APIs | Baixo | 1.6x |
| Dashboards | Baixo | 1.8x |
| Automações | Baixo | 1.8x |
| Sistemas administrativos | Médio | 2x |
| MVPs | Médio | 2x |
| Web apps | Médio | 2.2x |
| CRM | Médio | 2.3x |
| SaaS | Médio | 2.5x |
| Integrações | Alto | 2.7x |
| IA aplicada | Alto | 2.8x |
| E-commerce | Alto | 3x |

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm start          # Inicia servidor de produção
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
npm run typecheck  # Verifica tipos TypeScript
```

## 🎨 Personalizando

### Adicionar Novo Tipo de Projeto

Edite [lib/budget/project-types.ts](lib/budget/project-types.ts):

```typescript
export const projectTypes: ProjectType[] = [
  // ... projetos existentes
  { id: "seu-tipo", name: "Seu Tipo", level: "Médio", multiplier: 2.0 },
]
```

### Alterar Faixa Horária

Em [lib/budget/project-types.ts](lib/budget/project-types.ts):

```typescript
export const hourlyRateRange = {
  min: 50,
  max: 70,
  default: 60,
}
```

## Commands

```bash
npm run dev       # Roda
npm run build     # Build
npm run lint      # Lê o código
npm run format    # Arruma
npm run typecheck # Checa tipos
```

## Mudando os números

Se quiser alterar a faixa de preço ou os multiplicadores, tá tudo em `lib/budget/project-types.ts`.
