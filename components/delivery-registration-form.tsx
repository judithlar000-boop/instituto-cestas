"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Box, CalendarIcon, CheckCircle2, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function DeliveryRegistrationForm() {
  const [familias, setFamilias] = useState<any[]>([])
  const [formData, setFormData] = useState({
    familia_id: "",
    mes_referencia: "",
    data_entrega: new Date(),
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 1. O robô busca as famílias cadastradas automaticamente quando a tela abre!
  useEffect(() => {
    const buscarFamilias = async () => {
      try {
        const resposta = await fetch("https://ylxavxuhynwmfugzavgs.supabase.co/rest/v1/familias?select=id,nome_completo,cpf", {
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8"
          }
        })
        const dados = await resposta.json()
        setFamilias(dados)
        setIsLoading(false)
      } catch (erro) {
        console.error("Erro ao buscar famílias", erro)
        setIsLoading(false)
      }
    }
    buscarFamilias()
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.familia_id) {
      alert("Por favor, selecione uma família da lista!")
      return
    }

    const dadosParaSalvar = {
      familia_id: formData.familia_id,
      mes_referencia: formData.mes_referencia,
      data_entrega: formData.data_entrega.toISOString()
    }

    try {
      const resposta = await fetch("https://ylxavxuhynwmfugzavgs.supabase.co/rest/v1/entregas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8"
        },
        body: JSON.stringify(dadosParaSalvar)
      })

      if (!resposta.ok) throw new Error("Erro ao salvar entrega")

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          familia_id: "",
          mes_referencia: "",
          data_entrega: new Date(),
        })
      }, 3000)

    } catch (erro) {
      console.error(erro)
      alert("Erro ao salvar a entrega.")
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Entrega Registrada!</h2>
        <p className="text-muted-foreground">A cesta básica foi computada com sucesso.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-8">
      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">Família que retirou a cesta</FieldLabel>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={formData.familia_id}
              onChange={(e) => handleInputChange("familia_id", e.target.value)}
              className="h-14 w-full appearance-none rounded-xl border-2 border-border bg-card pl-12 pr-4 text-base focus:border-accent focus:ring-accent"
              required
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? "Buscando famílias no banco de dados..." : "Clique para selecionar a família..."}
              </option>
              {familias.map((familia) => (
                <option key={familia.id} value={familia.id}>
                  {familia.nome_completo} (CPF: {familia.cpf})
                </option>
              ))}
            </select>
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">Mês de Referência</FieldLabel>
          <div className="relative">
            <Box className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ex: Março de 2026"
              value={formData.mes_referencia}
              onChange={(e) => handleInputChange("mes_referencia", e.target.value)}
              className="h-14 rounded-xl border-2 border-border bg-card pl-12 text-base focus:border-accent focus:ring-accent"
              required
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">Data da Retirada</FieldLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-14 w-full items-center gap-3 rounded-xl border-2 border-border bg-card px-4 text-left text-base transition-colors",
                  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                )}
              >
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">
                  {format(formData.data_entrega, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.data_entrega}
                onSelect={(date) => {
                  if (date) {
                    handleInputChange("data_entrega", date)
                    setIsCalendarOpen(false)
                  }
                }}
                locale={ptBR}
                disabled={(date) => date > new Date() || date < new Date("2022-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </Field>
      </FieldGroup>

      <Button type="submit" className="mt-4 h-16 w-full rounded-xl bg-accent text-lg font-bold text-accent-foreground shadow-lg transition-all active:scale-[0.98]">
        Registrar Entrega
      </Button>
    </form>
  )
}
