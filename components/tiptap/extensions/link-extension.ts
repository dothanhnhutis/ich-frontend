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
      // new Plugin({
      //   key: new PluginKey("eventHandler"),
      //   props: {
      //     handleClick(view, pos, event) {
      //       const target = event.target as HTMLElement;
      //       console.log("clicked", target.tagName);
      //       if (target.tagName === "A") {
      //         // Custom logic for displaying the popover
      //         showPopover(target);
      //         return true; // Prevent the default action
      //       }
      //       return false;
      //     },
      //   },
      // }),
    ];
  },
});
