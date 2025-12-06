export class AudioEngine {
    private audioCtx: AudioContext | null = null;
    private buffers: Record<string, AudioBuffer> = {};
    private isPreloaded = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.audioCtx = new AudioContextClass({ latencyHint: 'interactive' });
        }
    }

    async resume() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }
    }

    async preload() {
        if (this.isPreloaded || !this.audioCtx) return;

        const chords = ['C', 'G', 'Am', 'F', 'D', 'Em', 'Rock'];

        // Note: Assuming files exist at /public/sounds/[chord].mp3
        // We will need to generate or mock these if they don't exist.
        // For robust error handling, we'll try to load, but fallback to synthesizer if fails.

        const loadPromises = chords.map(async (chord) => {
            try {
                const response = await fetch(`/sounds/${chord}.mp3`);
                if (!response.ok) throw new Error('File not found');
                const arrayBuffer = await response.arrayBuffer();
                const info = await this.audioCtx!.decodeAudioData(arrayBuffer);
                this.buffers[chord] = info;
            } catch (e) {
                console.warn(`Failed to load sound for ${chord}, falling back to synth.`);
                // Fallback or just empty
            }
        });

        await Promise.all(loadPromises);
        this.isPreloaded = true;
        console.log('Audio Engine Preloaded');
    }

    play(chord: string) {
        if (!this.audioCtx) return;

        if (this.buffers[chord]) {
            // Play sample
            const source = this.audioCtx.createBufferSource();
            source.buffer = this.buffers[chord];
            source.connect(this.audioCtx.destination);
            source.start(0);
        } else {
            // Synthesize backup sound (simple pluck effect)
            this.synthesizeChord(chord);
        }
    }

    private synthesizeChord(chordName: string) {
        if (!this.audioCtx) return;
        // Simple oscillator chord for fallback
        // Very basic frequencies
        const baseFreqs: Record<string, number[]> = {
            'C': [261.63, 329.63, 392.00], // C-E-G
            'G': [196.00, 246.94, 293.66], // G-B-D
            'Am': [220.00, 261.63, 329.63], // A-C-E
            'F': [174.61, 220.00, 261.63], // F-A-C
            'D': [146.83, 220.00, 293.66], // D-A-D
            'Em': [164.81, 196.00, 246.94], // E-G-B
            'Rock': [82.41, 123.47, 164.81] // Power chord E5
        };

        const freqs = baseFreqs[chordName] || baseFreqs['C'];
        const now = this.audioCtx.currentTime;

        freqs.forEach((f, i) => {
            const osc = this.audioCtx!.createOscillator();
            const gain = this.audioCtx!.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now);

            // Envelope
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.1, now + 0.02 + (i * 0.01)); // Stagger strum
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

            osc.connect(gain);
            gain.connect(this.audioCtx!.destination);

            osc.start(now);
            osc.stop(now + 1.5);
        });
    }
}
