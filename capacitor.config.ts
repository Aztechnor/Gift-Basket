import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.giftbasket.app",
  appName: "GiftBasket",
  webDir: ".next",
  server: {
    url: process.env.CAPACITOR_SERVER_URL ?? "https://giftbasket.vercel.app",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
}

export default config
