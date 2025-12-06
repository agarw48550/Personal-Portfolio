import type { Hands, Results } from '@mediapipe/hands';
import type { Camera } from '@mediapipe/camera_utils';

export class HandTracker {
    private hands: Hands | null = null;
    private camera: Camera | null = null;
    private drawUtils: any = null;
    private handsLib: any = null;
    private onResultsCallback: (results: Results) => void;

    constructor(onResults: (results: Results) => void) {
        this.onResultsCallback = onResults;
    }

    async start(videoElement: HTMLVideoElement) {
        // Dynamic imports to properly handle SSR/Build issues with MediaPipe
        const handsModule = await import('@mediapipe/hands');
        const cameraModule = await import('@mediapipe/camera_utils');
        const drawingModule = await import('@mediapipe/drawing_utils');

        this.handsLib = handsModule;
        this.drawUtils = drawingModule;

        // Handle potential default export wrappers
        const HandsClass = handsModule.Hands || (handsModule as any).default?.Hands;
        const CameraClass = cameraModule.Camera || (cameraModule as any).default?.Camera;

        if (!HandsClass || !CameraClass) {
            throw new Error('Failed to load MediaPipe libraries');
        }

        this.hands = new HandsClass({
            locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 0,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5,
        });

        this.hands.onResults(this.onResultsCallback);

        if (this.camera) {
            await this.camera.stop();
        }

        this.camera = new CameraClass(videoElement, {
            onFrame: async () => {
                if (this.hands) {
                    await this.hands.send({ image: videoElement });
                }
            },
            width: 640,
            height: 480,
        });

        await this.camera.start();
    }

    async stop() {
        if (this.camera) {
            await this.camera.stop();
            this.camera = null;
        }
        if (this.hands) {
            this.hands.close();
            this.hands = null;
        }
    }

    // Draw method encapsulated here to use the lazy-loaded utils
    draw(ctx: CanvasRenderingContext2D, results: Results) {
        if (!this.drawUtils || !this.handsLib || !results.multiHandLandmarks) return;

        const { drawConnectors, drawLandmarks } = this.drawUtils;
        const { HAND_CONNECTIONS } = this.handsLib;

        ctx.save();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (const landmarks of results.multiHandLandmarks) {
            if (drawConnectors && HAND_CONNECTIONS) {
                drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
            }
            if (drawLandmarks) {
                drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 2 });
            }
        }
        ctx.restore();
    }
}
