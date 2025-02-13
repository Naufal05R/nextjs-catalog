import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResponsiveArgs } from "@/types/carousel";
import { Button } from "@/components/ui/button";
import { Dataset } from "@/types/data";
import { cn } from "@/lib/utils";

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
  ({ orientation = "horizontal", opts, setCarouselApi, plugins, slides, children, ...props }, ref) => {
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
        <div ref={ref} onKeyDownCapture={handleKeyDown} role="region" aria-roledescription="carousel" {...props}>
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
    <div
      ref={carouselRef}
      className={cn(orientation === "horizontal" ? "overflow-x-clip" : "overflow-y-clip", classNames?.outer)}
    >
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

interface CarouselControllerProps extends React.ComponentProps<typeof Button> {
  controller?: React.JSX.Element;
  placement?: "inside" | "outside";
}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselControllerProps>(
  ({ className, variant = null, size = "icon", placement = "outside", controller, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute flex size-8 rounded-full transition-opacity",
          {
            "top-1/2 -translate-y-1/2": orientation === "horizontal",
            "-left-8 lg:-left-12": orientation === "horizontal" && placement === "outside",
            "left-2 lg:left-4": orientation === "horizontal" && placement === "inside",
            "left-1/2 -translate-x-1/2 rotate-90": orientation === "vertical",
            "-top-8 lg:-top-12": orientation === "vertical" && placement === "outside",
            "top-2 lg:top-4": orientation === "vertical" && placement === "inside",
          },
          { "disabled:opacity-0": !canScrollPrev },
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        {controller || (
          <ChevronLeft
            strokeWidth={0.5}
            className={cn("min-h-full min-w-full", { "-ml-[3px] text-slate-100/75": placement === "inside" })}
          />
        )}
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselControllerProps>(
  ({ className, variant = null, size = "icon", placement = "outside", controller, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full transition-opacity",
          {
            "bottom-1/2 translate-y-1/2": orientation === "horizontal",
            "-right-8 lg:-right-12": orientation === "horizontal" && placement === "outside",
            "right-2 lg:right-4": orientation === "horizontal" && placement === "inside",
            "right-1/2 translate-x-1/2 rotate-90": orientation === "vertical",
            "-bottom-8 lg:-bottom-12": orientation === "vertical" && placement === "outside",
            "bottom-2 lg:bottom-4": orientation === "vertical" && placement === "inside",
          },
          { "disabled:opacity-0": !canScrollNext },
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        {controller || (
          <ChevronRight
            strokeWidth={0.5}
            className={cn("min-h-full min-w-full", { "-mr-[3px] text-slate-100/75": placement === "inside" })}
          />
        )}
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

interface CarouselDotProps extends React.ComponentProps<typeof Button> {
  index: number;
}

export const CarouselDot = React.forwardRef<HTMLButtonElement, CarouselDotProps>(
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
          "min-w-0 shrink-0 grow-0 [&_svg]:size-auto",
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
  dots?: React.JSX.Element;
  classNames?: {
    wrapper?: string;
    container?: string;
    dots?: string;
  };
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(({ dots, classNames }, ref) => {
  const { dotsRef, orientation } = useCarousel();

  return (
    <div
      className={cn(
        "mt-4 w-full",
        orientation === "horizontal" ? "overflow-x-clip" : "overflow-y-clip",
        classNames?.wrapper,
      )}
      ref={dotsRef}
    >
      <div className={cn("flex items-stretch gap-x-2", classNames?.container)} ref={ref}>
        {dots}
      </div>
    </div>
  );
});
CarouselDots.displayName = "CarouselDots";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
