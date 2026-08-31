import {
  CarouselCardDemoMedia,
  carouselCardDemoAction,
  carouselCardDemoCompactItems,
  carouselCardDemoDescription,
  carouselCardDemoEyebrow,
  carouselCardDemoLongAction,
  carouselCardDemoLongDescription,
  carouselCardDemoTitle,
} from "../CarouselCard/carouselCardDemo";
import type { CarouselItem } from "./Carousel";

export const carouselDemoItems: CarouselItem[] = [
  {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoDescription,
    eyebrow: carouselCardDemoEyebrow,
    id: "oncology-outlook",
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoTitle,
  },
  {
    actionLabel: carouselCardDemoLongAction,
    description: carouselCardDemoLongDescription,
    eyebrow: carouselCardDemoCompactItems[0].eyebrow,
    id: "cell-therapy",
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoCompactItems[0].title,
  },
  {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoDescription,
    eyebrow: carouselCardDemoCompactItems[1].eyebrow,
    id: "pipeline-catalysts",
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoCompactItems[1].title,
  },
  {
    actionLabel: carouselCardDemoLongAction,
    description: carouselCardDemoLongDescription,
    eyebrow: carouselCardDemoCompactItems[2].eyebrow,
    id: "manufacturing",
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoCompactItems[2].title,
  },
];

export const carouselDemoFewItems = carouselDemoItems.slice(0, 2);

export const carouselDemoWithoutMedia: CarouselItem[] = carouselDemoItems.map(
  ({ media: _media, ...item }) => item,
);
