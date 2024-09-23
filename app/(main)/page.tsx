"use client";
import React from "react";
import Image from "next/image";
import Canvas from "@/components/canvas";
// export default function Home() {
//   const [url, setUrl] = React.useState<string | null>();
//   const [image, setImage] = React.useState<HTMLImageElement | null>(null);

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
//     if (!file) return;
//     // const reader = new FileReader();
//     // reader.readAsDataURL(file);

//     // const url = URL.createObjectURL(file);
//     // console.log(url);
//     // setUrl(url);

//     const img = new Image({ alt: "", src: "" });
//     const reader = new FileReader();
//     reader.onload = (event: ProgressEvent<FileReader>) => {
//       img.src = event.target?.result as string;
//       img.onload = () => {
//         setImage(img);
//         if (canvasRef.current) {
//           const ctx = canvasRef.current.getContext("2d");
//           if (ctx) {
//             ctx.clearRect(
//               0,
//               0,
//               canvasRef.current.width,
//               canvasRef.current.height
//             );
//             ctx.drawImage(
//               img,
//               0,
//               0,
//               canvasRef.current.width,
//               canvasRef.current.height
//             );
//           }
//         }
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const drawArt = (ctx: CanvasRenderingContext2D) => {
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   return (
//     <div>
//       {url && (
//         <div className="relative h-[400px] max-w-screen-xl mx-auto">
//           <Image alt="upload" src={url} fill sizes="(min-width:400px) 400px" />
//         </div>
//       )}

//       <Canvas draw={drawArt} width={400} height={400} />

//       <label htmlFor="upload" className="block">
//         <span>upload</span>
//         <input
//           type="file"
//           name="upload"
//           id="upload"
//           className="hidden"
//           onChange={handleUpload}
//         />
//       </label>
//     </div>
//   );
// }

const ImageUploadAndEdit: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);

  // Handle image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img: HTMLImageElement = document.createElement("img");
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        img.src = event.target?.result as string;
        img.onload = () => {
          setImage(img);
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              ctx.drawImage(
                img,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle freehand drawing (scratch effect)
  const handleDrawing = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx && e.buttons === 1) {
        // Left mouse button pressed
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, false); // Drawing circles to simulate scratching
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fill();
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept="image/*" />
      <canvas
        ref={canvasRef}
        onMouseMove={handleDrawing}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default ImageUploadAndEdit;
