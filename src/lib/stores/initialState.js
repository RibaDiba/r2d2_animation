import { writable } from "svelte/store";

function createInitialState(init) {
    const { subscribe, update } = writable(init)

    return {
        subscribe,
        addServo: (servoName, servoPin, initState) => {
            update((object) => {
                object = [
                    {
                        servoName: servoName,
                        servoPin: servoPin,
                        initState: initState
                    }
                ]
            })
        },
        removeServo: (servoPin) => {
            update(object => {
                object = object.filter(item => item.servoPin !== servoPin)
            })
        }
    }
}

export const initState = createInitialState([{
    servoPin: 0,
    initState: 0
}])