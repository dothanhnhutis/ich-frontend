import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeViewComponent from "./components/image";

interface ImageOptions {
  width: number;
  alignment: "left" | "center" | "right";
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      insertImage: () => ReturnType;
    };
  }
}
export default Node.create<ImageOptions>({
  name: "image",
  group: "block",
  atom: true,
  draggable: true,
  addOptions() {
    return {
      alignment: "center",
      width: 75,
      HTMLAttributes: {
        class: null,
        src: null,
        alt: "",
      },
    };
  },
  addAttributes() {
    return {
      alt: {
        default: this.options.HTMLAttributes.alt,
        parseHTML(element) {
          return element.getAttribute("alt");
        },
      },
      src: {
        default: this.options.HTMLAttributes.src,
        parseHTML(element) {
          return element.getAttribute("src");
        },
      },
      width: {
        default: this.options.width,
        parseHTML(element) {
          return element.getAttribute("data-width");
        },
        renderHTML(attributes) {
          return {
            "data-width": attributes.width,
          };
        },
      },
      alignment: {
        default: this.options.alignment,
        parseHTML(element) {
          return element.getAttribute("data-align");
        },
        renderHTML(attributes) {
          return {
            "data-align": attributes.alignment,
          };
        },
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "image-upload[src]",
        getAttrs: (dom) => {
          const src = dom.getAttribute("src");
          if (src == null) return false;
          return null;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes, node }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeViewComponent);
  },
  addCommands() {
    return {
      insertImage:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: "image",
            attrs: {
              alt: "title",
              src: "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1724856849/cover_photo.jpg",
              width: 50,
              alignment: "center",
            },
          });
        },
    };
  },
});
