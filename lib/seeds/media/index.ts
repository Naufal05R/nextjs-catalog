import { handlingError } from "@/lib/utils";
import {
  sapphire_ceylon_1,
  sapphire_ceylon_2,
  sapphire_ceylon_3,
  blue_star_sapphire_1,
  blue_star_sapphire_2,
  blue_star_sapphire_3,
  yellow_sapphire_1,
  yellow_sapphire_2,
  yellow_sapphire_3,
  ruby_burma_star_1,
  ruby_burma_star_2,
  ruby_burma_star_3,
  permata_1,
  permata_2,
  permata_3,
  display_batu_surgawi,
  detail_batu_surgawi,
  batu_lepas_hijau,
  batu_lepas_shine,
  christian_wiediger_1,
  christian_wiediger_2,
} from "./seeder";

export default async function seeder() {
  try {
    await sapphire_ceylon_1();
    await sapphire_ceylon_2();
    await sapphire_ceylon_3();
    await blue_star_sapphire_1();
    await blue_star_sapphire_2();
    await blue_star_sapphire_3();
    await yellow_sapphire_1();
    await yellow_sapphire_2();
    await yellow_sapphire_3();
    await ruby_burma_star_1();
    await ruby_burma_star_2();
    await ruby_burma_star_3();
    await permata_1();
    await permata_2();
    await permata_3();
    await display_batu_surgawi();
    await detail_batu_surgawi();
    await batu_lepas_hijau();
    await batu_lepas_shine();
    await christian_wiediger_1();
    await christian_wiediger_2();

    console.log("Seeding Media success!");
  } catch (error) {
    handlingError(error);
  }
}
