hideAllPanels();

const buttons = document.querySelectorAll(".btn-panel");
const panels = document.querySelectorAll(".panel");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetBtn = e.currentTarget as HTMLButtonElement;

    if (!targetBtn) return;

    if (targetBtn.id === "btn-remove-panels") {
      hideAllPanels();
      return;
    }

    const targetPanel = getPanelByBtn(targetBtn);

    if (!targetPanel) return;

    const mode = tabOrAccordionMode();
    if (mode === "tab") {
      if (panelIsActive(targetPanel)) return;
      showPanelInTabs(targetPanel);
      if (buttonIsActive(targetBtn)) return;
      activateButton(targetBtn);
    }
    if (mode === "accordion") {
      if (panelIsActive(targetPanel)) {
        deactivatePanel(targetPanel);
        deactivateButton(targetBtn);
      } else {
        showPanelInAccordion(targetPanel);
        activateButton(targetBtn);
      }
    }
  });
});

function hideAllPanels() {
  const panels = document.querySelectorAll(".panel");
  panels.forEach((el) => {
    el.classList.remove("active-panel");
    el.setAttribute("aria-hidden", "true");
  });
  const buttons = document.querySelectorAll(".btn-panel");
  buttons.forEach((btn) => {
    btn.classList.remove("active-btn");
    btn.setAttribute("aria-selected", "false");
  });
}

function getBtnByPanel(panel: HTMLElement | null): HTMLButtonElement | null {
  if (!panel) return null;

  const panelId = panel?.id;

  const targetBtnId = document.getElementById(`btn-${panelId}`);

  if (targetBtnId instanceof HTMLButtonElement) {
    return targetBtnId;
  }

  return null;
}

function getPanelByBtn(button: HTMLElement | null): HTMLElement | null {
  if (!button) return null;
  const btnId = button?.id;

  const targetPanelId = document.getElementById(
    btnId?.replace("btn-", "") || ""
  );

  return targetPanelId;
}

function showPanelInTabs(panel: HTMLElement | null) {
  if (!panel) return;
  const targetBtn = getBtnByPanel(panel);
  if (!targetBtn) return;
  const activePanel = document.querySelector(
    ".panel.active-panel"
  ) as HTMLElement | null;
  const activeBtn = activePanel ? getBtnByPanel(activePanel) : null;

  if (activePanel === panel) return;

  if (activePanel) {
    activePanel.classList.remove("active-panel");
    activePanel.setAttribute("aria-hidden", "true");

    panel.classList.add("active-panel");
    panel.setAttribute("aria-hidden", "false");
    deactivateButton(activeBtn);
    activateButton(targetBtn);
  } else {
    panel.classList.add("active-panel");
    panel.setAttribute("aria-hidden", "false");
    deactivateButton(activeBtn);
    activateButton(targetBtn);
  }
}

function showPanelInAccordion(panel: HTMLElement | null) {
  if (!panel) return;
  panel.classList.add("active-panel");
  panel.setAttribute("aria-hidden", "false");
}

function activateButton(button: HTMLElement | null) {
  if (!button) return;
  button.classList.add("active-btn");
  button.setAttribute("aria-selected", "true");
}

function deactivateButton(button: HTMLElement | null) {
  if (!button) return;
  button.classList.remove("active-btn");
  button.setAttribute("aria-selected", "false");
}

function deactivatePanel(panel: HTMLElement | null) {
  if (!panel) return;
  panel.classList.remove("active-panel");
  panel.setAttribute("aria-hidden", "true");
}

function tabOrAccordionMode(): "tab" | "accordion" {
  const width = window.innerWidth;
  return width >= 800 ? "tab" : "accordion";
}

function panelIsActive(panel: HTMLElement | null): boolean {
  if (!panel) return false;
  return panel.classList.contains("active-panel");
}

function buttonIsActive(button: HTMLElement | null): boolean {
  if (!button) return false;
  return button.classList.contains("active-btn");
}
