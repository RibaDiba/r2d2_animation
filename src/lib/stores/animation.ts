import { writable } from "svelte/store";

export interface Servo {
    id: number,
    pin: string,
    initValue: string,
    endValue: string
}

export interface Keyframe {
    time: string,
    id: number,
    servos: Servo[]
}

export interface Animation {
    initValues: Servo[],
    keyframes: Keyframe[]
}

function createAnimation(init: Animation) {
    const { set, update, subscribe } = writable<Animation>(init)

    return {
        subscribe,
        addServo: (servo: Servo) => {
            update(store => {
                store.initValues = [
                    ... store.initValues,
                    servo
                ]

                return store
            })
        },
        updateServo: (servo: Servo) => {
            update(store => {
                const index = store.initValues.findIndex(item => item.id == servo.id)
                store.initValues[index] = servo

                return store
            })
        },
        addKeyFrame: (keyframe: Keyframe) => {
            update(store => {
                store.keyframes = [
                    ... store.keyframes,
                    keyframe
                ]
                
                return store
            }) 
        },
        updateKeyframe: (keyframe: Keyframe) => {
            update(store => {
                const index = store.keyframes.findIndex(item => item.id == keyframe.id)
                store.keyframes[index] = keyframe

                return store
            })
        }

    }
}

export const animation = createAnimation({
    initValues: [],
    keyframes: []
})