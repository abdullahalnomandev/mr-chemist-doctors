// import StepperForm from "@/components/consultation/StepperForm";
// import axios from "axios";
// import React from "react";

// interface ConsultationPageProps {
//   consultationId: string;
// }

// const ConsultationPage: React.FC<ConsultationPageProps> = async ({ consultationId }) => {
//   const { data } = await axios.get(`https://api.semble.io/questionnaires/token/${consultationId}`);
//   const keyMap = {
//     showPatientBirthSurname: "birthSurname",
//     showPatientDateOfBirth: "dob",
//     showPatientEmail: "email",
//     showPatientAddress: "address",
//     showPatientGender: "gender",
//     showPatientPhone: "phoneNumber",
//     showPatientTitle: "title",
//   };

//   const patientFields = Object.entries(data.data)
//     .filter(([key, value]) => key.startsWith("showPatient") && value === true)
//     .map(([key]) => keyMap[key as keyof typeof keyMap])
//     .filter(Boolean); // Remove undefined if a key is missing in keyMap

//   const patientData = ["first", "last", ...patientFields, "country", "postcode", "city"];

//   const formatTitle = (str: string) =>
//     str
//       .replace(/([A-Z])/g, " $1") // Add space before capital letters
//       .replace(/^./, (s) => s.toUpperCase()) // Capitalize first character
//       .replace(/\b\w/g, (s) => s.toUpperCase()) // Capitalize each word
//       .trim();

//   const newCreate = patientData.map((field) => {
//     const base = {
//       _id: field,
//       title: formatTitle(field),
//       type: "custom",
//       multiple: false,
//       required: true,
//       field,
//       isPatient: true,
//     };

//     // If both first and last are present, override title for those
//     if (field === "first") {
//       return { ...base, title: "First Name" };
//     } else if (field === "last") {
//       return { ...base, title: "Last Name" };
//     } else if (field === "birthSurname") {
//       return { ...base, title: "Birth Surname" };
//     } else if (field === "dob") {
//       return { ...base, title: "Date of Birth" };
//     } else {
//       return base;
//     }

//     return base;
//   });

//   const createdSection = {
//     _id: "initial-section",
//     title: "Personal Information",
//     // description: "Patient Information Section",
//     // description: "Patient Information",
//     questions: newCreate,
//     dependentOn: null,
//     answer: null,
//     negate: false,
//   };

//   const handleSubmit = async (data: any) => {
//     "use server";

//     const consultation = {
//       ...data,
//       accountFeatures: data?.practice?.accountFeatures,
//     };
//     try {
//       const result = await axios.post(`https://api.semble.io/questionnaires/response/${consultationId}`, consultation, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-token": process.env.NEXT_PUBLIC_SEMBLE_AUTH_TOKEN,
//         },
//       });
//       return result.data;
//     } catch (error) {
//       return error;
//     }
//   };
//   return (
//     <div className="m-16 space-y-2 rounded-sm p-16 pt-1 shadow-md sm:mx-28 sm:shadow-lg">
//       <StepperForm
//         title={data?.data?.title}
//         submitHandler={handleSubmit}
//         sections={[createdSection, ...data?.data?.sections]}
//       />
//     </div>
//   );
// };

// export default ConsultationPage;
import StepperForm from "@/components/consultation/StepperForm";
import axios from "axios";
import React from "react";

interface ConsultationPageProps {
  consultationId: string;
}

const ConsultationPage: React.FC<ConsultationPageProps> = async ({ consultationId }) => {
  const { data } = await axios.get(`https://api.semble.io/questionnaires/token/${consultationId}`);

  const keyMap = {
    showPatientTitle: "title",
    showPatientBirthSurname: "birthSurname",
    showPatientDateOfBirth: "dob",
    showPatientEmail: "email",
    showPatientAddress: "address",
    showPatientGender: "gender",
    showPatientPhone: "phoneNumber",
  };

  const patientFields = Object.entries(data.data)
    .filter(([key, value]) => key.startsWith("showPatient") && value === true)
    .map(([key]) => keyMap[key as keyof typeof keyMap])
    .filter(Boolean);

  // Add manually required fields + dynamic fields
  const shownFieldsSet = new Set(["first", "last", ...patientFields, "country", "postcode", "city"]);

  // Preferred order of display
  const preferredOrder = [
    "title",
    "first",
    "last",
    "birthSurname",
    "dob",
    "email",
    "address",
    "city",
    "postcode",
    "country",
    "gender",
    "phoneNumber",
  ];

  const formatTitle = (field: string): string => {
    const customTitles: Record<string, string> = {
      title: "Title",
      first: "First Name",
      last: "Last Name",
      birthSurname: "Birth Surname",
      dob: "Date of Birth",
      email: "Email",
      address: "Address",
      country: "Country",
      gender: "Gender",
      postcode: "Postcode",
      city: "City",
      phoneNumber: "Phone Number",
    };
    return customTitles[field] || field;
  };

  const newCreate = preferredOrder
    .filter((field) => shownFieldsSet.has(field))
    .map((field) => ({
      _id: field,
      title: formatTitle(field),
      type: "custom",
      multiple: false,
      required: true,
      field,
      isPatient: true,
    }));

  const createdSection = {
    _id: "initial-section",
    title: "Personal Information",
    questions: newCreate,
    dependentOn: null,
    answer: null,
    negate: false,
  };

  const handleSubmit = async (formData: any) => {
    "use server";

    const consultation = {
      ...formData,
      accountFeatures: formData?.practice?.accountFeatures,
    };

    try {
      const result = await axios.post(`https://api.semble.io/questionnaires/response/${consultationId}`, consultation, {
        headers: {
          "Content-Type": "application/json",
          "x-token": process.env.NEXT_PUBLIC_SEMBLE_AUTH_TOKEN,
        },
      });
      return result.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="mx-auto my-4 max-w-3xl space-y-2 rounded-sm p-8 pt-1 shadow-md sm:shadow-lg">
      <StepperForm
        consultationId={consultationId}
        title={data?.data?.title}
        submitHandler={handleSubmit}
        sections={[createdSection, ...(data?.data?.sections || [])]}
      />
    </div>
  );
};

export default ConsultationPage;
