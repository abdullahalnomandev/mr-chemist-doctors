// components/SignaturePad.tsx
import React, { useRef } from "react";
import * as SignaturePadImport from "react-signature-canvas";

const SignatureCanvas = (SignaturePadImport as any).default;

interface SignaturePadProps {
  onChange: (dataUrl: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onChange }) => {
  const sigCanvas = useRef<any>(null);

  const handleClear = () => {
    sigCanvas.current?.clear();
    onChange(""); // Clear base64 when signature is cleared
  };

  const handleEnd = () => {
    const dataUrl = sigCanvas.current?.toDataURL("image/png") || "";
    onChange(dataUrl);
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        onEnd={handleEnd}
        canvasProps={{
          width: 400,
          height: 150,
          className: "border rounded-md bg-white",
        }}
      />
      <div className="mt-2 flex justify-between">
        <button type="button" onClick={handleClear} className="text-sm text-red-500 hover:underline">
          Clear Signature
        </button>
      </div>
    </div>
  );
};
