import { writable } from "svelte/store";

function createExportJson(initState) {
    const { subscribe, update } = writable(initState);

    return {
        subscribe,
        addKeyFrame: (time) => {
            update((object) => [
                {
                    id: Math.random(),
                    animation: [],
                    time: time,
                },
                ...object
            ])
        },
        addServo: (keyFrameId, servoPin, initState, finalState) => {
            update((object) => {
                const keyframeIndex = object.findIndex(item => item.id === keyFrameId);
                if (keyframeIndex !== -1) {
                    const updatedKeyframe = {
                        ...object[keyframeIndex],
                        animation: [
                            ...object[keyframeIndex].animation,
                            {
                                servoPin: servoPin,
                                initState: initState,
                                finalState: finalState
                            }
                        ]
                    };

                    // Return a new array with the updated keyframe
                    return [
                        ...object.slice(0, keyframeIndex),
                        updatedKeyframe,
                        ...object.slice(keyframeIndex + 1)
                    ];
                }
            });
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
