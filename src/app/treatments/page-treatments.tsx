import { getTreatments } from "@/lib/api/api-server";
import Image from "next/image";
import Link from "next/link";

export default async function TreatmentsPage() {
  const treatments = await getTreatments();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Treatments</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <main className="my-12 space-y-12">
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Available Treatments</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {treatments.map((treatment) => (
                <Link href={`/treatments/${treatment.slug}`} key={treatment._id} className="group">
                  <div className="bg-card border-border overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="bg-muted relative aspect-video">
                      {treatment.logoUrl ? (
                        <Image src={treatment.logoUrl} alt={treatment.name} fill className="object-cover" />
                      ) : (
                        <div className="bg-primary/10 flex h-full w-full items-center justify-center">
                          <span className="text-primary">{treatment.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="group-hover:text-primary text-lg font-medium transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                        {treatment.description || "Consult with our experts about this treatment."}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
