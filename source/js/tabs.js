var tabsEls = _$$(".nav-tabs li.tab a");
tabsEls.forEach((tab) => {
  tab.off("click").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const targetId = this.getAttribute("class").substring(1);
    const tabsContainer = this.closest(".tabs");
    const tabContent = tabsContainer.querySelector(".tab-content");
    const panes = tabContent.querySelectorAll(".tab-pane");
    panes.forEach((pane) => pane.classList.remove("active"));
    document.getElementById(targetId).classList.add("active");
    const navTabs = tabsContainer.querySelector(".nav-tabs");
    const tabLinks = navTabs.querySelectorAll("li.tab");
    tabLinks.forEach((li) => li.classList.remove("active"));
    this.parentElement.classList.add("active");

    const indicator = navTabs.querySelector(".tab-indicator");
    const activeTab = this.parentElement;
    const activeRect = activeTab.getBoundingClientRect();
    const navRect = navTabs.getBoundingClientRect();
    indicator.style.left = activeRect.left - navRect.left + "px";
    indicator.style.width = activeRect.width + "px";

    return false;
  });
});

var tabsContainers = _$$(".tabs");
tabsContainers.forEach((container) => {
  const navTabs = container.querySelector(".nav-tabs");
  const activeTab = navTabs.querySelector("li.tab.active");
  if (activeTab) {
    const indicator = navTabs.querySelector(".tab-indicator");
    const activeRect = activeTab.getBoundingClientRect();
    const navRect = navTabs.getBoundingClientRect();
    indicator.style.left = activeRect.left - navRect.left + "px";
    indicator.style.width = activeRect.width + "px";
  }
});
