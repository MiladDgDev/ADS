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
  });
  const buttons = document.querySelectorAll(".btn-panel");
  buttons.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}

function getbtnByPanel(panel: HTMLElement | null): HTMLButtonElement | null {
  if (panel === null) return null;

  const panelId = panel?.id;

  const targetBtnId = document.getElementById(`btn-${panelId}`);

  if (targetBtnId instanceof HTMLButtonElement) {
    return targetBtnId;
  }

  return null;
}

function getPanelByBtn(button: HTMLElement | null): HTMLElement | null {
  if (button === null) return null;
  const btnId = button?.id;

  const targetPanelId = document.getElementById(
    btnId?.replace("btn-", "") || ""
  );

  return targetPanelId;
}

function showPanelInTabs(panel: HTMLElement | null) {
  hideAllPanels();
  panel?.classList.add("active-panel");
}

function showPanelInAccordion(panel: HTMLElement | null) {
  panel?.classList.add("active-panel");
}

function activateButton(button: HTMLElement | null) {
  button?.classList.add("active-btn");
}

function deactivateButton(button: HTMLElement | null) {
  button?.classList.remove("active-btn");
}

function deactivatePanel(panel: HTMLElement | null) {
  panel?.classList.remove("active-panel");
}

function tabOrAccordionMode(): "tab" | "accordion" {
  const width = window.innerWidth;
  return width >= 800 ? "tab" : "accordion";
}

function panelIsActive(panel: HTMLElement | null): boolean {
  if (panel === null) return false;
  return panel.classList.contains("active-panel");
}

function buttonIsActive(button: HTMLElement | null): boolean {
  if (button === null) return false;
  return button.classList.contains("active-btn");
}
