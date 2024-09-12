import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeViewComponent from "./components/image";

interface ImageOptions {
  src: string;
  HTMLAttributes: Record<string, any>;
}

export default Node.create<ImageOptions>({
  name: "image",
  group: "block",
  content: "inline*",
  draggable: true,
  addOptions() {
    return {
      src: "",
      HTMLAttributes: {
        class: null,
      },
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML(element) {
          return element.getAttribute("src");
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

          // prevent XSS attacks
          // if (!href || !isAllowedUri(href, this.options.protocols)) {
          //   return false;
          // }
          return null;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes, node }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeViewComponent);
  },
});
