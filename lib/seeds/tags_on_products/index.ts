import { handlingError } from "@/lib/utils";
import { shine_on_batu_crystal, shine_on_cincin_surgawi, sparkle_on_cincin_surgawi } from "./seeder";

export default async function seeder() {
  try {
    await shine_on_batu_crystal();
    await shine_on_cincin_surgawi();
    await sparkle_on_cincin_surgawi();

    console.log("Seeding Tag On Products success!");
  } catch (error) {
    handlingError(error);
  }
}
