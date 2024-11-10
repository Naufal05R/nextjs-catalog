import { handlingError } from "@/lib/utils";
import { batu, cincin } from "./seeder";

export default async function seeder() {
  try {
    await cincin();
    await batu();

    console.log("Seeding Collection success!");
  } catch (error) {
    handlingError(error);
  }
}
