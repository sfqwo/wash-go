"use client";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  useId,
} from "react";

import styles from "./WashingMachine.module.scss";

type CycleStep = {
  label: string;
  icon: string;
  durationMs: number;
};

const CLOTH_COUNT = 5;
const BUBBLE_COUNT = 5;
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
  const [stepTimeLeft, setStepTimeLeft] = useState(CYCLE_STEPS[0].durationMs);
  const [isPending, startTransition] = useTransition();
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const statusId = useId();

  const cleanupAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => cleanupAnimation, [cleanupAnimation]);

  useEffect(() => {
    if (!isRunning) {
      cleanupAnimation();
      startTimeRef.current = null;
      return undefined;
    }
    startTimeRef.current = performance.now();
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const normalized = Math.min(elapsed / TOTAL_CYCLE_DURATION, 1);

      const foundIndex = STEP_END_TIMES.findIndex((endTime) => elapsed < endTime);
      const currentIndex = foundIndex === -1 ? CYCLE_STEPS.length - 1 : foundIndex;
      const currentStep = CYCLE_STEPS[currentIndex];
      const previousEndTime = currentIndex === 0 ? 0 : STEP_END_TIMES[currentIndex - 1];
      setCycleIndex(currentIndex);
      setStepTimeLeft(Math.max(0, currentStep.durationMs - (elapsed - previousEndTime)));

      if (normalized >= 1) {
        startTransition(() => {
          setCycleIndex(CYCLE_STEPS.length - 1);
          setStepTimeLeft(0);
          setIsRunning(false);
        });
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cleanupAnimation();
    };
  }, [cleanupAnimation, isRunning, startTransition]);

  const resetCycleState = useCallback(() => {
    setCycleIndex(0);
    setStepTimeLeft(CYCLE_STEPS[0].durationMs);
  }, []);

  const handleStart = useCallback(() => {
    if (isRunning) {
      return;
    }
    startTransition(() => {
      resetCycleState();
      startTimeRef.current = null;
      setIsRunning(true);
    });
  }, [isRunning, resetCycleState, startTransition]);

  const handleStop = useCallback(() => {
    if (!isRunning) {
      return;
    }
    startTransition(() => {
      setIsRunning(false);
      resetCycleState();
    });
  }, [isRunning, resetCycleState, startTransition]);

  const currentStep = CYCLE_STEPS[cycleIndex] ?? CYCLE_STEPS[0];
  const statusText = useMemo(
    () => (isRunning ? `${currentStep.icon} ${currentStep.label}` : "Press start to begin"),
    [currentStep.icon, currentStep.label, isRunning],
  );
  const statusMeta = useMemo(
    () => (isRunning ? `${formatTimeLeft(stepTimeLeft)}` : ""),
    [isRunning, stepTimeLeft],
  );
  const clsxDrum = clsx(styles.drum, { [styles.drumRunning]: isRunning });
  const disableStart = isRunning || isPending;
  const disableStop = !isRunning && !isPending;

  return (
    <div className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.control}>
          <div className={styles.displayCluster}>
            <div id={statusId} className={styles.display} aria-live="polite">
              {statusText}
              &nbsp;
              {statusMeta}
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={clsx(styles.button, styles.button_stop)}
              onClick={handleStop}
              title="Stop machine"
              aria-label="Stop washing cycle"
              disabled={disableStop}
            />
            <button
              type="button"
              className={clsx(styles.button, styles.button_start)}
              onClick={handleStart}
              title="Start machine"
              aria-label="Start washing cycle"
              disabled={disableStart}
            />
          </div>
        </div>

        <div className={styles.window}>
          <div className={clsxDrum}>
            <div className={styles.clothes}>
              {Array.from({ length: CLOTH_COUNT }).map((_, index) => {
                const key = `cloth${index}`;
                return (
                <div
                  key={key}
                  className={clsx(styles.cloth, styles[key], { [styles.clothRunning]: isRunning })}
                />
              );
              })}
            </div>
          </div>

          {isRunning ? (
            <>
              <div className={styles.water} />
              <div className={styles.bubbles}>
                {Array.from({ length: BUBBLE_COUNT }).map((_, index) => {
                  const key = `bubble${index}`;
                  return (
                    <div key={key} className={clsx(styles.bubble, styles[key])} />
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
