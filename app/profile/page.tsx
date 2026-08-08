import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MyGiftingLife } from "@/components/my-gifting-life"

export const metadata = {
  title: "My Gifting Life | GiftBasket",
  description: "Your personalized gifting dashboard",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <MyGiftingLife />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
