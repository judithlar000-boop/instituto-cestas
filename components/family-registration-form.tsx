"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { 
  User, 
  CreditCard, 
  Phone, 
  MapPin, 
  Users, 
  CalendarIcon,
  Minus,
  Plus,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function FamilyRegistrationForm() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    telefone: "",
    endereco: "",
    quantidadeCriancas: 0,
    dataCadastro: new Date(),
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleInputChange = (field: string, value: string | number | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const dadosParaSalvar = {
      nome_completo: formData.nomeCompleto,
      cpf: formData.cpf,
      telefone: formData.telefone,
      endereco: formData.endereco,
      quantidade_criancas: formData.quantidadeCriancas,
      data_cadastro: formData.dataCadastro.toISOString()
    }

    try {
      const resposta = await fetch("https://ylxavxuhynwmfugzavgs.supabase.co/rest/v1/familias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8", 
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGF2eHVoeW53bWZ1Z3phdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU5NTYsImV4cCI6MjA4ODY1MTk1Nn0.AH2g1EoT3qG0Z8fQ9HWrZO7Q1Wfq428qy3D4sTgenQ8"
        },
        body: JSON.stringify(dadosParaSalvar)
      })

      if (!resposta.ok) {
        throw new Error("Erro na comunicação com o banco")
      }

      setIsSubmitted(true)
      
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nomeCompleto: "",
          cpf: "",
          telefone: "",
          endereco: "",
          quantidadeCriancas: 0,
          dataCadastro: new Date(),
        })
      }, 3000)

    } catch (erro) {
      console.error(erro)
      alert("Erro ao salvar no Supabase. Verifique suas chaves e colunas.")
    }
  }

  const incrementChildren = () => {
    setFormData((prev) => ({
      ...prev,
      quantidadeCriancas: Math.min(prev.quantidadeCriancas + 1, 20),
    }))
  }

  const decrementChildren = () => {
    setFormData((prev) => ({
      ...prev,
      quantidadeCriancas: Math.max(prev.quantidadeCriancas - 1, 0),
    }))
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Cadastro Realizado!</h2>
        <p className="text-muted-foreground">
          A família foi cadastrada com sucesso no sistema.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-8">
      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            Nome Completo
          </FieldLabel>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Digite o nome completo"
              value={formData.nomeCompleto}
              onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
              className="h-14 rounded-xl border-2 border-border bg-card pl-12 text-base placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              required
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            CPF
          </FieldLabel>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
              maxLength={14}
              className="h-14 rounded-xl border-2 border-border bg-card pl-12 text-base placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              required
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            Telefone / WhatsApp
          </FieldLabel>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
              maxLength={15}
              className="h-14 rounded-xl border-2 border-border bg-card pl-12 text-base placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              required
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            Endereço
          </FieldLabel>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rua, número, bairro, cidade"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              className="h-14 rounded-xl border-2 border-border bg-card pl-12 text-base placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              required
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            Quantidade de Crianças
          </FieldLabel>
          <div className="flex items-center justify-between rounded-xl border-2 border-border bg-card p-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Crianças na família</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrementChildren}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors active:bg-secondary/80"
                disabled={formData.quantidadeCriancas === 0}
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-8 text-center text-xl font-bold text-foreground">
                {formData.quantidadeCriancas}
              </span>
              <button
                type="button"
                onClick={incrementChildren}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors active:bg-accent/80"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-semibold text-foreground">
            Data de Cadastro
          </FieldLabel>
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
                  {format(formData.dataCadastro, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dataCadastro}
                onSelect={(date) => {
                  if (date) {
                    handleInputChange("dataCadastro", date)
                    setIsCalendarOpen(false)
                  }
                }}
                locale={ptBR}
                disabled={(date) =>
                  date > new Date() || date < new Date("2022-01-01")
                }
                initialFocus
                fromDate={new Date("2022-01-01")}
                toDate={new Date()}
              />
            </PopoverContent>
          </Popover>
          <p className="mt-1 text-xs text-muted-foreground">
            Permite datas retroativas desde janeiro de 2022
          </p>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="mt-4 h-16 w-full rounded-xl bg-accent text-lg font-bold text-accent-foreground shadow-lg transition-all active:scale-[0.98]"
      >
        Finalizar Cadastro
      </Button>
    </form>
  )
}
