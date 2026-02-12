type JiraConfig = {
  baseUrl: string;
  email: string;
  token: string;
};

type AiConfig = {
  serverUrl: string;
  provider: "openai" | "ollama";
  model: string;
  ollamaUrl: string;
};

const baseUrlEl = document.getElementById("baseUrl") as HTMLInputElement;
const emailEl = document.getElementById("email") as HTMLInputElement;
const tokenEl = document.getElementById("token") as HTMLInputElement;
const statusEl = document.getElementById("status") as HTMLSpanElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const testButton = document.getElementById("test") as HTMLButtonElement;
const aiServerEl = document.getElementById("aiServer") as HTMLInputElement;
const aiProviderEl = document.getElementById("aiProvider") as HTMLSelectElement;
const aiModelEl = document.getElementById("aiModel") as HTMLInputElement;
const ollamaUrlEl = document.getElementById("ollamaUrl") as HTMLInputElement;
const aiStatusEl = document.getElementById("aiStatus") as HTMLSpanElement;
const saveAiButton = document.getElementById("saveAi") as HTMLButtonElement;

const setStatus = (message: string, isError = false) => {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b00020" : "#1f1f1f";
};

const loadConfig = async () => {
  const stored = (await chrome.storage.local.get([
    "jiraConfig",
    "aiConfig",
  ])) as {
    jiraConfig?: JiraConfig;
    aiConfig?: AiConfig;
  };
  const config = stored.jiraConfig;
  if (config) {
    baseUrlEl.value = config.baseUrl || "";
    emailEl.value = config.email || "";
    tokenEl.value = config.token || "";
  }
  const aiConfig = stored.aiConfig;
  if (aiConfig) {
    aiServerEl.value = aiConfig.serverUrl || "";
    aiProviderEl.value = aiConfig.provider || "ollama";
    aiModelEl.value = aiConfig.model || "codellama";
    ollamaUrlEl.value = aiConfig.ollamaUrl || "http://localhost:11434";
  }
};

const saveConfig = async () => {
  const config: JiraConfig = {
    baseUrl: baseUrlEl.value.trim(),
    email: emailEl.value.trim(),
    token: tokenEl.value.trim(),
  };
  await chrome.storage.local.set({ jiraConfig: config });
};

const saveAiConfig = async () => {
  const config: AiConfig = {
    serverUrl: aiServerEl.value.trim(),
    provider: (aiProviderEl.value as "openai" | "ollama") || "ollama",
    model: aiModelEl.value.trim() || "codellama",
    ollamaUrl: ollamaUrlEl.value.trim() || "http://localhost:11434",
  };
  await chrome.storage.local.set({ aiConfig: config });
};

saveButton.addEventListener("click", async () => {
  await saveConfig();
  setStatus("Saved");
});

saveAiButton.addEventListener("click", async () => {
  await saveAiConfig();
  aiStatusEl.textContent = "Saved";
});

testButton.addEventListener("click", async () => {
  setStatus("Testing...");
  await saveConfig();
  chrome.runtime.sendMessage({ type: "jira:test" }, (response) => {
    if (chrome.runtime.lastError) {
      setStatus(chrome.runtime.lastError.message, true);
      return;
    }
    if (!response?.ok) {
      setStatus(response?.error || "Test failed", true);
      return;
    }
    setStatus("Connection OK");
  });
});

void loadConfig();
