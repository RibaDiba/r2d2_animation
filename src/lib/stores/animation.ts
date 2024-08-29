import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Servo {
	id: number | null;
	pin: string | null;
	initValue: number | null;
	endValue: number | null;
}

export interface Keyframe {
	time: number | null;
	id: number | null;
	servos: Servo[];
}

export interface Animation {
	initValues: Servo[];
	keyframes: Keyframe[];
    id: number | null;
    name: string | null
}

function createAnimation(init: Animation) {
	const { set, update, subscribe } = writable<Animation>(init);

	return {
		subscribe,
		addServo: (servo: Servo) => {
			update((store) => {
				store.initValues = [...store.initValues, servo];

				return store;
			});
		},
		deleteServo: (servo: Servo) => {
			update((store) => {
				store.initValues = store.initValues.filter((item) => item.id !== servo.id);

				return store;
			});
		},
		updateServo: (servo: Servo) => {
			update((store) => {
				const index = store.initValues.findIndex((item) => item.id == servo.id);
				store.initValues[index] = servo;

				return store;
			});
		},
		addKeyFrame: (keyframe: Keyframe) => {
			update((store) => {
				store.keyframes = [...store.keyframes, keyframe];

				return store;
			});
		},
		updateKeyframe: (keyframe: Keyframe) => {
			update((store) => {
				const index = store.keyframes.findIndex((item) => item.id == keyframe.id);
				store.keyframes[index] = keyframe;

				return store;
			});
		},
		updateKeyFrameServos: (keyframe: Keyframe) => {
			update((store) => {
				const index = store.keyframes.findIndex((item) => item.id == keyframe.id);
				store.keyframes[index].servos = keyframe.servos;

				return store;
			});
		},
		deleteServoKeyframe: (keyframe: Keyframe, servo: Servo) => {
			update((store) => {
				const keyframeIndex = store.keyframes.findIndex((item) => item.id == keyframe.id);
				store.keyframes[keyframeIndex].servos = store.keyframes[keyframeIndex].servos.filter(
					(item) => item.id !== servo.id
				);

				return store;
			});
		},
		clearAnimation: () => {
			update((store) => {
				store = init

				return store
			})
		}
	};
}

export const animation = createAnimation({
	initValues: [],
	keyframes: [],
    id: Math.random(),
    name: ""
});

animation.subscribe((val) => {
	if (browser) {
		localStorage.setItem('animations', JSON.stringify(val));
	}
});
