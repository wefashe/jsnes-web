import { Controller } from "jsnes";

// Mapping keyboard code to [controller, button]
const KEYS = {
  75: [1, Controller.BUTTON_A, "K"], // 玩家一 A键
  74: [1, Controller.BUTTON_B, "J"], // 玩家一 B键
  70: [1, Controller.BUTTON_SELECT, "F"], // 玩家一 切换
  72: [1, Controller.BUTTON_START, "H"], // 玩家一 开始
  87: [1, Controller.BUTTON_UP, "W"], // 玩家一 上
  83: [1, Controller.BUTTON_DOWN, "S"], // 玩家一 下
  65: [1, Controller.BUTTON_LEFT, "A"], // 玩家一 左
  68: [1, Controller.BUTTON_RIGHT, "D"], // 玩家一 右
  13: [2, Controller.BUTTON_A, "Enter"], // 玩家二 A键
  99: [2, Controller.BUTTON_B, "3"], // 玩家二 B键
  97: [2, Controller.BUTTON_SELECT, "1"], // 玩家二 切换
  98: [2, Controller.BUTTON_START, "2"], // 玩家二 开始
  38: [2, Controller.BUTTON_UP, "↑"], // 玩家二 上
  40: [2, Controller.BUTTON_DOWN, "↓"], // 玩家二 下
  37: [2, Controller.BUTTON_LEFT, "←"], // 玩家二 左
  39: [2, Controller.BUTTON_RIGHT, "→"] // 玩家二 右
};

export default class KeyboardController {
  constructor(options) {
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;
  }

  loadKeys = () => {
    var keys;
    try {
      keys = localStorage.getItem("keys");
      if (keys) {
        keys = JSON.parse(keys);
      }
    } catch (e) {
      console.log("Failed to get keys from localStorage.", e);
    }

    this.keys = keys || KEYS;
  };

  setKeys = newKeys => {
    try {
      localStorage.setItem("keys", JSON.stringify(newKeys));
      this.keys = newKeys;
    } catch (e) {
      console.log("Failed to set keys in localStorage");
    }
  };

  handleKeyDown = e => {
    var key = this.keys[e.keyCode];
    if (key) {
      this.onButtonDown(key[0], key[1]);
      e.preventDefault();
    }
  };

  handleKeyUp = e => {
    var key = this.keys[e.keyCode];
    if (key) {
      this.onButtonUp(key[0], key[1]);
      e.preventDefault();
    }
  };

  handleKeyPress = e => {
    e.preventDefault();
  };
}
