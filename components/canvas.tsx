import React from "react";

type CanvasType = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { draw: (ctx: CanvasRenderingContext2D) => void };

const Canvas = ({ draw, ...props }: CanvasType) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
