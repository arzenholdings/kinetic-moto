"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { BikeMedia, BikeMediaImage, BikeMediaVideo } from "@/components/bike-card";

type BikeMediaGalleryProps = {
  accent: string;
  bikeName: string;
  media?: BikeMedia;
};

type GalleryItem =
  | ({ type: "image" } & BikeMediaImage)
  | ({ type: "video" } & BikeMediaVideo);

function getGalleryItems(media?: BikeMedia): GalleryItem[] {
  return [
    ...(media?.heroVideo ? [{ type: "video" as const, ...media.heroVideo }] : []),
    ...(media?.images || []).map((image) => ({ type: "image" as const, ...image })),
  ];
}

function FallbackBikeMedia({ accent, bikeName }: { accent: string; bikeName: string }) {
  return (
    <div className="relative aspect-video min-h-64 overflow-hidden rounded-[1.25rem] bg-stone-950" aria-label={`${bikeName} media pending`} role="img">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-50`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,_rgba(255,255,255,0.2),_transparent_24%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_45%)]" />
      <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full border-[16px] border-stone-300/80 bg-stone-950 shadow-inner" />
      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full border-[16px] border-stone-300/80 bg-stone-950 shadow-inner" />
      <div className="absolute bottom-28 left-24 right-24 h-14 -skew-x-12 rounded-full bg-white shadow-lg shadow-white/20" />
      <div className="absolute bottom-42 left-36 h-24 w-64 -skew-x-12 rounded-[2rem] bg-stone-200" />
      <div className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
        Media pending
      </div>
    </div>
  );
}

export function BikeMediaGallery({ accent, bikeName, media }: BikeMediaGalleryProps) {
  const items = useMemo(() => getGalleryItems(media), [media]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = items[selectedIndex] || items[0];

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`absolute -inset-8 rounded-full bg-gradient-to-br ${accent} opacity-30 blur-3xl`} />
      <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${accent} p-5 shadow-2xl shadow-black/30`}>
        <div className="rounded-[1.5rem] bg-stone-950/72 p-5 backdrop-blur">
          <div className="mb-6 flex items-center justify-between gap-4 text-sm text-stone-300">
            <span>{bikeName} / product media</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-white">
              {items.length > 0 ? `${selectedIndex + 1} / ${items.length}` : "0 / 0"}
            </span>
          </div>

          {selectedItem ? (
            <div className="relative aspect-video min-h-64 overflow-hidden rounded-[1.25rem] bg-stone-950">
              {selectedItem.type === "image" ? (
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  priority={selectedIndex === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={selectedItem.poster}
                  className="h-full w-full object-cover"
                  aria-label={selectedItem.label}
                >
                  <source src={selectedItem.src} />
                  Your browser does not support embedded video.
                </video>
              )}
            </div>
          ) : (
            <FallbackBikeMedia accent={accent} bikeName={bikeName} />
          )}

          {items.length > 1 ? (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label={`${bikeName} media thumbnails`}>
              {items.map((item, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`${item.type}-${item.type === "image" ? item.src : item.label}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border text-left transition focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950 ${
                      isSelected ? "border-orange-300" : "border-white/10 hover:border-orange-300/70"
                    }`}
                    aria-label={`Show ${item.type === "image" ? item.alt : item.label}`}
                    aria-pressed={isSelected}
                  >
                    {item.type === "image" ? (
                      <Image src={item.src} alt="" fill sizes="112px" className="object-cover" />
                    ) : item.poster ? (
                      <Image src={item.poster} alt="" fill sizes="112px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-stone-950 px-2 text-center text-xs font-bold text-stone-300">
                        Video
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
