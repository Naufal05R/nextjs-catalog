import { handlingError } from "@/lib/utils";
import { shine, sparkle } from "./seeder";

export default async function seeder() {
  try {
    await shine();
    await sparkle();

    console.log("Seeding Tag success!");
  } catch (error) {
    handlingError(error);
  }
}
