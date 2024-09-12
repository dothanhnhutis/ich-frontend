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

export default Node.create<LinkOptions>({
  name: "linkcustom",
  priority: 9999,
  group: "inline",
  inline: true,
  marks: "_",
  addOptions() {
    return {
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null,
      },
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(element) {
          return element.getAttribute("href");
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
        tag: "link-custom[href]",
        getAttrs: (dom) => {
          const href = dom.getAttribute("href");

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
    // if (!isAllowedUri(HTMLAttributes.href, this.options.protocols)) {
    //   // strip out the href
    //   return [
    //     "a",
    //     mergeAttributes(this.options.HTMLAttributes, {
    //       ...HTMLAttributes,
    //       href: "",
    //     }),
    //     0,
    //   ];
    // }

    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(LinkNodeViewComponent);
  },
  renderText() {
    return "textcontent";
  },
});
