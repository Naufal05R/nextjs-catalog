import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import Mapper from "../server/Mapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dataset } from "@/types/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResponsiveArgs } from "@/types/carousel";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setCarouselApi?: (api: CarouselApi) => void;
  setDotsApi?: (api: CarouselApi) => void;
  slides: Dataset;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  dotsRef: ReturnType<typeof useEmblaCarousel>[0];
  carouselApi: ReturnType<typeof useEmblaCarousel>[1];
  dotsApi: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  slides: Dataset;
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
  ({ orientation = "horizontal", opts, setCarouselApi, plugins, className, slides, children, ...props }, ref) => {
    const [carouselRef, carouselApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [dotsRef, dotsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback(() => {
      if (carouselApi && dotsApi) {
        setSelectedIndex(carouselApi.selectedScrollSnap());
        setCanScrollPrev(carouselApi.canScrollPrev());
        setCanScrollNext(carouselApi.canScrollNext());
        dotsApi.scrollTo(carouselApi.selectedScrollSnap());
      }
    }, [carouselApi, dotsApi]);

    const scrollPrev = React.useCallback(() => {
      carouselApi?.scrollPrev();
    }, [carouselApi]);

    const scrollNext = React.useCallback(() => {
      carouselApi?.scrollNext();
    }, [carouselApi]);

    const scrollTo = React.useCallback(
      (index: number) => {
        if (carouselApi && dotsApi) {
          carouselApi.scrollTo(index);
        }
      },
      [carouselApi, dotsApi],
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
      if (carouselApi && setCarouselApi) {
        setCarouselApi(carouselApi);
      }
    }, [carouselApi, setCarouselApi]);

    React.useEffect(() => {
      if (carouselApi) {
        onSelect();
        carouselApi.on("reInit", onSelect);
        carouselApi.on("select", onSelect);

        return () => {
          carouselApi?.off("select", onSelect);
        };
      }
    }, [carouselApi, , onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          dotsRef,
          carouselApi,
          dotsApi,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          selectedIndex,
          canScrollPrev,
          canScrollNext,
          slides,
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

interface CarouselItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  responsiveArgs?: ResponsiveArgs;
  classNames?: {
    inner?: string;
    outer?: string;
  };
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ responsiveArgs, classNames, ...props }, ref) => {
    const { orientation } = useCarousel();

    const carouselItemRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        ref={carouselItemRef}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          classNames?.outer,
          responsiveArgs,
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
  ({ className, variant = null, size = null, index, ...props }, ref) => {
    const { scrollTo, selectedIndex } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0",
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
  el?: React.JSX.Element;
  classNames?: {
    wrapper?: string;
    container?: string;
    dots?: string;
  };
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(({ el, classNames, ...props }, ref) => {
  const { dotsRef, slides } = useCarousel();

  return (
    <div className={cn("mt-4 w-full overflow-hidden", classNames?.wrapper)} ref={dotsRef}>
      <div className={cn("flex items-stretch gap-x-2", classNames?.container)} ref={ref}>
        <Mapper
          data={slides}
          render={(_, index) => (
            <CarouselDot
              index={index}
              className={cn("aspect-square basis-9 border text-xl", classNames?.dots)}
              {...props}
            >
              {el}
            </CarouselDot>
          )}
        />
      </div>
    </div>
  );
});
CarouselDots.displayName = "CarouselDots";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
