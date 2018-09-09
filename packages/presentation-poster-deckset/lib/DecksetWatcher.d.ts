/// <reference types="node" />
import "@jxa/global-type";
import { EventEmitter } from "events";
export declare class DecksetWatcher extends EventEmitter {
    private INTERVAL_MS;
    private fileAndSlideIndexMap;
    private timeId;
    start(): void;
    stop(): void;
    onChangeNewPage: (handler: (slideIndex: number) => void) => void;
    private checkPage;
    private getDeckSlide;
}
