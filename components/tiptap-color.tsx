import React from "react";
import { Editor } from "@tiptap/react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { useStore } from "@/hook/useStore";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn, convertHexToRGBA, convertRGBAToHex } from "@/lib/utils";
import {
  CircleOffIcon,
  HighlighterIcon,
  PaletteIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

type ColorMetadata = {
  color?: RgbaColor | undefined;
  tempColorRGBA: RgbaColor;
  tempColorHex: string;
  open: boolean;
  storeData: RgbaColor[];
  clearColor: boolean;
};
const hexRegex =
  /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const colorRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
const defaultStoreData: RgbaColor[] = [
  { r: 36, g: 86, b: 184, a: 1 },
  { r: 255, g: 0, b: 0, a: 1 },
  { r: 217, g: 249, b: 157, a: 1 },
  { r: 165, g: 243, b: 252, a: 1 },
  { r: 165, g: 180, b: 252, a: 1 },
  { r: 126, g: 211, b: 33, a: 1 },
];

const defaultRGBA: RgbaColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

const TiptapColor = ({
  editor,
  type,
  storeKey,
}: {
  editor: Editor;
  type: "textstyle" | "highlight";
  storeKey?: string;
}) => {
  const [storeData, setStoreData] = useStore(storeKey || type);
  const [colorData, setColorData] = React.useState<ColorMetadata>(() => {
    let result: ColorMetadata = {
      open: false,
      color: undefined,
      clearColor: true,
      tempColorRGBA: defaultRGBA,
      tempColorHex: convertRGBAToHex(defaultRGBA),
      storeData: [],
    };
    if (storeData == null) {
      setStoreData(JSON.stringify(defaultStoreData));
      result.storeData = defaultStoreData;
    } else {
      result.storeData = JSON.parse(storeData);
    }
    return result;
  });

  editor.on("selectionUpdate", ({ editor }) => {
    if (
      (type == "textstyle" && editor.getAttributes("textStyle").color) ||
      (type == "highlight" && editor.getAttributes("highlight").color)
    ) {
      const color: string =
        type == "textstyle"
          ? editor.getAttributes("textStyle").color
          : editor.getAttributes("highlight").color;
      const colorMatch = color.match(colorRegex);

      setColorData((prev) => ({
        ...prev,
        clearColor: false,
        color: {
          r: parseInt(colorMatch?.[1] || "0"),
          g: parseInt(colorMatch?.[2] || "0"),
          b: parseInt(colorMatch?.[3] || "0"),
          a: parseFloat(colorMatch?.[4] || "1"),
        },
        tempColorRGBA: {
          r: parseInt(colorMatch?.[1] || "0"),
          g: parseInt(colorMatch?.[2] || "0"),
          b: parseInt(colorMatch?.[3] || "0"),
          a: parseFloat(colorMatch?.[4] || "1"),
        },
        tempColorHex: convertRGBAToHex({
          r: parseInt(colorMatch?.[1] || "0"),
          g: parseInt(colorMatch?.[2] || "0"),
          b: parseInt(colorMatch?.[3] || "0"),
          a: parseFloat(colorMatch?.[4] || "1"),
        }),
      }));
    } else {
      setColorData((prev) => ({
        ...prev,
        clearColor: false,
        color: undefined,
      }));
    }
  });

  const handleSetColor = ({ r, g, b, a }: RgbaColor) => {
    if (type == "textstyle") {
      editor.commands.setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    } else {
      editor.commands.setHighlight({
        color: `rgba(${r}, ${g}, ${b}, ${a})`,
      });
    }
    setColorData((prev) => ({
      ...prev,
      clearColor: false,
      tempColorRGBA: { r, g, b, a },
      tempColorHex: convertRGBAToHex({ r, g, b, a }),
    }));
  };

  React.useEffect(() => {
    if (hexRegex.test(colorData.tempColorHex) && !colorData.clearColor) {
      const { r, g, b, a } = convertHexToRGBA(colorData.tempColorHex);
      if (type == "textstyle") {
        editor.commands.setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
      } else {
        editor.commands.setHighlight({
          color: `rgba(${r}, ${g}, ${b}, ${a})`,
        });
      }
      setColorData((prev) => ({
        ...prev,
        clearColor: false,
        tempColorRGBA: { r, g, b, a },
      }));
    }
  }, [colorData.tempColorHex, colorData.clearColor]);

  const handleAdd = () => {
    if (colorData.storeData.length < 13)
      setColorData((prev) => {
        setStoreData(JSON.stringify([...prev.storeData, prev.tempColorRGBA]));
        return {
          ...prev,
          storeData: [...prev.storeData, prev.tempColorRGBA],
        };
      });
  };

  const handleCancel = () => {
    if (colorData.color) {
      if (type == "textstyle") {
        editor.commands.setColor(
          `rgba(${colorData.color.r}, ${colorData.color.g}, ${colorData.color.b}, ${colorData.color.a})`
        );
      } else {
        editor.commands.setHighlight({
          color: `rgba(${colorData.color.r}, ${colorData.color.g}, ${colorData.color.b}, ${colorData.color.a})`,
        });
      }
    } else {
      editor.commands.unsetColor();
    }
    setColorData((prev) => ({ ...prev, open: false }));
  };

  const handleClearColor = () => {
    setColorData((prev) => ({
      ...prev,
      clearColor: true,
      tempColorRGBA: defaultRGBA,
      tempColorHex: convertRGBAToHex(defaultRGBA),
    }));
    if (type == "textstyle") {
      editor.commands.unsetColor();
    } else {
      editor.commands.unsetHighlight();
    }
  };

  const handleSave = () => {
    if (!colorData.clearColor) {
      if (type == "textstyle") {
        editor.commands.setColor(
          `rgba(${colorData.tempColorRGBA.r}, ${colorData.tempColorRGBA.g}, ${colorData.tempColorRGBA.b}, ${colorData.tempColorRGBA.a})`
        );
      } else {
        editor.commands.setHighlight({
          color: `rgba(${colorData.tempColorRGBA.r}, ${colorData.tempColorRGBA.g}, ${colorData.tempColorRGBA.b}, ${colorData.tempColorRGBA.a})`,
        });
      }
    }
    setColorData((prev) => ({
      ...prev,
      color: prev.tempColorRGBA,
      open: false,
    }));
  };

  const handleRemoveColor = (idx: number) => {
    setColorData((prev) => ({
      ...prev,
      storeData: prev.storeData.filter((_, index) => index !== idx),
    }));
  };

  const isSelected = React.useMemo(() => {
    return colorData.storeData.findIndex(
      (color) =>
        colorData.tempColorRGBA.r == color.r &&
        colorData.tempColorRGBA.g == color.g &&
        colorData.tempColorRGBA.b == color.b &&
        colorData.tempColorRGBA.a == color.a
    );
  }, [colorData.storeData, colorData.tempColorRGBA]);

  return (
    <Popover
      open={colorData.open}
      onOpenChange={(open) => setColorData((prev) => ({ ...prev, open }))}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex gap-3 items-center rounded-lg overflow-hidden p-2  flex-shrink-0 border",
            (type == "textstyle" && editor.isActive("textStyle")) ||
              (type == "highlight" && editor.isActive("highlight")) ||
              colorData.open
              ? "bg-secondary"
              : "hover:bg-secondary"
          )}
        >
          {type == "textstyle" ? (
            <PaletteIcon className="size-5 flex-shrink-0" />
          ) : (
            <HighlighterIcon className="size-5 flex-shrink-0" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto space-y-1">
        <p className="text-sm">{type == "textstyle" ? "Color" : "Highlight"}</p>
        <RgbaColorPicker
          color={colorData.tempColorRGBA}
          onChange={handleSetColor}
        />
        <div className="flex items-center flex-wrap max-w-[200px]">
          <button
            type="button"
            onClick={handleClearColor}
            className="p-1.5 hover:bg-secondary rounded"
          >
            <CircleOffIcon className="size-4 rounded" />
          </button>
          {colorData.storeData.map((color, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                handleSetColor(color);
              }}
              className={cn(
                "p-1 rounded",
                colorData.tempColorRGBA.r == color.r &&
                  colorData.tempColorRGBA.g == color.g &&
                  colorData.tempColorRGBA.b == color.b &&
                  colorData.tempColorRGBA.a == color.a
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              )}
            >
              <div
                style={{
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
                className={`size-5 rounded`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center w-[200px]">
          <input
            type="text"
            maxLength={9}
            placeholder="#000000"
            value={colorData.tempColorHex}
            onChange={(e) => {
              setColorData((prev) => ({
                ...prev,
                tempColorHex: e.target.value,
              }));
            }}
            className="bg-transparent w-full outline-0 text-sm border p-0.5 rounded h-[30px]"
          />
          <button
            type="button"
            className="p-1.5 hover:bg-secondary rounded border disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={isSelected != -1 || colorData.storeData.length == 13}
            onClick={handleAdd}
          >
            <PlusIcon className="size-4 rounded" />
          </button>
          <button
            type="button"
            className="p-1.5 hover:bg-secondary rounded border disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            onClick={() => handleRemoveColor(isSelected)}
            disabled={isSelected == -1}
          >
            <TrashIcon className="size-4 rounded" />
          </button>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="disabled:opacity-50 px-1 py-0.5 border rounded text-sm"
            type="button"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            type="button"
            className="px-1 py-0.5 border rounded text-sm bg-secondary"
            onClick={handleSave}
          >
            save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TiptapColor;
