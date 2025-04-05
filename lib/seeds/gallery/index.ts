import { handlingError } from "@/lib/utils";
import {
  alexandrite_loose_stone,
  aquamarine_loose_stone,
  emerald_loose_stone,
  emerald_pendant_stone,
  ruby_loose_stone,
  sapphire_loose_stone,
  ruby_ring_stone,
  emerald_ring_stone,
  sapphire_ring_stone,
  amethyst_ring_stone,
  aquamarine_bracelet_stone,
  ruby_earrings_stone,
} from "./seeder";

export default async function seeder() {
  try {
    await aquamarine_loose_stone();
    await alexandrite_loose_stone();
    await ruby_loose_stone();
    await sapphire_loose_stone();
    await emerald_loose_stone();
    await ruby_ring_stone();
    await emerald_ring_stone();
    await sapphire_ring_stone();
    await amethyst_ring_stone();
    await aquamarine_bracelet_stone();
    await emerald_pendant_stone();
    await ruby_earrings_stone();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
