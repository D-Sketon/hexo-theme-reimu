const packageData = require("../../package.json");

const copyright = String.raw`
 ______     ______     __     __    __     __  __    
/\  == \   /\  ___\   /\ \   /\ "-./  \   /\ \/\ \   
\ \  __<   \ \  __\   \ \ \  \ \ \-./\ \  \ \ \_\ \  
 \ \_\ \_\  \ \_____\  \ \_\  \ \_\ \ \_\  \ \_____\ 
  \/_/ /_/   \/_____/   \/_/   \/_/  \/_/   \/_____/ 
                                                  
`;

hexo.extend.helper.register("copyright", () => {
  return `
  <script>
    console.log(String.raw\`%c ${copyright}\`,'color: #ff5252;')
    console.log('%c Theme.Reimu v' + '${packageData.version}' + ' %c https://github.com/D-Sketon/hexo-theme-reimu ', 'color: white; background: #ff5252; padding:5px 0;', 'padding:4px;border:1px solid #ff5252;')
  </script>
  `;
});
