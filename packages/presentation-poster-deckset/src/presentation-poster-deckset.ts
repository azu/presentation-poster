import { DecksetWatcher } from "./DecksetWatcher";

const watcher = new DecksetWatcher();
watcher.start();
watcher.onChangeNewPage((slideIndex) => {
    console.log("=>", slideIndex);
});
