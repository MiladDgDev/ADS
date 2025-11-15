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
    });
    var buttons = document.querySelectorAll(".btn-panel");
    buttons.forEach(function (btn) {
        btn.classList.remove("active-btn");
    });
}
function getbtnByPanel(panel) {
    if (panel === null)
        return null;
    var panelId = panel === null || panel === void 0 ? void 0 : panel.id;
    var targetBtnId = document.getElementById("btn-".concat(panelId));
    if (targetBtnId instanceof HTMLButtonElement) {
        return targetBtnId;
    }
    return null;
}
function getPanelByBtn(button) {
    if (button === null)
        return null;
    var btnId = button === null || button === void 0 ? void 0 : button.id;
    var targetPanelId = document.getElementById((btnId === null || btnId === void 0 ? void 0 : btnId.replace("btn-", "")) || "");
    return targetPanelId;
}
function showPanelInTabs(panel) {
    hideAllPanels();
    panel === null || panel === void 0 ? void 0 : panel.classList.add("active-panel");
}
function showPanelInAccordion(panel) {
    panel === null || panel === void 0 ? void 0 : panel.classList.add("active-panel");
}
function activateButton(button) {
    button === null || button === void 0 ? void 0 : button.classList.add("active-btn");
}
function deactivateButton(button) {
    button === null || button === void 0 ? void 0 : button.classList.remove("active-btn");
}
function deactivatePanel(panel) {
    panel === null || panel === void 0 ? void 0 : panel.classList.remove("active-panel");
}
function tabOrAccordionMode() {
    var width = window.innerWidth;
    return width >= 800 ? "tab" : "accordion";
}
function panelIsActive(panel) {
    if (panel === null)
        return false;
    return panel.classList.contains("active-panel");
}
function buttonIsActive(button) {
    if (button === null)
        return false;
    return button.classList.contains("active-btn");
}
