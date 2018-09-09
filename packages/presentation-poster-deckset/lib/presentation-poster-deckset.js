"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DecksetWatcher_1 = require("./DecksetWatcher");
var watcher = new DecksetWatcher_1.DecksetWatcher();
watcher.start();
watcher.onChangeNewPage(function (slideIndex) {
    console.log("=>", slideIndex);
});
//# sourceMappingURL=presentation-poster-deckset.js.map