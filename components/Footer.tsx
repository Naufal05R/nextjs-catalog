import React from "react";
import Link from "next/link";
import { padding } from "@/lib/styles";
import { cn } from "@/lib/utils";
import {
  AmericanExpress,
  DinersClub,
  Discover,
  JCB,
  Maestro,
  Mastercard,
  PayPal,
  UnionPay,
  Venmo,
  Visa,
} from "@/components/svg";

const Footer = () => {
  return (
    <footer className={cn(padding.x, "flex flex-row items-center justify-between py-24")}>
      <blockquote className="text-sm text-slate-500">
        <p>Copyright © {new Date().getFullYear()} LEGENDA PERMATA</p>
        <Link href="https://naufalrabbani.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Developed by Naufal Rabbani
        </Link>
      </blockquote>

      <ul className="flex flex-row items-center gap-2">
        {[AmericanExpress, DinersClub, Discover, JCB, Maestro, Mastercard, PayPal, UnionPay, Venmo, Visa].map(
          (Icon, index) => (
            <li key={index}>
              <Icon />
            </li>
          ),
        )}
      </ul>
    </footer>
  );
};

export default Footer;
