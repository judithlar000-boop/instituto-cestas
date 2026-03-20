import { Header } from "@/components/header"
import { FamilyRegistrationForm } from "@/components/family-registration-form"
import { DeliveryRegistrationForm } from "@/components/delivery-registration-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Cadastro de Família
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha os dados abaixo para registrar uma nova família no sistema
          </p>
        </div>
        
        <FamilyRegistrationForm />
        <DeliveryRegistrationForm />
      </main>
    </div>
  )
}
