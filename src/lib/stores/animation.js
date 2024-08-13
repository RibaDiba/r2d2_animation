import { writable } from "svelte/store";

function createExportJson(initState) {
    const { subscribe, update } = writable(initState);

    return {
        subscribe,
        addKeyFrame: (time) => {
            update((object) => [
                {
                    id: object.length,
                    animation: [],
                    time: time,
                },
                ...object
            ])
        },
        addServo: (keyFrameId, servoPin, initState, finalState) => {
            update((object) => {
                if (!object[keyFrameId]) {
                    return object
                }
                object[keyFrameId].animation.push({
                    servoPin: servoPin,
                    initState: initState,
                    finalState: finalState
                })
                return [...object]
            })
        },
        updateServo: (keyFrameId, servoPin, newInitState, newFinalState) => {
            update((object) => {
                if (!object[keyFrameId]) {
                    return object
                }
                const servoIndex = object[keyFrameId].animation.findIndex(servo => servo.servoPin === servoPin)
                if (servoIndex === -1) {
                    return object
                }
                object[keyFrameId].animation[servoIndex] = {
                    servoPin: servoPin,
                    initState: newInitState,
                    finalState: newFinalState
                }
                return [...object]
            })
        }
    };
}

export const animation = createExportJson([]);
