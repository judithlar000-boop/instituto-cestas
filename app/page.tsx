import { FamilyRegistrationForm } from "@/components/family-registration-form"
import { DeliveryRegistrationForm } from "@/components/delivery-registration-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-background">
      <div className="w-full max-w-2xl flex flex-col gap-12">
        
        {/* Bloco 1: Cadastro de Família */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">Cadastro de Família</h1>
          <p className="text-muted-foreground">Preencha os dados para registrar uma nova família.</p>
          <FamilyRegistrationForm />
        </div>

        {/* Linha Divisória */}
        <hr className="border-border" />

        {/* Bloco 2: Registro de Entrega */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">Registro de Entrega</h1>
          <p className="text-muted-foreground">Registre a entrega da cesta básica para uma família já cadastrada.</p>
          <DeliveryRegistrationForm />
        </div>

      </div>
    </main>
  )
}
