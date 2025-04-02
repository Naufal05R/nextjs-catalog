import { handlingError } from "@/lib/utils";
import { batu, cincin, lainnya } from "./seeder";

export default async function seeder() {
  try {
    await batu();
    await cincin();
    await lainnya();

    console.log("Seeding Collection success!");
  } catch (error) {
    handlingError(error);
  }
}
