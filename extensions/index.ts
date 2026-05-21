import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type Oversight = "Low" | "Medium" | "High" | "Very High";
type Spectrum = "Fidelity" | "Balanced" | "Originality";

type ArsRoute = {
  command: string;
  skill: string;
  mode: string;
  spectrum: Spectrum;
  oversight: Oversight;
  description: string;
  output: string;
};

export const ROUTES: ArsRoute[] = [
  {
    command: "ars-research",
    skill: "ieee-deep-research",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: "ASR-style full research workflow, routed to IEEE deep research.",
    output: "IEEE-oriented research report and evidence map",
  },
  {
    command: "ars-quick",
    skill: "ieee-deep-research",
    mode: "quick",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style quick research brief, routed to IEEE deep research.",
    output: "Concise technical research brief",
  },
  {
    command: "ars-lit-review",
    skill: "ieee-deep-research",
    mode: "lit-review",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style literature review mapping, routed to IEEE deep research.",
    output: "Related-work matrix with datasets, metrics, baselines, and evidence",
  },
  {
    command: "ars-fact-check",
    skill: "ieee-deep-research",
    mode: "fact-check",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style claim verification, routed to IEEE deep research.",
    output: "Claim-by-claim verification report",
  },
  {
    command: "ars-plan",
    skill: "ieee-academic-paper",
    mode: "plan",
    spectrum: "Originality",
    oversight: "Very High",
    description: "ASR-style guided paper planning, routed to IEEE academic paper.",
    output: "IEEE manuscript plan, section structure, contribution map, and author questions",
  },
  {
    command: "ars-paper",
    skill: "ieee-academic-paper",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: "ASR-style full paper drafting, routed to IEEE academic paper.",
    output: "IEEEtran-oriented manuscript draft package",
  },
  {
    command: "ars-outline",
    skill: "ieee-academic-paper",
    mode: "outline-only",
    spectrum: "Balanced",
    oversight: "High",
    description: "ASR-style outline mode, routed to IEEE academic paper.",
    output: "Detailed IEEE paper outline and evidence map",
  },
  {
    command: "ars-revision",
    skill: "ieee-academic-paper",
    mode: "revision",
    spectrum: "Fidelity",
    oversight: "High",
    description: "ASR-style revision workflow, routed to IEEE academic paper.",
    output: "Revision plan, revised text, and response-to-reviewer skeleton",
  },
  {
    command: "ars-abstract",
    skill: "ieee-academic-paper",
    mode: "abstract-only",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style abstract mode, routed to IEEE academic paper.",
    output: "IEEE-style abstract and Index Terms",
  },
  {
    command: "ars-format-convert",
    skill: "ieee-academic-paper",
    mode: "format-convert",
    spectrum: "Fidelity",
    oversight: "Low",
    description: "ASR-style formatting mode, routed to IEEE academic paper.",
    output: "IEEEtran, BibTeX, and package-format conversion guidance",
  },
  {
    command: "ars-citation-check",
    skill: "ieee-academic-paper",
    mode: "citation-check",
    spectrum: "Fidelity",
    oversight: "Low",
    description: "ASR-style citation checking, routed to IEEE academic paper.",
    output: "IEEE numbered-citation and BibTeX issue report",
  },
  {
    command: "ars-review",
    skill: "ieee-paper-reviewer",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: "ASR-style multi-perspective review, routed to IEEE paper reviewer.",
    output: "IEEE-style technical peer review and decision recommendation",
  },
  {
    command: "ars-methodology",
    skill: "ieee-paper-reviewer",
    mode: "methodology-focus",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style methodology review, routed to IEEE paper reviewer.",
    output: "Methodology, baseline, ablation, and reproducibility critique",
  },
  {
    command: "ars-rereview",
    skill: "ieee-paper-reviewer",
    mode: "re-review",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: "ASR-style revision verification, routed to IEEE paper reviewer.",
    output: "Residual-issue and revision-verification report",
  },
  {
    command: "ars-pipeline",
    skill: "ieee-academic-pipeline",
    mode: "pipeline",
    spectrum: "Balanced",
    oversight: "Very High",
    description: "ASR-style end-to-end orchestrator, routed to IEEE academic pipeline.",
    output: "Research-to-submission IEEE workflow with checkpoints",
  },
];

export function buildSkillPrompt(route: ArsRoute, args: string): string {
  const request = args.trim() || "No user topic/details were provided yet. Start with intake questions and do not invent missing research details.";

  return `/skill:${route.skill}\n\n` +
    `Run the IEEE package using the ASR-compatible mode contract below.\n\n` +
    `Mode: ${route.mode}\n` +
    `Spectrum: ${route.spectrum}\n` +
    `Oversight: ${route.oversight}\n` +
    `Expected output: ${route.output}\n\n` +
    `User request:\n${request}`;
}

function routeToSkill(pi: ExtensionAPI, route: ArsRoute, args: string, ctx: { isIdle(): boolean; ui: { notify(message: string, kind?: "info" | "warn" | "error" | "success"): void } }) {
  const prompt = buildSkillPrompt(route, args);
  if (ctx.isIdle()) {
    pi.sendUserMessage(prompt);
  } else {
    pi.sendUserMessage(prompt, { deliverAs: "followUp" });
  }
  ctx.ui.notify(`Routing /${route.command} → /skill:${route.skill} (${route.mode})`, "info");
}

function modeTable(): string {
  return ROUTES.map((route) => `/${route.command} → ${route.skill}:${route.mode} [${route.spectrum}, ${route.oversight}]`).join("\n");
}

export default function (pi: ExtensionAPI) {
  pi.registerCommand("ieee-ars-info", {
    description: "Show the ASR-compatible IEEE academic research command router.",
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        `IEEE ARS router loaded. Use /ars-plan, /ars-lit-review, /ars-review, /ars-pipeline, or /ieee-ars-modes.`,
        "info",
      );
    },
  });

  pi.registerCommand("ieee-ars-modes", {
    description: "List ASR-compatible commands routed to IEEE Pi skills.",
    handler: async (_args, ctx) => {
      ctx.ui.notify(modeTable(), "info");
    },
  });

  for (const route of ROUTES) {
    pi.registerCommand(route.command, {
      description: route.description,
      handler: async (args, ctx) => routeToSkill(pi, route, args, ctx),
    });
  }
}
