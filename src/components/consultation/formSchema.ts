import { z } from "zod";
import { Section } from './StepperForm';

export function generateSchemaFromSections(section: Section) {
    const shape: Record<string, z.ZodTypeAny> = {};
  
    section.questions.forEach((question) => {
      const key = question._id;
      const required = question.required;
      let fieldSchema: z.ZodTypeAny;
  
      switch (question.type) {
        case "option":
          fieldSchema = question.multiple ? z.array(z.string()) : z.string();
          break;
  
        case "text":
        case "multiline":
          fieldSchema = question.multiple ? z.array(z.string().min(1)) : z.string().min(1).max(255);
          break;
  
        case "date":
          fieldSchema = question.multiple
            ? z.array(z.string().datetime({ offset: true }))
            : z.string().datetime({ offset: true });
          break;
  
        case "fileUpload":
          fieldSchema = z.array(
            z.object({
              data: z.string().min(1),
              fileName: z.string().min(1),
            }),
          );
          break;
  
        case "relationship":
          fieldSchema =
            question.relationshipType === "GP"
              ? z.object({
                  nhsId: z.string().min(1),
                  searchTerm: z.string().min(1),
                })
              : z.record(z.string().min(1));
          break;
  
        case "snomed":
          fieldSchema = question.multiple ? z.array(z.string()) : z.string();
          break;
  
        case "signature":
          fieldSchema = z.string();
          break;
  
        case "custom":
          switch (question.field) {
            case "birthSurname":
            case "title":
            case "first":
            case "last":
            case "country":
            case "postcode":
            case "city":
            case "address":
              fieldSchema = z.string().min(1);
              break;
  
            case "email":
              fieldSchema = z.string().email();
              break;
  
            case "phoneNumber":
              fieldSchema = z.string().regex(/^[0-9]+$/, "Phone number must contain only digits");
              break;
  
            case "dob":
              fieldSchema = z.string().date(); // or use `.datetime({ offset: true })` if ISO string is used
              break;
  
            case "gender":
              fieldSchema = z.enum(["male", "female", "other"]);
              break;
  
            default:
              fieldSchema = z.string();
              break;
          }
          break;
  
        default:
          fieldSchema = z.any();
      }
  
      shape[key] = required ? fieldSchema : fieldSchema.optional();
    });
  
    return z.object(shape);
  }