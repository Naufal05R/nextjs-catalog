import { handlingError } from "@/lib/utils";
import { aquamarine_loose_stone, cincin_surgawi, kalung_keabadian } from "./seeder";

export default async function seeder() {
  try {
    await aquamarine_loose_stone();
    await cincin_surgawi();
    await kalung_keabadian();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
