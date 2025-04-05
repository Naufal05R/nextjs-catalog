import { handlingError } from "@/lib/utils";
import {
  ruby_ring_stone_1,
  blue_star_sapphire_2,
  emerald_pendant_1,
  emerald_pendant_2,
  emerald_pendant_3,
  aquamarine_loose_stone_1,
  aquamarine_loose_stone_2,
  aquamarine_loose_stone_3,
  alexandrite_loose_stone_1,
  alexandrite_loose_stone_2,
  alexandrite_loose_stone_3,
  ruby_loose_stone_1,
  ruby_loose_stone_2,
  ruby_loose_stone_3,
  sapphire_loose_stone_1,
  sapphire_loose_stone_2,
  sapphire_loose_stone_3,
  emerald_loose_stone_1,
  emerald_loose_stone_2,
  emerald_loose_stone_3,
} from "./seeder";

export default async function seeder() {
  try {
    await aquamarine_loose_stone_1();
    await aquamarine_loose_stone_2();
    await aquamarine_loose_stone_3();
    await alexandrite_loose_stone_1();
    await alexandrite_loose_stone_2();
    await alexandrite_loose_stone_3();
    await ruby_loose_stone_1();
    await ruby_loose_stone_2();
    await ruby_loose_stone_3();
    await sapphire_loose_stone_1();
    await sapphire_loose_stone_2();
    await sapphire_loose_stone_3();
    await emerald_loose_stone_1();
    await emerald_loose_stone_2();
    await emerald_loose_stone_3();
    await ruby_ring_stone_1();
    await blue_star_sapphire_2();
    await emerald_pendant_1();
    await emerald_pendant_2();
    await emerald_pendant_3();

    console.log("Seeding Media success!");
  } catch (error) {
    handlingError(error);
  }
}
