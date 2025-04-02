import { handlingError } from "@/lib/utils";
import { batu_crystal, cincin_surgawi, kalung_keabadian } from "./seeder";

export default async function seeder() {
  try {
    await batu_crystal();
    await cincin_surgawi();
    await kalung_keabadian();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
