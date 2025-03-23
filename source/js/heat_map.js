var MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

var pluralize = (num, word) => `${num} ${word}${num <= 1 ? "" : "s"}`;

function getTooltip(contributionDay, contributionDate) {
  // 修正日期转换逻辑，确保日期一致
  const formattedDate = new Date(
    contributionDate.getTime() - contributionDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  if (contributionDay.count === 0) {
    return `No writing on ${formattedDate}`;
  }

  const postText = pluralize(contributionDay.post, "post");
  const wordText = pluralize(contributionDay.count, "word");

  return `${postText} ${wordText} on ${formattedDate}`;
}

function createCalendar(element, contributionData) {
  if (!element) {
    return;
  }
  element.innerHTML = `
    <div class="outer-box">
      <div class="year-select"></div>
      <div class="inner-box">
        <div class="calendar-container">
          ${["Mon", "Wed", "Fri"]
            .map((t) => `<span class="week">${t}</span>`)
            .join("")}
          <div class="legend">Less${new Array(5)
            .fill(0)
            .map((_, i) => `<i class="tile" data-level="${i}"></i>`)
            .join("")}More</div>
          <div class="tiles"></div>
        </div>
      </div>
    </div>
  `;

  const calendarContainer = element.querySelector(".calendar-container");
  const yearSelector = element.querySelector(".year-select");
  const tilesContainer = element.querySelector(".tiles");

  const allContributionData = completeContributionData(contributionData);
  const currentDisplayYear = new Date().getFullYear();

  yearSelector.innerHTML = Object.keys(allContributionData)
    .sort((a, b) => b - a)
    .map(
      (year) =>
        `<div class="year-option ${
          year == currentDisplayYear ? "active" : ""
        }">${year}</div>`
    )
    .join("");

  yearSelector.addEventListener("click", ({ target }) => {
    if (target.classList.contains("year-option")) {
      element.querySelector(".active")?.classList.remove("active");
      target.classList.add("active");
      generateYearContributions(target.textContent);
    }
  });

  const generateYearContributions = (year) => {
    tilesContainer.innerHTML = "";
    calendarContainer.querySelectorAll(".month").forEach((m) => m.remove());
    calendarContainer.querySelectorAll(".total").forEach((t) => t.remove());
    const data = allContributionData[year];
    const startRow = new Date(data[0].date).getDay();
    let latestMonth = -1;

    const monthFragment = document.createDocumentFragment();
    const tilesFragment = document.createDocumentFragment();

    const [tiles, totalStatistical] = data.reduce(
      ([tiles, stats], c, i) => {
        const date = new Date(c.date);
        const month = date.getMonth();

        // 统计逻辑
        stats.count += c.count;
        stats.post += c.post;

        // 处理月份标签
        if (date.getDay() === 0 && month !== latestMonth) {
          const gridColumn = 2 + Math.floor((i + startRow) / 7);
          latestMonth = month;
          const monthLabel = document.createElement("span");
          monthLabel.className = "month";
          monthLabel.textContent = MONTH_NAMES[month];
          monthLabel.style.gridColumn = gridColumn;
          monthFragment.append(monthLabel);
        }
        // 创建日历格子
        const tile = document.createElement("i");
        tile.className = "tile";
        tile.dataset.level = c.level;
        tile.title = getTooltip(c, date);
        tiles.push(tile);
        return [tiles, stats];
      },
      [[], { count: 0, post: 0 }]
    );

    // 处理首格位置
    if (tiles[0]) {
      tiles[0].style.gridRow = startRow + 1;
    }

    tilesFragment.append(...tiles);

    calendarContainer.append(monthFragment);
    tilesContainer.append(tilesFragment);

    calendarContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="total">${pluralize(
        totalStatistical.post,
        "post"
      )} ${pluralize(totalStatistical.count, "word")} in ${year}</div>`
    );
  };

  // 初始化显示当前年份的日历
  generateYearContributions(currentDisplayYear);
}

function completeContributionData(userData) {
  // 对用户数据按日期排序
  userData.sort((a, b) => a.date - b.date);

  // 获取起始日期和当前日期
  const startDate = new Date(userData[0].date);
  const currentDate = new Date();

  // 初始化结果数组
  const allData = {};
  // 创建映射表
  const userDataMap = {};
  userData.forEach((data) => {
    const dataDate = new Date(data.date);
    const key = `${dataDate.getFullYear()}-${dataDate.getMonth()}-${dataDate.getDate()}`;
    userDataMap[key] = data;
  });

  // 遍历年份
  for (
    let year = startDate.getFullYear();
    year <= currentDate.getFullYear();
    year++
  ) {
    const [startYear, endYear] =
      year === currentDate.getFullYear()
        ? [
            new Date(
              new Date(currentDate).setDate(currentDate.getDate() - 365)
            ),
            new Date(currentDate.getTime() + 86400000),
          ]
        : [new Date(year, 0, 1), new Date(year + 1, 0, 1)];

    const yearData = [];
    for (let d = startYear; d < endYear; d.setDate(d.getDate() + 1)) {
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      yearData.push(
        userDataMap[key] || {
          level: 0,
          date: d.getTime(),
          count: 0,
          post: 0,
        }
      );
    }
    allData[year] = yearData;
  }
  return allData;
}

// 获取日期数据

function getLevelFromWordCount(totalCount) {
  const levelStandard = window.REIMU_HEATMAP_CONFIG.levelStandard
    .split(",")
    .map(Number);
  if (totalCount <= 0) return 0;
  if (totalCount <= levelStandard[0]) return 1;
  if (totalCount <= levelStandard[1]) return 2;
  if (totalCount <= levelStandard[2]) return 3;
  return 4;
}

function transformArticlesData(articlesData) {
  const dailyStats = articlesData.reduce((map, { date, wordcount }) => {
    const entry = map.get(date) ?? { count: 0, post: 0 };
    return map.set(date, {
      count: entry.count + wordcount,
      post: entry.post + 1,
    });
  }, new Map());

  return Array.from(dailyStats, ([dayStr, { count, post }]) => ({
    level: getLevelFromWordCount(count),
    date: new Date(dayStr).getTime(),
    count,
    post,
  }));
}

createCalendar(
  document.querySelector("#heatmap"),
  transformArticlesData(window.REIMU_HEATMAP_CONFIG.articleStats)
);
