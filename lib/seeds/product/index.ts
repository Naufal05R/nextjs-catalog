import { handlingError } from "@/lib/utils";
import {
  batu_ajaib,
  batu_emerald,
  batu_surgawi,
  cincin_abadi,
  cincin_kristal,
  cincin_kuno,
  cincin_surgawi,
  gelang_baru,
} from "./seeder";

export default async function seeder() {
  try {
    await cincin_surgawi();
    await cincin_abadi();
    await cincin_kuno();
    await gelang_baru();
    await batu_emerald();
    await batu_surgawi();
    await batu_ajaib();
    await cincin_kristal();

    console.log("Seeding Product success!");
  } catch (error) {
    handlingError(error);
  }
}
