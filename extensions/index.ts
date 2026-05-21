import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("ieee-ars-info", {
    description: "Show information about the IEEE academic research Pi package scaffold.",
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        "IEEE academic research package loaded. Use /skill:ieee-academic-paper, /skill:ieee-deep-research, /skill:ieee-paper-reviewer, or /skill:ieee-academic-pipeline.",
        "info",
      );
    },
  });
}
