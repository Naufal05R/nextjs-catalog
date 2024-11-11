import { handlingError } from "@/lib/utils";
import {
  blue_star_sapphire_1,
  blue_star_sapphire_2,
  blue_star_sapphire_3,
  permata_1,
  permata_2,
  permata_3,
} from "./seeder";

export default async function seeder() {
  try {
    await permata_1();
    await permata_2();
    await permata_3();
    await blue_star_sapphire_1();
    await blue_star_sapphire_2();
    await blue_star_sapphire_3();

    console.log("Seeding Media success!");
  } catch (error) {
    handlingError(error);
  }
}
