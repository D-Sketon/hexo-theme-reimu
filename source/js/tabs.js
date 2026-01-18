var updateIndicator = (activeTab, navTabs) => {
  const indicator = navTabs.querySelector(".tab-indicator");
  const activeRect = activeTab.getBoundingClientRect();
  const navRect = navTabs.getBoundingClientRect();
  indicator.style.left = activeRect.left - navRect.left + "px";
  indicator.style.width = activeRect.width + "px";
};

_$$(".nav-tabs li.tab a").forEach((tab) => {
  tab.off("click").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const targetId = this.getAttribute("class").substring(1);
    const tabsContainer = this.closest(".tabs");
    const navTabs = tabsContainer.querySelector(".nav-tabs");

    const tabContent = tabsContainer.querySelector(".tab-content");
    const panes = tabContent.querySelectorAll(".tab-pane");
    panes.forEach((pane) => pane.classList.remove("active"));
    document.getElementById(targetId).classList.add("active");

    navTabs
      .querySelectorAll("li.tab")
      .forEach((li) => li.classList.remove("active"));
    this.parentElement.classList.add("active");

    updateIndicator(this.parentElement, navTabs);

    return false;
  });
});

_$$(".tabs").forEach((container) => {
  const navTabs = container.querySelector(".nav-tabs");
  const activeTab = navTabs.querySelector("li.tab.active");
  if (activeTab) {
    updateIndicator(activeTab, navTabs);
  }
});
