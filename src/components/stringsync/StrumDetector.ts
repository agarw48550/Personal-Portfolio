export class StrumDetector {
    private lastY: number | null = null;
    private lastTime: number | null = null;
    private cooldown = false;

    detect(landmarks: any[]): boolean {
        const wrist = landmarks[0];
        const currentY = wrist.y;
        const currentTime = performance.now();

        if (this.lastY !== null && !this.cooldown && this.lastTime !== null) {
            const deltaY = currentY - this.lastY;
            const deltaTime = currentTime - this.lastTime;

            // Calculate velocity (units per ms)
            // Positive deltaY means moving DOWN in image coordinates
            const velocity = deltaY / deltaTime;

            // Threshold: 0.002 is approximate, tune as needed
            // Equivalent to moving 20% of screen height in 100ms (.2 / 100 = 0.002)
            if (velocity > 0.0015) {
                this.cooldown = true;
                setTimeout(() => this.cooldown = false, 150); // 150ms Debounce
                this.lastY = currentY;
                this.lastTime = currentTime;
                return true;
            }
        }

        this.lastY = currentY;
        this.lastTime = currentTime;
        return false;
    }
}
