import { handlingError } from "@/lib/utils";
import {
  alexandrite_loose_stone,
  aquamarine_loose_stone,
  emerald_loose_stone,
  kalung_keabadian,
  ruby_loose_stone,
  sapphire_loose_stone,
  ruby_ring_stone,
  emerald_ring_stone,
  sapphire_ring_stone,
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
    await kalung_keabadian();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
