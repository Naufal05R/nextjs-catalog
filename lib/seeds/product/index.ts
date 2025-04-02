import { handlingError } from "@/lib/utils";
import { batu_crystal, kalung_keabadian, cincin_surgawi } from "./seeder";

export default async function seeder() {
  try {
    await batu_crystal();
    await cincin_surgawi();
    await kalung_keabadian();

    console.log("Seeding Product success!");
  } catch (error) {
    handlingError(error);
  }
}
