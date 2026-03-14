const https = require("node:https");
const { version } = require("../../package.json");

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
  https
    .get(
      "https://api.github.com/repos/D-Sketon/hexo-theme-reimu/releases/latest",
      {
        headers: {
          "User-Agent": "hexo-theme-reimu",
        },
      },
      (res) => {
        let result = "";
        res.on("data", (data) => {
          result += data;
        });
        res.on("end", () => {
          try {
            const latest = parseVersion(JSON.parse(result).tag_name);
            const current = parseVersion(version);
            const isOutdated = isVersionGreater(latest, current);
            if (isOutdated) {
              hexo.log.warn(
                `Your hexo-theme-reimu is outdated. Current version: v${current.join(
                  "."
                )}, latest version: v${latest.join(".")}`
              );
              hexo.log.warn(
                "Visit https://github.com/D-Sketon/hexo-theme-reimu/releases for more information."
              );
            }
          } catch (err) {
            hexo.log.warn(
              "Failed to detect version info. You can get the latest version info at https://github.com/D-Sketon/hexo-theme-reimu/releases"
            );
          }
        });
      }
    )
    .on("error", (err) => {
      hexo.log.warn(
        "Failed to detect version info. You can get the latest version info at https://github.com/D-Sketon/hexo-theme-reimu/releases"
      );
    });
});
