import "@jxa/global-type";
import { run } from "@jxa/run";
import { EventEmitter } from "events"

const debug = require("debug")("presentation-poster-deckset");
const OnChangeNewPage = "OnChangeNewPage";

export class DecksetWatcher extends EventEmitter {
    private INTERVAL_MS = 2500;

    private fileAndSlideIndexMap = new Map<string, number[]>();
    private timeId!: any;

    start() {
        this.timeId = setInterval(this.checkPage, this.INTERVAL_MS);
    }

    stop() {
        clearInterval(this.timeId)
    }

    onChangeNewPage = (handler: ((slideIndex: number) => void)) => {
        this.addListener(OnChangeNewPage, handler);
    };

    private checkPage = async () => {
        try {
            const slide = await this.getDeckSlide();
            debug("slide: %o", slide);
            const slideIndexes = this.fileAndSlideIndexMap.get(slide.fileName) || [];
            if (slideIndexes.includes(slide.slideIndex)) {
                this.fileAndSlideIndexMap.set(slide.fileName, slideIndexes);
                return;
            }
            debug(`new page: ${slide.slideIndex} on ${slide.fileName}`);
            slideIndexes.push(slide.slideIndex);
            this.fileAndSlideIndexMap.set(slide.fileName, slideIndexes);
            this.emit(OnChangeNewPage, slide.slideIndex);
        } catch (error) {
            debug(error);
        }
    };

    private getDeckSlide = () => {
        return run<{ fileName: string, slideIndex: number }>((() => {
            const deckset = Application("Deckset");
            deckset.includeStandardAdditions = true;
            const EMPTY = {
                fileName: "",
                slideIndex: -1
            };
            if(!deckset.running()){
                return EMPTY;
            }
            if (!deckset) {
                return EMPTY;
            }
            if (!deckset.documents) {
                return EMPTY
            }
            const document = deckset.documents[0];
            if (!document) {
                return EMPTY;
            }
            const filename = document.name();
            const slideIndex = document.slideindex();
            return {
                fileName: filename,
                slideIndex: slideIndex
            };
        }));
    }
}
