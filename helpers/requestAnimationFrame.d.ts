export interface RequestAnimationFrame {
    handle: number;
    callback: FrameRequestCallback;
    cancelled: boolean;
}
export default function requestAnimationFrame(fn: FrameRequestCallback): number;
export declare function cancel(id: number): void;
export declare function polyfull(object: any): void;
