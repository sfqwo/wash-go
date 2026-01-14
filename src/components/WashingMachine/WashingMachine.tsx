"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./WashingMachine.module.scss";

type CycleStep = {
  label: string;
  icon: string;
  durationMs: number;
};

const CLOTH_KEYS = ["cloth1", "cloth2", "cloth3", "cloth4"] as const;
const BUBBLE_KEYS = ["bubble1", "bubble2", "bubble3", "bubble4", "bubble5"] as const;
const CYCLE_STEPS: CycleStep[] = [
  { label: "Fill", icon: "💧", durationMs: 2500 },
  { label: "Wash", icon: "🌀", durationMs: 6000 },
  { label: "Rinse", icon: "💦", durationMs: 4000 },
  { label: "Spin", icon: "⚙️", durationMs: 3500 },
];
const TOTAL_CYCLE_DURATION = CYCLE_STEPS.reduce((total, step) => total + step.durationMs, 0);
const STEP_END_TIMES = (() => {
  let acc = 0;
  return CYCLE_STEPS.map((step) => {
    acc += step.durationMs;
    return acc;
  });
})();

const formatTimeLeft = (ms: number) => {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function WashingMachine() {
  const [isRunning, setIsRunning] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepTimeLeft, setStepTimeLeft] = useState(CYCLE_STEPS[0].durationMs);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    setHasCompleted(false);
    const startTimestamp = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTimestamp;
      const normalized = Math.min(elapsed / TOTAL_CYCLE_DURATION, 1);
      setProgress(normalized * 100);

      const foundIndex = STEP_END_TIMES.findIndex((endTime) => elapsed < endTime);
      const currentIndex = foundIndex === -1 ? CYCLE_STEPS.length - 1 : foundIndex;
      const currentStep = CYCLE_STEPS[currentIndex];
      const previousEndTime = currentIndex === 0 ? 0 : STEP_END_TIMES[currentIndex - 1];
      setCycleIndex(currentIndex);
      setStepTimeLeft(Math.max(0, currentStep.durationMs - (elapsed - previousEndTime)));

      if (normalized >= 1) {
        setHasCompleted(true);
        setCycleIndex(CYCLE_STEPS.length - 1);
        setStepTimeLeft(0);
        setProgress(100);
        setIsRunning(false);
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isRunning]);

  const resetCycleState = () => {
    setCycleIndex(0);
    setStepTimeLeft(CYCLE_STEPS[0].durationMs);
    setProgress(0);
  };

  const handleStart = () => {
    if (isRunning) {
      return;
    }
    resetCycleState();
    setHasCompleted(false);
    setIsRunning(true);
  };

  const handleStop = () => {
    if (!isRunning) {
      return;
    }
    setIsRunning(false);
    resetCycleState();
    setHasCompleted(false);
  };

  const currentStep = CYCLE_STEPS[cycleIndex] ?? CYCLE_STEPS[0];
  const statusLabel = isRunning ? `${currentStep.icon} ${currentStep.label}` : hasCompleted ? "Door unlocked!" : "";
  const statusTime = isRunning ? `${formatTimeLeft(stepTimeLeft)}` : hasCompleted ? "" : "Press start to begin";
  const showWater = isRunning;
  const showBubbles = isRunning;
  const startDisabled = isRunning;
  const stopDisabled = !isRunning;
  const progressWidth = `${Math.min(100, progress)}%`;
  const clsxDrum = clsx(styles.drum, { [styles.drumRunning]: isRunning });

  return (
    <div className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.control}>
          <div className={styles.display}>{statusLabel} {statusTime}</div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={clsx(styles.button, styles.button_stop)}
              onClick={handleStop}
              title="Stop machine"
              aria-label="Stop washing cycle"
              disabled={stopDisabled}
            />
            <button
              type="button"
              className={clsx(styles.button, styles.button_start)}
              onClick={handleStart}
              title="Start machine"
              aria-label="Start washing cycle"
              disabled={startDisabled}
            />
          </div>
        </div>

        <div className={styles.window}>
          <div className={clsxDrum}>
            <div className={styles.clothes}>
              {CLOTH_KEYS.map((key) => (
                <div
                  key={key}
                  className={clsx(styles.cloth, styles[key], { [styles.clothRunning]: isRunning })}
                />
              ))}
            </div>
          </div>

          {showWater && (
            <>
              <div className={styles.water} />
              {showBubbles ? (
                <div className={styles.bubbles}>
                  {BUBBLE_KEYS.map((key) => (
                    <div key={key} className={clsx(styles.bubble, styles[key])} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
