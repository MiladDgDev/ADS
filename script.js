hideAllPanels();
var buttons = document.querySelectorAll(".btn-panel");
var panels = document.querySelectorAll(".panel");
buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        var targetBtn = e.currentTarget;
        if (!targetBtn)
            return;
        if (targetBtn.id === "btn-remove-panels") {
            hideAllPanels();
            return;
        }
        var targetPanel = getPanelByBtn(targetBtn);
        if (!targetPanel)
            return;
        var mode = tabOrAccordionMode();
        if (mode === "tab") {
            if (panelIsActive(targetPanel))
                return;
            showPanelInTabs(targetPanel);
            if (buttonIsActive(targetBtn))
                return;
            activateButton(targetBtn);
        }
        if (mode === "accordion") {
            if (panelIsActive(targetPanel)) {
                deactivatePanel(targetPanel);
                deactivateButton(targetBtn);
            }
            else {
                showPanelInAccordion(targetPanel);
                activateButton(targetBtn);
            }
        }
    });
});
function hideAllPanels() {
    var panels = document.querySelectorAll(".panel");
    panels.forEach(function (el) {
        el.classList.remove("active-panel");
        el.setAttribute("aria-hidden", "true");
    });
    var buttons = document.querySelectorAll(".btn-panel");
    buttons.forEach(function (btn) {
        btn.classList.remove("active-btn");
        btn.setAttribute("aria-selected", "false");
    });
}
function getBtnByPanel(panel) {
    if (!panel)
        return null;
    var panelId = panel === null || panel === void 0 ? void 0 : panel.id;
    var targetBtnId = document.getElementById("btn-".concat(panelId));
    if (targetBtnId instanceof HTMLButtonElement) {
        return targetBtnId;
    }
    return null;
}
function getPanelByBtn(button) {
    if (!button)
        return null;
    var btnId = button === null || button === void 0 ? void 0 : button.id;
    var targetPanelId = document.getElementById((btnId === null || btnId === void 0 ? void 0 : btnId.replace("btn-", "")) || "");
    return targetPanelId;
}
function showPanelInTabs(panel) {
    if (!panel)
        return;
    var targetBtn = getBtnByPanel(panel);
    if (!targetBtn)
        return;
    var activePanel = document.querySelector(".panel.active-panel");
    var activeBtn = activePanel ? getBtnByPanel(activePanel) : null;
    if (activePanel === panel)
        return;
    if (activePanel) {
        activePanel.classList.remove("active-panel");
        activePanel.setAttribute("aria-hidden", "true");
        panel.classList.add("active-panel");
        panel.setAttribute("aria-hidden", "false");
        deactivateButton(activeBtn);
        activateButton(targetBtn);
    }
    else {
        panel.classList.add("active-panel");
        panel.setAttribute("aria-hidden", "false");
        deactivateButton(activeBtn);
        activateButton(targetBtn);
    }
}
function showPanelInAccordion(panel) {
    if (!panel)
        return;
    panel.classList.add("active-panel");
    panel.setAttribute("aria-hidden", "false");
}
function activateButton(button) {
    if (!button)
        return;
    button.classList.add("active-btn");
    button.setAttribute("aria-selected", "true");
}
function deactivateButton(button) {
    if (!button)
        return;
    button.classList.remove("active-btn");
    button.setAttribute("aria-selected", "false");
}
function deactivatePanel(panel) {
    if (!panel)
        return;
    panel.classList.remove("active-panel");
    panel.setAttribute("aria-hidden", "true");
}
function tabOrAccordionMode() {
    var width = window.innerWidth;
    return width >= 800 ? "tab" : "accordion";
}
function panelIsActive(panel) {
    if (!panel)
        return false;
    return panel.classList.contains("active-panel");
}
function buttonIsActive(button) {
    if (!button)
        return false;
    return button.classList.contains("active-btn");
}
