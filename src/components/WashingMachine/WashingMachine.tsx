"use client";
import clsx from "clsx";
import { useState } from "react";

import styles from "./WashingMachine.module.scss";

const CLOTHES_COUNT = 4;
const BUBBLES_COUNT = 5;

export function WashingMachine() {
  const [isRunning, setIsRunning] = useState(true);
  const titleDisplay = isRunning ? "⚡ WASHING..." : "💤 Ready!";
  const disabledStart = isRunning;
  const disabledStop = !isRunning;
  const clsxButtonStart = clsx(
    styles.button,
    styles.button_start,
    { [styles.button_disabled]: disabledStart },
  );
  const clsxButtonStop = clsx(
    styles.button,
    styles.button_stop,
    { [styles.button_disabled]: disabledStop },
  );
  const clsxDrum = clsx(styles.drum, { [styles.drumRunning]: isRunning });

  const handleChangeMachineState = () => setIsRunning((running) => !running);

  return (
    <div className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.control}>
          <div className={styles.display}>
            {titleDisplay}
          </div>
          <div className={styles.buttons}>
            <button
              className={clsxButtonStop}
              onClick={handleChangeMachineState}
              title="Stop Machine"
              disabled={disabledStop}
            />
            <button
              className={clsxButtonStart}
              onClick={handleChangeMachineState}
              title="Start Machine"
              disabled={disabledStart}
            />
          </div>
        </div>

        <div className={styles.window}>
          <div className={clsxDrum}>
            <div className={styles.clothes}>
              {Array.from(Array(CLOTHES_COUNT).keys()).map((_, index) => {
                const key = `cloth${index + 1}`;
                const clsxCloth = clsx(styles.cloth, styles[key], { [styles.clothRunning]: isRunning });
                return <div key={key} className={clsxCloth} />;
              })}
            </div>
          </div>

          {isRunning ? (
            <>
              <div className={styles.water} />
              <div className={styles.bubbles}>
                {Array.from(Array(BUBBLES_COUNT).keys()).map((_, index) => {
                  const key = `bubble${index + 1}`;
                  const clsxBuble = clsx(styles.bubble, styles[key]);
                  return <div key={key} className={clsxBuble} />;
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
