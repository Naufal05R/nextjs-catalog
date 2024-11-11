import { handlingError } from "@/lib/utils";
import { batu_crystal, cincin_surgawi } from "./seeder";

export default async function seeder() {
  try {
    await batu_crystal();
    await cincin_surgawi();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
