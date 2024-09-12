import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import LinkNodeViewComponent from "./components/link";
export interface LinkProtocolOptions {
  /**
   * The protocol scheme to be registered.
   * @default '''
   * @example 'ftp'
   * @example 'git'
   */
  scheme: string;

  /**
   * If enabled, it allows optional slashes after the protocol.
   * @default false
   * @example true
   */
  optionalSlashes?: boolean;
}

interface LinkOptions {
  protocols: Array<LinkProtocolOptions | string>;
  HTMLAttributes: Record<string, any>;
}
const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

function isAllowedUri(
  uri: string | undefined,
  protocols?: LinkOptions["protocols"]
) {
  const allowedProtocols: string[] = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ];

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

  // eslint-disable-next-line no-useless-escape
  return (
    !uri ||
    uri
      .replace(ATTR_WHITESPACE, "")
      .match(
        new RegExp(
          `^(?:(?:${allowedProtocols.join(
            "|"
          )}):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))`,
          "i"
        )
      )
  );
}

// export default Node.create<LinkOptions>({
//   name: "linkcustom",
//   priority: 9999,
//   group: "inline",
//   inline: true,
//   marks: "_",
//   addOptions() {
//     return {
//       protocols: [],
//       HTMLAttributes: {
//         target: "_blank",
//         rel: "noopener noreferrer nofollow",
//         class: null,
//       },
//     };
//   },
//   addAttributes() {
//     return {
//       href: {
//         default: null,
//         parseHTML(element) {
//           return element.getAttribute("href");
//         },
//       },
//       class: {
//         default: this.options.HTMLAttributes.class,
//       },
//     };
//   },
//   parseHTML() {
//     return [
//       {
//         tag: "link-custom[href]",
//         getAttrs: (dom) => {
//           const href = dom.getAttribute("href");
//           return null;
//         },
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes, node }) {
//     return [
//       "a",
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       0,
//     ];
//   },
//   addNodeView() {
//     return ReactNodeViewRenderer(LinkNodeViewComponent);
//   },
// });
import { Link as TiptapLink } from "@tiptap/extension-link";

function showPopover(linkElement: HTMLElement) {
  // Create your popover element (You can use a library like Popper.js)
  const popover = document.createElement("div");
  popover.className = "popover";
  popover.innerHTML = "<p>Link Options</p>";

  // Position the popover near the link
  popover.style.position = "absolute";
  popover.style.top = `${
    linkElement.getBoundingClientRect().bottom + window.scrollY
  }px`;
  popover.style.left = `${
    linkElement.getBoundingClientRect().left + window.scrollX
  }px`;

  // Append to the body
  document.body.appendChild(popover);

  // Handle close logic (for example, clicking outside the popover)
  // document.addEventListener("click", (e) => {
  //   if (!popover.contains(e.target as Node)) {
  //     popover.remove();
  //   }
  // });
}
import { Plugin, PluginKey } from "@tiptap/pm/state";

export default TiptapLink.extend({
  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleClick(view, pos, event) {
            const target = event.target as HTMLElement;
            console.log("clicked", target.tagName);
            if (target.tagName === "A") {
              // Custom logic for displaying the popover
              showPopover(target);
              return true; // Prevent the default action
            }
            return false;
          },
        },
      }),
    ];
  },
});
