import { handlingError } from "@/lib/utils";
import {
  alexandrite_loose_stone,
  aquamarine_loose_stone,
  cincin_surgawi,
  kalung_keabadian,
  ruby_loose_stone,
  sapphire_loose_stone,
} from "./seeder";

export default async function seeder() {
  try {
    await aquamarine_loose_stone();
    await alexandrite_loose_stone();
    await ruby_loose_stone();
    await sapphire_loose_stone();
    await cincin_surgawi();
    await kalung_keabadian();

    console.log("Seeding Gallery success!");
  } catch (error) {
    handlingError(error);
  }
}
