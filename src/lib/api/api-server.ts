"use server";
// write all the function that is going to be used on server component to fetch data

import { IGpsPractice, TBlog, TConsultation, TFeaturedTreatment, TObject, TProduct, TTreatment } from "@/lib/types";
import { apiUrl, getUrlWithBaseAddress } from "../api-url";
import { makeUrlSearchParam } from "../utils";

const CACHE_DURATION = {
  SHORT: 600, // 10 min
  MID: 3600, // 1 hour
  LARGE: 21600, // 6 hours
};

// ------------- TREATMENT ------------- \\
export const getFeaturedTreatments = async (): Promise<TFeaturedTreatment[]> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getFeaturedTreatments), {
      next: { revalidate: CACHE_DURATION.SHORT },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

export const getTreatments = async (): Promise<TTreatment[]> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getTreatments), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

export const getTreatmentBySlug = async (slug: string): Promise<TTreatment | null> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getTreatmentBySlug(slug)), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return null;
  }
};

// ------------- CONSULTATION ------------- \\

export const getConsultationBySlug = async (slug: string): Promise<TConsultation | null> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getConsultationBySlug(slug)), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return null;
  }
};

// ------------- PRODUCT ------------- \\

type TProductShortDetails = Pick<TProduct, "_id" | "name" | "slug" | "basePrice" | "keyPoints" | "imageUrls">;

export const getFeaturedProducts = async (): Promise<TProductShortDetails[]> => {
  try {
    const queryParams = { fields: "name, slug, keyPoints, basePrice, imageUrls" };
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getProducts(makeUrlSearchParam(queryParams))), {
      next: { revalidate: CACHE_DURATION.SHORT },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

export const getProducts = async (query: TObject): Promise<TProduct[]> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getProducts(makeUrlSearchParam(query))), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

type TProductDetails = TProduct & { treatment: TTreatment };

export const getProductBySlug = async (slug: string): Promise<TProductDetails | null> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getProductBySlug(slug)), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return null;
  }
};

export const getProductByTreatment = async (treatmentId: string): Promise<TProductDetails | null> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getProductsByTreatment(treatmentId)), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return null;
  }
};

// ------------- BLOG ------------- \\
export const getBlogs = async (): Promise<TBlog[]> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getBlogs), {
      next: { revalidate: CACHE_DURATION.SHORT },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

  export const getBlogBySlug = async (slug: string): Promise<TBlog | null> => {
    try {
      const response = await fetch(getUrlWithBaseAddress(apiUrl.getBlogBySlug(slug)), {
        next: { revalidate: CACHE_DURATION.MID },
      });
  
      const responseData = await response.json();
      return responseData?.data;
    } catch {
      return null;
    }
  };


  // ------------- gps api ------------- \\

export const geTgpList= async (query: TObject): Promise<IGpsPractice[]> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getGpsList(makeUrlSearchParam(query))), {
      next: { revalidate: CACHE_DURATION.MID },
    });

    const responseData = await response.json();
    return responseData?.data;
  } catch {
    return [];
  }
};

//   ------------- Review api ------------- \\

export const getAllReviewsByProduct = async (productId: string): Promise<TProductDetails | null> => {
  try {
    const response = await fetch(getUrlWithBaseAddress(apiUrl.getReviewsByProduct(productId)), {
      next: { revalidate: CACHE_DURATION.MID },
    });
    

    const responseData = await response.json();
    console.log({responseData});
    return responseData?.data;
  } catch {
    return null;
  }
};