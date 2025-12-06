
// Landmark Indices
const TIPS = { thumb: 4, index: 8, middle: 12, ring: 16, pinky: 20 };
const PIPS = { thumb: 3, index: 6, middle: 10, ring: 14, pinky: 18 };
const MCPS = { thumb: 2, index: 5, middle: 9, ring: 13, pinky: 17 };

type FingerState = {
    thumb: boolean;
    index: boolean;
    middle: boolean;
    ring: boolean;
    pinky: boolean;
};

// Simplified Finger Extension Check
function isFingerExtended(landmarks: any[], finger: keyof typeof TIPS): boolean {
    const tip = landmarks[TIPS[finger]];
    const pip = landmarks[PIPS[finger]];
    const mcp = landmarks[MCPS[finger]];

    if (finger === 'thumb') {
        // Thumb is tricky; check if tip is far from MCP in X axis (simplified)
        return Math.abs(tip.x - mcp.x) > 0.05;
    }

    // Y-axis check: In image coords, smaller Y is higher up.
    return tip.y < pip.y - 0.02;
}

export function detectChord(landmarks: any[]): string | null {
    const fingers: FingerState = {
        thumb: isFingerExtended(landmarks, 'thumb'),
        index: isFingerExtended(landmarks, 'index'),
        middle: isFingerExtended(landmarks, 'middle'),
        ring: isFingerExtended(landmarks, 'ring'),
        pinky: isFingerExtended(landmarks, 'pinky'),
    };

    // Map patterns to chords
    // True = Extended, False = Curled
    const patterns: Record<string, FingerState> = {
        'C': { thumb: false, index: true, middle: true, ring: false, pinky: false },
        'G': { thumb: false, index: true, middle: true, ring: true, pinky: true },
        'Am': { thumb: false, index: true, middle: true, ring: true, pinky: false },
        'F': { thumb: true, index: true, middle: false, ring: false, pinky: false },
        'D': { thumb: false, index: true, middle: true, ring: true, pinky: false }, // Similar to Am, often modified
        'Em': { thumb: false, index: true, middle: true, ring: false, pinky: false },
        'Rock': { thumb: true, index: true, middle: false, ring: false, pinky: true } // Metal \m/
    };

    for (const [chord, pattern] of Object.entries(patterns)) {
        let matches = 0;
        for (const finger of Object.keys(fingers) as Array<keyof FingerState>) {
            if (fingers[finger] === pattern[finger]) matches++;
        }
        // Allow 1 finger error for leniency
        if (matches >= 4) return chord;
    }

    return null;
}

export class ChordSmoother {
    private history: (string | null)[] = [];
    private historySize: number;

    constructor(historySize = 5) {
        this.historySize = historySize;
    }

    getStableChord(detectedChord: string | null): string | null {
        this.history.push(detectedChord);
        if (this.history.length > this.historySize) this.history.shift();

        const counts: Record<string, number> = {};
        for (const chord of this.history) {
            if (chord) counts[chord] = (counts[chord] || 0) + 1;
        }

        let best: string | null = null;
        let bestCount = 0;

        for (const [chord, count] of Object.entries(counts)) {
            if (count > bestCount) {
                bestCount = count;
                best = chord;
            }
        }

        // Require consistency
        return bestCount >= 3 ? best : null;
    }
}
