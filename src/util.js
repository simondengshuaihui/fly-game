function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
  }

  const windowWidth = Math.max(
    document.documentElement.clientWidth, 
    window.innerWidth
)

const windowHeight = Math.max(
    document.documentElement.clientHeight, 
    window.innerHeight
)

  export {
    IsPC,
    windowWidth,
    windowHeight
  }