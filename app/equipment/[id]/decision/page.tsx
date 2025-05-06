"use client"
import {
  Activity,
  AlertTriangle,
  Timer,
  Calendar,
  HeartPulse,
  Scale,
  Clock,
  BarChart3,
  HelpCircle,
  Settings,
  AlertCircle,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"

// Sample data for performance indicators
const performanceData = {
  health: {
    score: 85,
    trend: "stable",
    description:
      "La condition globale de l'actif. Configurez la façon dont ce score est calculé dans la page Paramètres de score.",
  },
  criticality: {
    score: 92,
    trend: "up",
    description:
      "Importance de l'actif pour les processus métier. Configurez la façon dont ce score est calculé dans la page Paramètres de score.",
  },
  risk: {
    score: 28,
    trend: "down",
    description:
      "Probabilité d'une défaillance à impact élevé. Configurez la façon dont ce score est calculé dans la page Paramètres de score.",
  },
  endOfLife: {
    score: 45,
    trend: "up",
    description:
      "Probabilité d'une défaillance due à une fin de vie imminente. Configurez la façon dont ce score est calculé dans la page Paramètres de score.",
  },
  rul: {
    percentage: 65,
    description:
      "Pourcentage restant de la durée de vie utile de l'actif. La durée de vie utile restante (RUL) est calculée en soustrayant l'âge de la durée de vie prévue par le fabricant.",
  },
  age: {
    actual: "3.5 ans",
    effective: "4.2 ans",
    description: {
      actual: "L'âge réel correspond à la date du système moins la date d'installation.",
      effective: "L'âge effectif est l'âge réel par rapport au score de santé actuel de l'actif.",
    },
  },
  nextPM: {
    days: 15,
    description:
      "Nombre de jours jusqu'à la prochaine génération planifiée d'une intervention de maintenance préventive (MP).",
  },
  mrr: {
    ratio: 68,
    description:
      "Ratio maintenance/remplacement de l'actif. Le MRR est calculé en divisant le coût total actuel de toutes les opérations de maintenance de l'actif par le coût de remplacement.",
  },
  mtbf: {
    hours: 168,
    description:
      "Valeur moyenne calculée en divisant le temps d'indisponibilité total par le nombre de pannes ayant provoqué le temps d'indisponibilité.",
  },
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  if (score >= 40) return "text-orange-500"
  return "text-red-500"
}

const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-yellow-500"
  if (score >= 40) return "bg-orange-500"
  return "bg-red-500"
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return "↑"
    case "down":
      return "↓"
    default:
      return "→"
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-green-500"
    case "down":
      return "text-red-500"
    default:
      return "text-blue-500"
  }
}

export default function DecisionSupportPage() {
  return (
    <div className="min-h-screen space-y-8 bg-gray-50/50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Support à la Décision</h1>
          <p className="text-muted-foreground">Analyse des indicateurs de performance et aide à la décision</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Paramètres de Score
        </Button>
      </div>

      {/* Section 1: Performance Indicators */}
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Activity className="h-5 w-5" />
          Indicateurs de Performance
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Health Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-primary" />
                  Santé
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.health.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(performanceData.health.score)}`}>
                    {performanceData.health.score}%
                  </span>
                  <span className={`text-sm ${getTrendColor(performanceData.health.trend)}`}>
                    {getTrendIcon(performanceData.health.trend)}
                  </span>
                </div>
                <Progress
                  value={performanceData.health.score}
                  className="h-2"
                  indicatorClassName={getProgressColor(performanceData.health.score)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Criticality Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  Criticité
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.criticality.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(performanceData.criticality.score)}`}>
                    {performanceData.criticality.score}%
                  </span>
                  <span className={`text-sm ${getTrendColor(performanceData.criticality.trend)}`}>
                    {getTrendIcon(performanceData.criticality.trend)}
                  </span>
                </div>
                <Progress
                  value={performanceData.criticality.score}
                  className="h-2"
                  indicatorClassName={getProgressColor(performanceData.criticality.score)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Risk Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Risque
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.risk.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(100 - performanceData.risk.score)}`}>
                    {performanceData.risk.score}%
                  </span>
                  <span className={`text-sm ${getTrendColor(performanceData.risk.trend)}`}>
                    {getTrendIcon(performanceData.risk.trend)}
                  </span>
                </div>
                <Progress
                  value={performanceData.risk.score}
                  className="h-2"
                  indicatorClassName={getProgressColor(100 - performanceData.risk.score)}
                />
              </div>
            </CardContent>
          </Card>

          {/* End of Life */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-primary" />
                  Fin de Vie
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.endOfLife.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(100 - performanceData.endOfLife.score)}`}>
                    {performanceData.endOfLife.score}%
                  </span>
                  <span className={`text-sm ${getTrendColor(performanceData.endOfLife.trend)}`}>
                    {getTrendIcon(performanceData.endOfLife.trend)}
                  </span>
                </div>
                <Progress
                  value={performanceData.endOfLife.score}
                  className="h-2"
                  indicatorClassName={getProgressColor(100 - performanceData.endOfLife.score)}
                />
              </div>
            </CardContent>
          </Card>

          {/* RUL */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  RUL
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.rul.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(performanceData.rul.percentage)}`}>
                    {performanceData.rul.percentage}%
                  </span>
                </div>
                <Progress
                  value={performanceData.rul.percentage}
                  className="h-2"
                  indicatorClassName={getProgressColor(performanceData.rul.percentage)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Age Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Âge
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <p className="text-sm">{performanceData.age.description.actual}</p>
                      <p className="text-sm">{performanceData.age.description.effective}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Âge Réel</p>
                  <p className="text-xl font-bold">{performanceData.age.actual}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Âge Effectif</p>
                  <p className="text-xl font-bold">{performanceData.age.effective}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next PM */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Prochaine MP
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.nextPM.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">{performanceData.nextPM.days} jours</p>
                <p className="text-sm text-muted-foreground">jusqu'à la prochaine maintenance</p>
              </div>
            </CardContent>
          </Card>

          {/* MRR */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  MRR
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.mrr.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(100 - performanceData.mrr.ratio)}`}>
                    {performanceData.mrr.ratio}%
                  </span>
                </div>
                <Progress
                  value={performanceData.mrr.ratio}
                  className="h-2"
                  indicatorClassName={getProgressColor(100 - performanceData.mrr.ratio)}
                />
              </div>
            </CardContent>
          </Card>

          {/* MTBF */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-primary" />
                  MTBF
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{performanceData.mtbf.description}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">{performanceData.mtbf.hours} heures</p>
                <p className="text-sm text-muted-foreground">temps moyen entre pannes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

