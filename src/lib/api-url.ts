
export const baseAddress = process.env.NEXT_PUBLIC_BASE_URL;
export const getUrlWithBaseAddress = (url: string) => baseAddress + url;

export const apiUrl = {
  // treatments
  getTreatments: `/treatments`,
  getFeaturedTreatments: `/treatments/featured`,
  getTreatmentBySlug: (slug: string) => `/treatments/${slug}`,
  // consultation
  getConsultationBySlug: (slug: string) => `/consultations/${slug}`,
  // products
  getProducts: (searchParams: string) => `/products${searchParams}`,
  getProductBySlug: (slug: string) => `/products/${slug}`,
  // blogs
  getBlogs: `/blogs`,
  getBlogBySlug: (slug: string) => `/blogs/${slug}`,
  // gps
  getGpsList: (searchParams: string) => `/practices${searchParams}`,
  getProductsByTreatment: (treatmentId: string) => `/products/products-by-treatment/${treatmentId}`,
  getReviewsByProduct: (productId: string) => `/reviews/reviews/${productId}`,

};
