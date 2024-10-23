import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Mapper from "../Mapper";
import { Dataset } from "@/types/data";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          selectedIndex,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

interface CarouselContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  classNames?: {
    inner?: string;
    outer?: string;
  };
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(({ classNames, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={cn("overflow-hidden", classNames?.outer)}>
      <div
        ref={ref}
        className={cn("-ml-4 flex", orientation === "horizontal" ? "flex-row" : "flex-col", classNames?.inner)}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

type ScreensSizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvailableSlidesPerView = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "1" | "2" | "3" | "4" | "5" | "6" | "12";
type SlidesPerView = { [key in ScreensSizes]?: AvailableSlidesPerView };

interface CarouselItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  slidesPerView?: SlidesPerView;
  classNames?: {
    inner?: string;
    outer?: string;
  };
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ slidesPerView: _slidesPerView, classNames, ...props }, ref) => {
    const { orientation } = useCarousel();

    const carouselItemRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const breakpoints: Array<{ name: ScreensSizes; query: string }> = [
        { name: "2xl", query: "(min-width: 1536px)" },
        { name: "xl", query: "(min-width: 1280px)" },
        { name: "lg", query: "(min-width: 1024px)" },
        { name: "md", query: "(min-width: 768px)" },
        { name: "sm", query: "(min-width: 640px)" },
        { name: "xs", query: "(min-width: 480px)" },
      ] as const;

      const mediaQueryLists = breakpoints.map(({ query }) => window.matchMedia(query));

      const getBreakpoint = () => {
        const activeBreakpoint = breakpoints.find((_, index) => mediaQueryLists[index].matches);
        return activeBreakpoint!.name;
      };

      const updateBreakpoint = () => {
        const currentBreakpoint = getBreakpoint();
        const breakpoints: Array<ScreensSizes> = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

        const slidesPerView: SlidesPerView = breakpoints.reduce((acc, breakpoint, index) => {
          acc[breakpoint] = _slidesPerView?.[breakpoint] ?? acc[breakpoints[index - 1]] ?? 1;
          return acc;
        }, {} as SlidesPerView);

        carouselItemRef.current?.setAttribute("style", `flex-basis: calc(100% / ${slidesPerView[currentBreakpoint]});`);
      };

      mediaQueryLists.forEach((mql) => {
        mql.addEventListener("change", updateBreakpoint);
      });

      updateBreakpoint();

      return () => {
        mediaQueryLists.forEach((mql) => {
          mql.removeEventListener("change", updateBreakpoint);
        });
      };
    });

    return (
      <div
        ref={carouselItemRef}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          classNames?.outer,
        )}
      >
        <div ref={ref} className={cn("size-full", classNames?.inner)} {...props} />
      </div>
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = null, size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute flex size-8 transition-opacity",
          orientation === "horizontal"
            ? "-left-8 top-1/2 -translate-y-1/2 lg:-left-12"
            : "-top-8 left-1/2 -translate-x-1/2 rotate-90 lg:-top-12",
          { "disabled:opacity-0": !canScrollPrev },
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ChevronLeft strokeWidth={0.5} className="min-h-full min-w-full" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = null, size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 transition-opacity",
          orientation === "horizontal"
            ? "-right-8 top-1/2 -translate-y-1/2 lg:-right-12"
            : "-bottom-8 left-1/2 -translate-x-1/2 rotate-90 lg:-bottom-12",
          { "disabled:opacity-0": !canScrollNext },
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ChevronRight strokeWidth={0.5} className="min-h-full min-w-full" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

interface CarouselDotProps extends React.ComponentProps<typeof Button> {
  index: number;
}

const CarouselDot = React.forwardRef<HTMLButtonElement, CarouselDotProps>(
  ({ className, variant = null, size = "icon", index, ...props }, ref) => {
    const { scrollTo, selectedIndex } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "flex h-2.5 w-2.5 rounded-full border-2 border-slate-200",
          {
            "bg-slate-200": selectedIndex === index,
            "bg-transparent": selectedIndex !== index,
          },
          className,
        )}
        onClick={() => scrollTo(index)}
        {...props}
      />
    );
  },
);
CarouselDot.displayName = "CarouselDot";

interface CarouselDotsProps {
  data: Dataset;
  classNames?: {
    wrapper?: string;
    dots?: string;
  };
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ data, classNames, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-x-2.5", classNames?.wrapper)}
        {...props}
      >
        <Mapper data={data} render={(_, index) => <CarouselDot index={index} className={cn("", classNames?.dots)} />} />
      </div>
    );
  },
);
CarouselDots.displayName = "CarouselDots";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
