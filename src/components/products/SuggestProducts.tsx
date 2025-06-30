import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getProductByTreatment } from "@/lib/api/api-server";
import { SectionDescription, SectionTitle } from "../home/shared";
import { ProductCard } from "../shared/product-card";

interface SuggestProductProps {
  title: string;
  treatmentId: string;
  description: string;
}

type ProductVariant = {
  type: string;
  value: string;
  unit: string;
  price: number;
  stock: number;
  _id: string;
};

type IProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  variants: ProductVariant[];
  imageUrls: string[];
  treatment: string;
  needConsultation: boolean;
  keyPoints: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function SuggestProduct({ title, description, treatmentId }: SuggestProductProps) {
  const productsData = await getProductByTreatment(treatmentId);

  const products = (productsData ?? []) as IProduct[];

  if (!products.length) return null;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 sm:px-16">
      <div className="mb-8 py-1 text-center">
        <SectionTitle title={title} className="py-2 text-4xl font-bold" />
        <SectionDescription description={description} />
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map(({ _id, name, slug, imageUrls, basePrice, keyPoints }) => (
              <CarouselItem key={_id} className="pl-4 md:basis-1/3">
                <ProductCard
                  name={name}
                  slug={slug}
                  imageUrls={imageUrls}
                  basePrice={basePrice}
                  keyPoints={keyPoints}
                  // remove _id below if your ProductCard does not accept it
                  _id={_id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-0 h-8 w-8 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
          <CarouselNext className="absolute top-1/2 right-0 h-8 w-8 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}
