import { handlingError } from "@/lib/utils";
import { loose_stone, other_stone, ring_stone } from "./seeder/index";

const executeSeeder = async (seeders: Record<string, () => Promise<void>>) => {
  for (const key in seeders) await seeders[key]();
};

export default async function seeder() {
  try {
    await executeSeeder(loose_stone);
    await executeSeeder(ring_stone);
    await executeSeeder(other_stone);

    console.log("Seeding Product success!");
  } catch (error) {
    handlingError(error);
  }
}
