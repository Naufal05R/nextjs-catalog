import { handlingError } from "@/lib/utils";
import { diamond, emerald, ruby, sapphire } from "./seeder";

export default async function seeder() {
  try {
    await sapphire();
    await ruby();
    await diamond();
    await emerald();

    console.log("Seeding Category success!");
  } catch (error) {
    handlingError(error);
  }
}
