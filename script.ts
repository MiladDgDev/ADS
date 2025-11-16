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

window.addEventListener("resize", (e: UIEvent) => {
  if (e.target instanceof Window) {
    const mode = tabOrAccordionMode();
    if (mode === "tab") {
      const activePanels = document.querySelectorAll(".panel.active-panel");
      if (activePanels.length > 1) {
        // If multiple panels are active, keep only the first one active
        activePanels.forEach((panel, index) => {
          if (index === 0) return;
          deactivatePanel(panel as HTMLElement);
          const btn = getBtnByPanel(panel as HTMLElement);
          deactivateButton(btn);
        });
      }
    }
  }
});

/**
 * Hides all panels by removing the active class and setting aria-hidden to true.
 * Also deactivates all buttons by removing the active-btn class and setting aria-selected to false.
 */
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

/**
 * Retrieves the button associated with a given panel.
 * @param panel The panel element.
 * @returns The corresponding button element or null if not found.
 */
function getBtnByPanel(panel: HTMLElement | null): HTMLButtonElement | null {
  if (!panel) return null;

  const panelId = panel.id;

  const targetBtnId = document.getElementById(`btn-${panelId}`);

  if (targetBtnId instanceof HTMLButtonElement) {
    return targetBtnId;
  }

  return null;
}

/**
 * Retrieves the panel associated with a given button.
 * @param button The button element.
 * @returns The corresponding panel element or null if not found.
 */
function getPanelByBtn(button: HTMLElement | null): HTMLElement | null {
  if (!button) return null;
  const btnId = button.id;

  const targetPanelId = document.getElementById(
    btnId?.replace("btn-", "") || ""
  );

  return targetPanelId;
}

/**
 * Shows the specified panel in tab mode, deactivating any currently active panel.
 * @param panel The panel to show.
 */
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
    activateButton(targetBtn);
  }
}

/**
 * Shows the specified panel in accordion mode.
 * @param panel The panel to show.
 */
function showPanelInAccordion(panel: HTMLElement | null) {
  if (!panel) return;
  panel.classList.add("active-panel");
  panel.setAttribute("aria-hidden", "false");
}

/**
 * Activates the specified button by adding the active-btn class and setting aria-selected to true.
 * @param button The button to activate.
 */
function activateButton(button: HTMLElement | null) {
  if (!button) return;
  button.classList.add("active-btn");
  button.setAttribute("aria-selected", "true");
}

/**
 * Deactivates the specified button by removing the active-btn class and setting aria-selected to false.
 * @param button The button to deactivate.
 */
function deactivateButton(button: HTMLElement | null) {
  if (!button) return;
  button.classList.remove("active-btn");
  button.setAttribute("aria-selected", "false");
}

/**
 * Deactivates the specified panel by removing the active-panel class and setting aria-hidden to true.
 * @param panel The panel to deactivate.
 */
function deactivatePanel(panel: HTMLElement | null) {
  if (!panel) return;
  panel.classList.remove("active-panel");
  panel.setAttribute("aria-hidden", "true");
}

/**
 * Determines the current mode based on window width.
 * @returns "tab" if width >= 800, otherwise "accordion".
 */
function tabOrAccordionMode(): "tab" | "accordion" {
  const width = window.innerWidth;
  return width >= 800 ? "tab" : "accordion";
}

/**
 * Checks if the specified panel is active.
 * @param panel The panel element.
 * @returns True if the panel has the active-panel class, otherwise false.
 */
function panelIsActive(panel: HTMLElement | null): boolean {
  if (!panel) return false;
  return panel.classList.contains("active-panel");
}

/**
 * Checks if the specified button is active.
 * @param button The button element.
 * @returns True if the button has the active-btn class, otherwise false.
 */
function buttonIsActive(button: HTMLElement | null): boolean {
  if (!button) return false;
  return button.classList.contains("active-btn");
}
