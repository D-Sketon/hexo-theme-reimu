const https = require("node:https");
const { version } = require("../../package.json");

const RELEASE_API_URL =
  "https://api.github.com/repos/D-Sketon/hexo-theme-reimu/releases/latest";
const VERSION_CHECK_TIMEOUT_MS = 8000;
const VERSION_CHECK_FAILED_MSG =
  "Failed to detect version info. You can get the latest version info at https://github.com/D-Sketon/hexo-theme-reimu/releases";

const parseVersion = (rawVersion = "") =>
  String(rawVersion)
    .replace(/^[vV]/, "")
    .split(".")
    .map((part) => {
      const num = Number.parseInt(part, 10);
      return Number.isNaN(num) ? 0 : num;
    });

const isVersionGreater = (latest, current) => {
  for (let i = 0; i < Math.max(latest.length, current.length); i++) {
    const latestPart = latest[i] ?? 0;
    const currentPart = current[i] ?? 0;
    if (latestPart > currentPart) return true;
    if (latestPart < currentPart) return false;
  }
  return false;
};

const reportVersionCheckFailure = () => {
  hexo.log.warn(VERSION_CHECK_FAILED_MSG);
};

hexo.on("generateBefore", () => {
  hexo.log.info(String.raw`
  ______     ______     __     __    __     __  __    
 /\  == \   /\  ___\   /\ \   /\ "-./  \   /\ \/\ \   
 \ \  __<   \ \  __\   \ \ \  \ \ \-./\ \  \ \ \_\ \  
  \ \_\ \_\  \ \_____\  \ \_\  \ \_\ \ \_\  \ \_____\ 
   \/_/ /_/   \/_____/   \/_/   \/_/  \/_/   \/_____/ 
                                                      
 `);
});

hexo.on("generateAfter", () => {
  if (!hexo.theme.config.theme_version_check) return;
  const request = https.get(
    RELEASE_API_URL,
    {
      headers: {
        "User-Agent": "hexo-theme-reimu",
      },
    },
    (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reportVersionCheckFailure();
        return;
      }

      let result = "";
      res.setEncoding("utf8");
      res.on("data", (data) => {
        result += data;
      });
      res.on("end", () => {
        try {
          const payload = JSON.parse(result);
          if (!payload || typeof payload.tag_name !== "string") {
            reportVersionCheckFailure();
            return;
          }

          const latest = parseVersion(payload.tag_name);
          const current = parseVersion(version);
          const isOutdated = isVersionGreater(latest, current);
          if (isOutdated) {
            hexo.log.warn(
              `Your hexo-theme-reimu is outdated. Current version: v${current.join(
                ".",
              )}, latest version: v${latest.join(".")}`,
            );
            hexo.log.warn(
              "Visit https://github.com/D-Sketon/hexo-theme-reimu/releases for more information.",
            );
          }
        } catch {
          reportVersionCheckFailure();
        }
      });
    },
  );

  request.setTimeout(VERSION_CHECK_TIMEOUT_MS, () => {
    request.destroy(new Error("Request timeout"));
  });

  request.on("error", () => {
    reportVersionCheckFailure();
  });
});
