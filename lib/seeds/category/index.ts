import { handlingError } from "@/lib/utils";
import { alexandrite, aquamarine, diamond, emerald, ruby, sapphire } from "./seeder";

export default async function seeder() {
  try {
    await sapphire();
    await ruby();
    await diamond();
    await emerald();
    await aquamarine();
    await alexandrite();

    console.log("Seeding Category success!");
  } catch (error) {
    handlingError(error);
  }
}
