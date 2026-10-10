/**
 * Web Audio API synth sounds + Web Speech API helper for StoryPaw!
 */

class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Pleasant ascending chime for correct answers
  playSuccessChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.09);

      gain.gain.setValueAtTime(0, startTime + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.2, startTime + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + idx * 0.09);
      osc.stop(startTime + idx * 0.09 + 0.45);
    });
  }

  // Soft gentle nudge for incorrect answers (low affective filter)
  playGentleNudge() {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, startTime); // E4
    osc.frequency.exponentialRampToValueAtTime(293.66, startTime + 0.2); // D4

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.28);
  }

  // Joyful fanfare for final badge unlock
  playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.35 }, // C6
      { f: 880.00, d: 0.12 }, // A5
      { f: 1046.50, d: 0.5 }, // C6
    ];

    let t = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d + 0.05);

      t += note.d * 0.95;
    });
  }

  // Unlock chime when audio completes and Next button becomes unlocked
  playUnlockChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    [659.25, 987.77].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.1);
      gain.gain.setValueAtTime(0.15, startTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.1);
      osc.stop(startTime + i * 0.1 + 0.35);
    });
  }

  // Soft button tap
  playTap() {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, startTime);
    osc.frequency.exponentialRampToValueAtTime(880, startTime + 0.05);

    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.07);
  }
}

export const sfx = new SoundEffects();

// Web Speech API Narrator
export class StoryNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private fallbackTimer: number | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private getVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    // Prioritize natural US English voices
    const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Karen') || v.name.includes('Zira')));
    if (usVoice) return usVoice;
    return voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en')) || null;
  }

  public speakText(text: string, rate: number = 1.0, onEnd?: () => void) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    const voice = this.getVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  public narratePage(
    fullText: string,
    words: string[],
    rate: number = 1.0,
    onWordHighlight: (wordIndex: number) => void,
    onComplete: () => void
  ) {
    if (!this.synth) {
      // Simulate playback if Web Speech is unavailable
      let idx = 0;
      const interval = 450 / rate;
      const timer = window.setInterval(() => {
        if (idx < words.length) {
          onWordHighlight(idx);
          idx++;
        } else {
          window.clearInterval(timer);
          onWordHighlight(-1);
          onComplete();
        }
      }, interval);
      return () => window.clearInterval(timer);
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    const voice = this.getVoice();
    if (voice) utterance.voice = voice;

    let boundaryFired = false;
    let wordCursor = 0;

    // Use boundary event when supported
    utterance.onboundary = (e: SpeechSynthesisEvent) => {
      boundaryFired = true;
      if (e.name === 'word') {
        const charIdx = e.charIndex;
        // Find which word index corresponds to charIdx
        let accumulated = 0;
        let matchedIdx = 0;
        for (let i = 0; i < words.length; i++) {
          const wLen = words[i].length;
          if (charIdx >= accumulated && charIdx <= accumulated + wLen + 1) {
            matchedIdx = i;
            break;
          }
          accumulated += wLen + 1;
        }
        wordCursor = matchedIdx;
        onWordHighlight(matchedIdx);
      }
    };

    // Fallback word highlighting interval in case browser doesn't emit onboundary
    const durationPerWordMs = 420 / rate;
    const fallbackInterval = window.setInterval(() => {
      if (!boundaryFired && this.isSpeaking) {
        if (wordCursor < words.length) {
          onWordHighlight(wordCursor);
          wordCursor++;
        }
      }
    }, durationPerWordMs);

    utterance.onend = () => {
      window.clearInterval(fallbackInterval);
      this.isSpeaking = false;
      this.currentUtterance = null;
      onWordHighlight(-1);
      onComplete();
    };

    utterance.onerror = () => {
      window.clearInterval(fallbackInterval);
      this.isSpeaking = false;
      this.currentUtterance = null;
      onWordHighlight(-1);
      onComplete();
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.synth.speak(utterance);

    return () => {
      window.clearInterval(fallbackInterval);
      this.stop();
    };
  }

  public stop() {
    if (this.fallbackTimer) {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public getSpeakingState() {
    return this.isSpeaking;
  }
}

export const narrator = new StoryNarrator();
