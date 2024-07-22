import { useState } from "react";
import CloudinaryUploadWidget from "./cloudinaryWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
// import "./styles.css";

export default function App() {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dcwglllgt");
  const [uploadPreset] = useState("aoh4fpwm");
  const folder = "vehicles";

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-gray-600 text-white p-6 w-full">
      <h3 className="text-4xl font-bold mb-6 text-center">Maximuas CarBook Upload Vehicles Images</h3>
      <div className="flex flex-col items-center mb-8">
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
        <p className="text-center mt-4">
          <a
            href="https://cloudinary.com/documentation/upload_widget"
            target="_blank"
            className="text-blue-300 underline"
          ><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Upload Widget User Guide</button>
           
          </a>
        </p>
        <p className="text-center mt-2">
          <a
            href="https://cloudinary.com/documentation/upload_widget_reference"
            target="_blank"
            className="text-blue-300 underline"
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Widget Reference</button>
            
          </a>
        </p>
      </div>
      <div className="max-w-screen-md mx-auto">
        {publicId && (
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
            className="rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
}