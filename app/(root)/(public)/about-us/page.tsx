import Media from "@/components/server/Media";
import React from "react";

const AboutUsPage = () => {
  return (
    <section className="mx-auto max-w-2xl pt-8">
      <h4 className="mb-4 text-3xl">About Us</h4>

      <Media
        src="/thumbnail/about-thumbnail.jpg"
        alt="about-thumbnail"
        fill
        sizes="50vw"
        classNames={{
          figure: "w-full aspect-video rounded",
        }}
      />

      <blockquote className="mt-4 text-sm text-slate-500">
        <p>Allah SWT menciptakan alam semesta ini, begitu indahnya, begitu sempuna, dan penuh keseimbangan.</p>
        <br />
        <p>
          Malam siang, gelap terang, keras lembut, panas dingin, semua saling melengkapi, dan tidak ada yang sia-sia.
          Batu permata, Allah SWT menjadikannya tebentuk dari unsur-unsur alam, ribuan tahun bahkan mungkin jutaan tahun
          yang lalu, jauh lebih tua dai usia peradaban yang ada sekarang ini. Melalui proses fisika dan kimia yang
          begitu rumit, dengan tekanan dan suhu yang sangat tinggi, dan poses yang begitu panjang, permata tersebut
          tercipta.
        </p>
        <br />
        <p>
          Tentu saja ini semua mengandung hikmah dan pelajaran yang sangat berharga, bagi mereka yang mau berfikir.
          Wallahu &apos;alam...
        </p>
        <br />
        <i>Owner Legenda Permata</i>
      </blockquote>
    </section>
  );
};

export default AboutUsPage;
