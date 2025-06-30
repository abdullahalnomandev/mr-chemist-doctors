"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayImages = images.length > 0 ? images : ["/placeholder.svg"];

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? displayImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === displayImages.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full space-y-2">
      {/* Main Image Display */}
      <div className="bg-secondary relative overflow-hidden rounded-2xl shadow-xs transition-all duration-300 ease-in-out">
        <div
          className={cn(
            "relative aspect-square w-full cursor-pointer",
            isZoomed ? "scale-110" : "",
            "transition-transform duration-300 ease-in-out",
          )}
          onClick={toggleZoom}
        >
          <Image
            src={displayImages[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {!isZoomed && (
          <button
            onClick={openModal}
            className="focus:ring-primary absolute right-4 bottom-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="hover:bg-primary focus:ring-primary absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all duration-200 ease-in-out hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={goToNext}
              className="hover:bg-primary focus:ring-primary absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all duration-200 ease-in-out hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="scrollbar-hide flex space-x-3 overflow-x-auto p-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "group relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ease-in-out",
                currentIndex === index ? "border-primary shadow-md" : "border-gray-200 hover:border-gray-300",
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain p-1 transition-transform duration-200 ease-in-out group-hover:scale-105"
                />
              </div>
              {currentIndex === index && (
                <div className="ring-primary absolute inset-0 animate-pulse rounded-lg opacity-70 ring-2 ring-offset-2"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal for Zoom */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0">
          {/* Add DialogTitle with VisuallyHidden for accessibility */}
          <DialogTitle asChild>
            <VisuallyHidden>Product Image Viewer</VisuallyHidden>
          </DialogTitle>

          <div className="relative h-[80vh] w-full">
            <Image
              src={displayImages[currentIndex]}
              alt={`Product image ${currentIndex + 1} - Fullscreen`}
              fill
              className="object-contain"
            />
          </div>
          {displayImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="focus:ring-primary absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 shadow-lg transition-colors duration-200 ease-in-out hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label="Previous image in modal"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>

              <button
                onClick={goToNext}
                className="focus:ring-primary absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 shadow-lg transition-colors duration-200 ease-in-out hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label="Next image in modal"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
