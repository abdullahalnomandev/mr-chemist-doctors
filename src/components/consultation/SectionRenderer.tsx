import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { SignaturePad } from "./SignaturePad"; // create your own component if needed
interface SectionRendererProps {
  section: any;
  control: any;
}

export default function SectionRenderer({ section, control }: SectionRendererProps) {
  return (
    <div className="mb-10">
      <h2 className="my-4 text-xl font-bold text-gray-800">{section.title}</h2>

      {section.description && (
        <div
          className="prose prose-sm mb-4 max-w-none text-black"
          dangerouslySetInnerHTML={{
            __html: section.description,
          }}
        />
      )}

      <div className="grid grid-cols-1 gap-y-6">
        {section.questions?.map((question: any) => {
          const fieldName = question._id;

          return (
            <FormField
              key={question._id}
              control={control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">{question.title}</FormLabel>
                  <FormControl>{renderQuestionInput(question, field)}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

function renderQuestionInput(question: any, field: any) {
  switch (question.type) {
    case "custom":
      return (
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="space-y-1">
            {(() => {
              switch (question.field) {
                case "birthSurname":
                case "email":
                case "first":
                case "last":
                case "country":
                case "postcode":
                case "city":
                case "address":
                  return (
                    <Input
                      type="text"
                      placeholder={`Enter ${question.field}`}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  );
                case "title":
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Title..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr</SelectItem>
                        <SelectItem value="ms">Ms</SelectItem>
                        <SelectItem value="dr">Dr</SelectItem>
                        <SelectItem value="mrs">Mrs</SelectItem>
                        <SelectItem value="miss">Mrs</SelectItem>
                        <SelectItem value="prof">Mrs</SelectItem>
                      </SelectContent>
                    </Select>
                  );

                case "phoneNumber":
                  return (
                    // <Input
                    //   type="tel"
                    //   placeholder="Enter phone number"
                    //   value={field.value ?? ""}
                    //   onChange={field.onChange}
                    //   pattern="[0-9]*"
                    // />
                    <PhoneInput
                      country={"bgd"}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      inputProps={{
                        // name: {field.name}
                        required: true,
                        autoFocus: true,
                      }}
                      enableSearch={true} // lets user search country
                    />
                  );

                case "dob":
                  return (
                    <Input
                      type="date"
                      placeholder="Select date of birth"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );

                case "gender":
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  );

                default:
                  return (
                    <Input
                      placeholder={`Enter ${question.field}`}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  );
              }
            })()}
          </div>
        </div>
      );

    case "text":
      if (question.multiple && !question?.isPatient) {
        const values: string[] = field.value ?? [];

        return (
          <div className="space-y-2">
            <Input
              placeholder="Type an answer and press enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const inputValue = e.currentTarget.value.trim();
                  if (inputValue) {
                    field.onChange([...values, inputValue]);
                    e.currentTarget.value = "";
                  }
                }
              }}
            />

            <ul className="divide-y overflow-hidden rounded-md border">
              {values.length > 0 ? (
                values.map((val, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2">
                    <span>{val}</span>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        const newValues = values.filter((_, i) => i !== index);
                        field.onChange(newValues);
                      }}
                    >
                      ✖
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-center text-gray-400">No answers yet</li>
              )}
            </ul>
          </div>
        );
      }
      return <Input placeholder="Your answer" value={field.value ?? ""} onChange={field.onChange} />;

    case "multiline": {
      if (question.multiple) {
        const values: string[] = field.value ?? [""]; // Initialize with one empty textarea

        const handleChange = (index: number, newValue: string) => {
          const updated = [...values];
          updated[index] = newValue;
          field.onChange(updated);
        };

        const handleAdd = () => {
          field.onChange([...values, ""]);
        };

        const handleRemove = (index: number) => {
          const updated = values.filter((_, i) => i !== index);
          field.onChange(updated);
        };

        return (
          <div className="space-y-4">
            {values.map((val, index) => (
              <div key={index} className="relative">
                <Textarea
                  value={val}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Type answer  and press Enter`}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border border-dashed border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              + Add New Answer
            </button>
          </div>
        );
      }
      return <Textarea placeholder="Your answer" value={field.value ?? ""} onChange={field.onChange} />;
    }

    case "snomed": {
      const loadOptions = async (inputValue: string) => {
        if (!inputValue) return [];
        try {
          const res = await fetch(
            `https://api.semble.io/statics/snomed?search=${encodeURIComponent(inputValue)}&type=${question.recordType}`,
          );
          const data = await res.json();
          return data.data.map((item: any) => ({
            label: item.term,
            value: item.conceptId,
            term: item.term,
            conceptId: item.conceptId,
          }));
        } catch (error) {
          console.error("Failed to fetch SNOMED options:", error);
          return [];
        }
      };

      // 🔁 MULTI SELECT
      if (question.multiple) {
        const handleChange = (selectedOptions: any[]) => {
          if (!selectedOptions || selectedOptions.length === 0) {
            return field.onChange([]);
          }

          const terms = selectedOptions.map((option: any) => option.label);
          field.onChange(terms);
        };

        const getValue = () => {
          if (!Array.isArray(field.value)) return [];

          return field.value.map((term: string) => ({
            label: term,
            value: term,
          }));
        };

        const handleRemove = (index: number) => {
          const updated = [...field.value];
          updated.splice(index, 1);
          field.onChange(updated);
        };

        return (
          <div className="space-y-2">
            <AsyncCreatableSelect
              isMulti
              isClearable
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={getValue()}
              onChange={(newValue: any) => handleChange(newValue)}
              placeholder="Type to search or create..."
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />

            <ul className="divide-y overflow-hidden rounded-md border">
              {field.value?.length > 0 ? (
                field.value.map((term: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-white px-4 py-2 text-sm text-gray-800"
                  >
                    <span className="truncate">{term}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(index)}
                    >
                      ✖
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-center text-gray-400">No terms selected</li>
              )}
            </ul>
          </div>
        );
      }

      // 🔘 SINGLE SELECT (fallback)
      const handleChange = (selectedOption: any) => {
        if (!selectedOption) return field.onChange(null);
        field.onChange(selectedOption.label);
      };

      const getValue = () => {
        if (!field.value) return null;
        return {
          label: field.value,
          value: field.value,
        };
      };

      return (
        <div className="space-y-2">
          <AsyncCreatableSelect
            isClearable
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            value={getValue()}
            onChange={handleChange}
            placeholder="Type to search or create..."
            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
          />
        </div>
      );
    }

    case "date": {
      if (question.multiple) {
        const values: string[] = field.value ?? [""];

        const handleChange = (index: number, newDate: string) => {
          const updated = [...values];
          // Convert date string to ISO format
          const isoDate = new Date(newDate).toISOString();
          updated[index] = isoDate;
          field.onChange(updated);
        };

        const handleAdd = () => field.onChange([...values, ""]);
        const handleRemove = (index: number) => field.onChange(values.filter((_, i) => i !== index));

        return (
          <div className="space-y-4">
            {values.map((val, index) => (
              <div key={index} className="relative">
                <Input
                  type="date"
                  value={val ? new Date(val).toISOString().split("T")[0] : ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border border-dashed border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              + Add Another Date
            </button>
          </div>
        );
      }

      // Single date input
      return (
        <Input
          type="date"
          value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
          onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
        />
      );
    }

    case "fileUpload": {
      const encode = (file: File): Promise<{ data: string; fileName: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve({ data: reader.result as string, fileName: file.name });
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const values: { data: string; fileName: string }[] = field.value ?? [];

      const handleChange = async (file: File) => {
        const encoded = await encode(file);
        field.onChange([...values, encoded]);
      };

      const handleRemove = (index: number) => {
        field.onChange(values.filter((_, i) => i !== index));
      };

      return (
        <div className="space-y-4">
          <Input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) await handleChange(file);
              e.target.value = ""; // Reset so same file can be reuploaded
            }}
          />
          <ul className="divide-y overflow-hidden rounded-md border">
            {values.length > 0 ? (
              values.map((file, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-2">
                  <span className="truncate">{file.fileName}</span>
                  <button type="button" className="text-red-600 hover:text-red-800" onClick={() => handleRemove(index)}>
                    ✖
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-center text-gray-400">No files uploaded</li>
            )}
          </ul>
        </div>
      );
    }

    case "signature":
      return <SignaturePad {...field} />;
    case "option":
      if (question.multiple) {
        return (
          <div className="flex flex-col gap-2">
            {question.answers.map((answer: string) => (
              <label key={answer} className="flex items-center gap-2">
                <Checkbox
                  checked={field.value?.includes?.(answer) || false}
                  onCheckedChange={(checked) => {
                    const value = field.value ?? [];
                    if (checked) {
                      field.onChange([...value, answer]);
                    } else {
                      field.onChange(value.filter((v: string) => v !== answer));
                    }
                  }}
                />
                <span>{answer}</span>
              </label>
            ))}
          </div>
        );
      } else {
        return (
          <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="flex flex-col gap-2">
            {question.answers.map((answer: string) => (
              <label key={answer} className="flex items-center gap-2">
                <RadioGroupItem value={answer} />
                <span>{answer}</span>
              </label>
            ))}
          </RadioGroup>
        );
      }

    case "relationship": {
      if (question.relationshipType === "GP") {
        // Hardcoded list of GP data
        const gpList = [
          {
            nhsId: "A81001",
            name: "The Densham Surgery",
            line1: "The Health Centre",
            line2: "Lawson Street",
            line3: "Stockton-on-Tees",
            line4: "Cleveland",
            postcode: "TS18 1HU",
            phone: "01642672351",
          },
          {
            nhsId: "A81002",
            name: "Queens Park Medical Centre",
            line1: "Queens Park Medical Ctr",
            line2: "Farrer Street",
            line3: "Stockton-on-Tees",
            line4: "Cleveland",
            postcode: "TS18 2AW",
            phone: "01642618170",
          },
          {
            nhsId: "A81004",
            name: "Acklam Medical Centre",
            line1: "Trimdon Avenue",
            line2: "Acklam",
            line3: "Middlesbrough",
            line4: "Cleveland",
            postcode: "TS5 8SB",
            phone: "01642827697",
          },
          {
            nhsId: "A81005",
            name: "Springwood Surgery",
            line1: "Springwood Surgery",
            line2: "Rectory Lane",
            line3: "Guisborough",
            line4: "",
            postcode: "TS14 7DJ",
            phone: "01287619611",
          },
        ];

        // const { data: searchResults, isLoading: isSearchLoading } = useQuery({
        //   queryKey: ["products-search", debouncedSearchQuery],
        //   queryFn: () => gpList({ searchTerm: debouncedSearchQuery }),
        //   enabled: debouncedSearchQuery.length > 2,
        // });
        // Preprocess GP list to add searchBlob
        const enhancedGpList = gpList.map((gp) => ({
          ...gp,
          searchBlob: [gp.nhsId, gp.name, gp.line1, gp.line2, gp.line3, gp.line4, gp.postcode, gp.phone]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
        }));

        // Load & filter options
        const loadOptions = async (inputValue: string) => {
          if (!inputValue) return [];

          const search = inputValue.toLowerCase();

          return enhancedGpList
            .filter((gp) => gp.searchBlob.includes(search))
            .map((gp) => {
              const address = [gp.line1, gp.line2, gp.line3, gp.line4].filter(Boolean).join(", ");
              return {
                label: `${gp.name} — ${gp.postcode}`,
                value: gp.nhsId,
                nhsId: gp.nhsId,
                name: gp.name,
                address,
                postcode: gp.postcode,
                phone: gp.phone,
                searchTerm: inputValue, // Store original user search term
              };
            });
        };

        const handleChange = (selectedOption: any) => {
          if (!selectedOption) return field.onChange(null);

          field.onChange({
            nhsId: selectedOption.nhsId || selectedOption.value,
            searchTerm: selectedOption.searchTerm || selectedOption.label,
          });
        };

        const getValue = () => {
          if (!field.value) return null;
          const matched = gpList.find((gp) => gp.nhsId === field.value.nhsId);
          if (!matched) return null;

          return {
            label: `${matched.name} — ${matched.postcode}`,
            value: matched.nhsId,
            nhsId: matched.nhsId,
            name: matched.name,
            address: [matched.line1, matched.line2, matched.line3, matched.line4].filter(Boolean).join(", "),
            postcode: matched.postcode,
            phone: matched.phone,
            searchTerm: field.value.searchTerm,
          };
        };

        return (
          <div className="space-y-2">
            <AsyncSelect
              isClearable
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={getValue()}
              onChange={handleChange}
              placeholder="Type to search GP..."
              noOptionsMessage={({ inputValue }) =>
                inputValue ? "No matching results in the Directory" : "Type to search..."
              }
              formatOptionLabel={(e) => (
                <div>
                  <strong>{e.name}</strong>
                  <div style={{ fontSize: 16, color: "#666" }}>
                    {[e.address, e.postcode].filter(Boolean).join(" — ")}
                  </div>
                  {e.phone && (
                    <div style={{ fontSize: 16, color: "#666" }}>
                      Phone: <span className="text-gray-500">{e.phone}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        );
      } else {
        const value = field.value ?? {};
        return (
          <div className="space-y-4">
            {/* Name fields group if either first or last name is enabled */}
            {(question.relationshipFirst || question.relationshipLast) && (
              <div className="space-y-2">
                <FormLabel>Name</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {question.relationshipFirst && (
                    <div>
                      <FormLabel className="text-muted-foreground text-sm">First Name</FormLabel>
                      <Input
                        placeholder="First Name"
                        value={value.relationshipFirst ?? ""}
                        onChange={(e) => field.onChange({ ...value, relationshipFirst: e.target.value })}
                      />
                    </div>
                  )}
                  {question.relationshipLast && (
                    <div>
                      <FormLabel className="text-muted-foreground text-sm">Last Name</FormLabel>
                      <Input
                        placeholder="Last Name"
                        value={value.relationshipLast ?? ""}
                        onChange={(e) => field.onChange({ ...value, relationshipLast: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {question.relationshipEmail && (
              <div className="space-y-2">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={value.relationshipEmail ?? ""}
                  onChange={(e) => field.onChange({ ...value, relationshipEmail: e.target.value })}
                />
              </div>
            )}

            {question.relationshipAddress && (
              <div className="space-y-2">
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Address"
                  value={value.relationshipAddress ?? ""}
                  onChange={(e) => field.onChange({ ...value, relationshipAddress: e.target.value })}
                />
              </div>
            )}

            {question.relationshipTelephone && (
              <div className="space-y-2">
                <FormLabel>Telephone</FormLabel>
                <Input
                  type="tel"
                  placeholder="Telephone"
                  value={value.relationshipTelephone ?? ""}
                  onChange={(e) => field.onChange({ ...value, relationshipTelephone: e.target.value })}
                />
              </div>
            )}

            {question.relationshipCompany && (
              <div className="space-y-2">
                <FormLabel>Company</FormLabel>
                <Input
                  placeholder="Company"
                  value={value.relationshipCompany ?? ""}
                  onChange={(e) => field.onChange({ ...value, relationshipCompany: e.target.value })}
                />
              </div>
            )}

            {question.relationshipInsurerPolicyNumber && (
              <div className="space-y-2">
                <FormLabel>Insurer Policy Number</FormLabel>
                <Input
                  placeholder="Policy Number"
                  value={value.relationshipInsurerPolicyNumber ?? ""}
                  onChange={(e) => field.onChange({ ...value, relationshipInsurerPolicyNumber: e.target.value })}
                />
              </div>
            )}

            {question.relationshipInsurerAuthorizationCode && (
              <div className="space-y-2">
                <FormLabel>Insurer Authorization Code</FormLabel>
                <Input
                  placeholder="Authorization Code"
                  value={value.insurerAuthorizationCode ?? ""}
                  onChange={(e) => field.onChange({ ...value, insurerAuthorizationCode: e.target.value })}
                />
              </div>
            )}
          </div>
        );
      }
    }

    default:
      return <Input placeholder="Unsupported question type" disabled />;
  }
}
