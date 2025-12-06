import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export class HandTracker {
    private hands: Hands;
    private camera: Camera | null = null;

    constructor(onResults: (results: Results) => void) {
        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 0, // 0 = Lite (Fastest)
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5,
        });

        this.hands.onResults(onResults);
    }

    async start(videoElement: HTMLVideoElement) {
        if (this.camera) {
            await this.camera.stop();
        }

        this.camera = new Camera(videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: videoElement });
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
        this.hands.close();
    }
}
