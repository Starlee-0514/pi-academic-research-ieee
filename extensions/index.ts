import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type Oversight = "Low" | "Medium" | "High" | "Very High";
type Spectrum = "Fidelity" | "Balanced" | "Originality";
type DisplayLanguage = "en" | "zh-TW";
type LocalizedText = Record<DisplayLanguage, string>;

type ArsRoute = {
  command: string;
  skill: string;
  mode: string;
  spectrum: Spectrum;
  oversight: Oversight;
  description: LocalizedText;
  output: string;
};

const CONFIG_PATH = ".pi/ieee-academic-research-ieee.json";

function normalizeLanguage(value: unknown): DisplayLanguage | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (["zh", "zh-tw", "zh_tw", "tw", "繁中", "中文"].includes(normalized)) return "zh-TW";
  if (["en", "en-us", "en_us", "english"].includes(normalized)) return "en";
  return undefined;
}

export function resolveDisplayLanguage(cwd = process.cwd(), env = process.env): DisplayLanguage {
  const envLanguage = normalizeLanguage(env.PI_IEEE_LANG ?? env.IEEE_ACADEMIC_RESEARCH_LANG);
  if (envLanguage) return envLanguage;

  const configFile = join(cwd, CONFIG_PATH);
  if (existsSync(configFile)) {
    try {
      const config = JSON.parse(readFileSync(configFile, "utf8")) as { language?: unknown; displayLanguage?: unknown; locale?: unknown };
      const configLanguage = normalizeLanguage(config.displayLanguage ?? config.language ?? config.locale);
      if (configLanguage) return configLanguage;
    } catch {
      // Keep startup resilient: invalid local language config falls back to English.
    }
  }

  return "en";
}

function text(value: LocalizedText, language: DisplayLanguage): string {
  return value[language] ?? value.en;
}

export function writeDisplayLanguageConfig(cwd: string, language: DisplayLanguage): string {
  const configFile = join(cwd, CONFIG_PATH);
  mkdirSync(dirname(configFile), { recursive: true });
  writeFileSync(configFile, `${JSON.stringify({ displayLanguage: language }, null, 2)}\n`, "utf8");
  return configFile;
}

export const ROUTES: ArsRoute[] = [
  {
    command: "ars-research",
    skill: "ieee-deep-research",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: {
      en: "ASR-style full research workflow, routed to IEEE deep research.",
      "zh-TW": "ASR 風格完整研究流程，路由至 IEEE 深度研究 skill。",
    },
    output: "IEEE-oriented research report and evidence map",
  },
  {
    command: "ars-quick",
    skill: "ieee-deep-research",
    mode: "quick",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style quick research brief, routed to IEEE deep research.",
      "zh-TW": "ASR 風格快速研究簡報，路由至 IEEE 深度研究 skill。",
    },
    output: "Concise technical research brief",
  },
  {
    command: "ars-lit-review",
    skill: "ieee-deep-research",
    mode: "lit-review",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style literature review mapping, routed to IEEE deep research.",
      "zh-TW": "ASR 風格文獻回顧與研究脈絡整理，路由至 IEEE 深度研究 skill。",
    },
    output: "Related-work matrix with datasets, metrics, baselines, and evidence",
  },
  {
    command: "ars-fact-check",
    skill: "ieee-deep-research",
    mode: "fact-check",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style claim verification, routed to IEEE deep research.",
      "zh-TW": "ASR 風格 claim 驗證，路由至 IEEE 深度研究 skill。",
    },
    output: "Claim-by-claim verification report",
  },
  {
    command: "ars-plan",
    skill: "ieee-academic-paper",
    mode: "plan",
    spectrum: "Originality",
    oversight: "Very High",
    description: {
      en: "ASR-style guided paper planning, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格論文規劃引導，路由至 IEEE 論文寫作 skill。",
    },
    output: "IEEE manuscript plan, section structure, contribution map, and author questions",
  },
  {
    command: "ars-paper",
    skill: "ieee-academic-paper",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: {
      en: "ASR-style full paper drafting, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格完整論文草稿撰寫，路由至 IEEE 論文寫作 skill。",
    },
    output: "IEEEtran-oriented manuscript draft package",
  },
  {
    command: "ars-outline",
    skill: "ieee-academic-paper",
    mode: "outline-only",
    spectrum: "Balanced",
    oversight: "High",
    description: {
      en: "ASR-style outline mode, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格大綱模式，路由至 IEEE 論文寫作 skill。",
    },
    output: "Detailed IEEE paper outline and evidence map",
  },
  {
    command: "ars-revision",
    skill: "ieee-academic-paper",
    mode: "revision",
    spectrum: "Fidelity",
    oversight: "High",
    description: {
      en: "ASR-style revision workflow, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格修稿流程，路由至 IEEE 論文寫作 skill。",
    },
    output: "Revision plan, revised text, and response-to-reviewer skeleton",
  },
  {
    command: "ars-abstract",
    skill: "ieee-academic-paper",
    mode: "abstract-only",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style abstract mode, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格摘要與 Index Terms 模式，路由至 IEEE 論文寫作 skill。",
    },
    output: "IEEE-style abstract and Index Terms",
  },
  {
    command: "ars-format-convert",
    skill: "ieee-academic-paper",
    mode: "format-convert",
    spectrum: "Fidelity",
    oversight: "Low",
    description: {
      en: "ASR-style formatting mode, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格格式轉換模式，路由至 IEEE 論文寫作 skill。",
    },
    output: "IEEEtran, BibTeX, and package-format conversion guidance",
  },
  {
    command: "ars-citation-check",
    skill: "ieee-academic-paper",
    mode: "citation-check",
    spectrum: "Fidelity",
    oversight: "Low",
    description: {
      en: "ASR-style citation checking, routed to IEEE academic paper.",
      "zh-TW": "ASR 風格引用檢查，路由至 IEEE 論文寫作 skill。",
    },
    output: "IEEE numbered-citation and BibTeX issue report",
  },
  {
    command: "ars-review",
    skill: "ieee-paper-reviewer",
    mode: "full",
    spectrum: "Balanced",
    oversight: "High",
    description: {
      en: "ASR-style multi-perspective review, routed to IEEE paper reviewer.",
      "zh-TW": "ASR 風格多視角技術審稿，路由至 IEEE paper reviewer skill。",
    },
    output: "IEEE-style technical peer review and decision recommendation",
  },
  {
    command: "ars-methodology",
    skill: "ieee-paper-reviewer",
    mode: "methodology-focus",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style methodology review, routed to IEEE paper reviewer.",
      "zh-TW": "ASR 風格方法與實驗設計審查，路由至 IEEE paper reviewer skill。",
    },
    output: "Methodology, baseline, ablation, and reproducibility critique",
  },
  {
    command: "ars-rereview",
    skill: "ieee-paper-reviewer",
    mode: "re-review",
    spectrum: "Fidelity",
    oversight: "Medium",
    description: {
      en: "ASR-style revision verification, routed to IEEE paper reviewer.",
      "zh-TW": "ASR 風格修稿後再審查，路由至 IEEE paper reviewer skill。",
    },
    output: "Residual-issue and revision-verification report",
  },
  {
    command: "ars-pipeline",
    skill: "ieee-academic-pipeline",
    mode: "pipeline",
    spectrum: "Balanced",
    oversight: "Very High",
    description: {
      en: "ASR-style end-to-end orchestrator, routed to IEEE academic pipeline.",
      "zh-TW": "ASR 風格端到端研究到投稿流程，路由至 IEEE academic pipeline skill。",
    },
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

function routeToSkill(
  pi: ExtensionAPI,
  route: ArsRoute,
  args: string,
  language: DisplayLanguage,
  ctx: { isIdle(): boolean; ui: { notify(message: string, kind?: "info" | "warn" | "error" | "success"): void } },
) {
  const prompt = buildSkillPrompt(route, args);
  if (ctx.isIdle()) {
    pi.sendUserMessage(prompt);
  } else {
    pi.sendUserMessage(prompt, { deliverAs: "followUp" });
  }
  const message = language === "zh-TW"
    ? `已路由 /${route.command} → /skill:${route.skill}（${route.mode}）`
    : `Routing /${route.command} → /skill:${route.skill} (${route.mode})`;
  ctx.ui.notify(message, "info");
}

function modeTable(language: DisplayLanguage): string {
  const header = language === "zh-TW"
    ? `IEEE ARS 指令路由（顯示語言：繁中，可用 PI_IEEE_LANG 或 ${CONFIG_PATH} 調整）`
    : `IEEE ARS command routes (display language: English; set PI_IEEE_LANG or ${CONFIG_PATH} to change)`;
  return [
    header,
    ...ROUTES.map((route) => `/${route.command} → ${route.skill}:${route.mode} [${route.spectrum}, ${route.oversight}] — ${text(route.description, language)}`),
  ].join("\n");
}

const COMMAND_DESCRIPTIONS: Record<"info" | "modes" | "setting", LocalizedText> = {
  info: {
    en: "Show the ASR-compatible IEEE academic research command router.",
    "zh-TW": "顯示 ASR 相容的 IEEE 學術研究指令路由器資訊。",
  },
  modes: {
    en: "List ASR-compatible commands routed to IEEE Pi skills.",
    "zh-TW": "列出會路由到 IEEE Pi skills 的 ASR 相容指令。",
  },
  setting: {
    en: "Open IEEE ARS extension settings.",
    "zh-TW": "開啟 IEEE ARS extension 設定。",
  },
};

const DISPLAY_LANGUAGE_OPTIONS: Array<{ value: DisplayLanguage; label: string; description: string }> = [
  { value: "en", label: "English", description: "Default command descriptions and router messages." },
  { value: "zh-TW", label: "繁體中文", description: "繁中指令描述與路由提示。" },
];

class SettingsDialog {
  private selectedIndex: number;
  private readonly done: (value: DisplayLanguage | undefined) => void;
  private readonly theme: { fg(color: string, text: string): string; bold(text: string): string };

  constructor(
    currentLanguage: DisplayLanguage,
    done: (value: DisplayLanguage | undefined) => void,
    theme: { fg(color: string, text: string): string; bold(text: string): string },
  ) {
    this.selectedIndex = Math.max(0, DISPLAY_LANGUAGE_OPTIONS.findIndex((option) => option.value === currentLanguage));
    this.done = done;
    this.theme = theme;
  }

  handleInput(data: string): void {
    if (data === "\u001b[A" || data === "up") {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
      this.invalidate();
      return;
    }
    if (data === "\u001b[B" || data === "down") {
      this.selectedIndex = Math.min(DISPLAY_LANGUAGE_OPTIONS.length - 1, this.selectedIndex + 1);
      this.invalidate();
      return;
    }
    if (data === "\u0013" || data === "\r" || data === "\n" || data === "ctrl+s" || data === "enter" || data === "return") {
      this.done(DISPLAY_LANGUAGE_OPTIONS[this.selectedIndex]?.value ?? "en");
      return;
    }
    if (data === "\u001b" || data === "escape") {
      this.done(undefined);
    }
  }

  render(width: number): string[] {
    const lines = [
      this.theme.fg("accent", this.theme.bold("IEEE ARS Settings")),
      this.theme.fg("muted", "↑/↓ select  •  Ctrl+S save  •  Enter save  •  Esc cancel"),
      "",
      this.theme.bold("Display language / 顯示語言"),
      ...DISPLAY_LANGUAGE_OPTIONS.map((option, index) => {
        const selected = index === this.selectedIndex;
        const prefix = selected ? "› " : "  ";
        const label = selected ? this.theme.fg("accent", this.theme.bold(option.label)) : option.label;
        return `${prefix}${label} — ${this.theme.fg("muted", option.description)}`;
      }),
      "",
      this.theme.fg("dim", `Config file: ${CONFIG_PATH}`),
      this.theme.fg("dim", "Saved settings apply after the extension reloads."),
    ];
    return lines.map((line) => this.truncateLine(line, Math.max(0, width - 2)));
  }

  private truncateLine(line: string, maxWidth: number): string {
    if (maxWidth <= 0) return "";
    // Keep this dependency-free for package smoke tests; settings lines are short and ANSI-safe enough for fallback truncation.
    return line.length > maxWidth ? `${line.slice(0, Math.max(0, maxWidth - 1))}…` : line;
  }

  invalidate(): void {
    // Stateless render; method required by the TUI component interface.
  }
}

export default function (pi: ExtensionAPI) {
  const language = resolveDisplayLanguage();

  pi.registerCommand("ieee-ars-info", {
    description: text(COMMAND_DESCRIPTIONS.info, language),
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        language === "zh-TW"
          ? `IEEE ARS router 已載入。可使用 /ars-plan、/ars-lit-review、/ars-review、/ars-pipeline，或 /ieee-ars-modes。`
          : `IEEE ARS router loaded. Use /ars-plan, /ars-lit-review, /ars-review, /ars-pipeline, or /ieee-ars-modes.`,
        "info",
      );
    },
  });

  pi.registerCommand("ieee-ars-modes", {
    description: text(COMMAND_DESCRIPTIONS.modes, language),
    handler: async (_args, ctx) => {
      ctx.ui.notify(modeTable(language), "info");
    },
  });

  pi.registerCommand("ars-setting", {
    description: text(COMMAND_DESCRIPTIONS.setting, language),
    handler: async (_args, ctx) => {
      const selectedLanguage = await ctx.ui.custom<DisplayLanguage | undefined>(
        (_tui, theme, _keybindings, done) => new SettingsDialog(language, done, theme),
        { overlay: true, overlayOptions: { width: "60%", minWidth: 48, maxHeight: "70%", anchor: "center", margin: 2 } },
      );

      if (!selectedLanguage) {
        ctx.ui.notify(language === "zh-TW" ? "設定未變更。" : "Settings unchanged.", "info");
        return;
      }

      const configFile = writeDisplayLanguageConfig(ctx.cwd, selectedLanguage);
      ctx.ui.notify(
        selectedLanguage === "zh-TW"
          ? `已儲存顯示語言設定：繁體中文（${configFile}）。正在重新載入 extension...`
          : `Saved display language: English (${configFile}). Reloading extension...`,
        "success",
      );
      await ctx.reload();
      return;
    },
  });

  for (const route of ROUTES) {
    pi.registerCommand(route.command, {
      description: text(route.description, language),
      handler: async (args, ctx) => routeToSkill(pi, route, args, language, ctx),
    });
  }
}
