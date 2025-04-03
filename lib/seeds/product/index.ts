import { handlingError } from "@/lib/utils";
import { aquamarine_loose_stone, kalung_keabadian, cincin_surgawi, alexandrite_loose_stone } from "./seeder";

export default async function seeder() {
  try {
    await aquamarine_loose_stone();
    await alexandrite_loose_stone();
    await cincin_surgawi();
    await kalung_keabadian();

    console.log("Seeding Product success!");
  } catch (error) {
    handlingError(error);
  }
}
