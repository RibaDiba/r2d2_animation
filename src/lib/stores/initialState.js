import { writable } from 'svelte/store';

function createInitialState(init) {
	const { subscribe, update } = writable(init);

	return {
		subscribe,
		addServo: (servoName, servoPin, initState) => {
			update((object) => [
				...object,
				{
					id: Math.random(),
					servoName: servoName,
					servoPin: servoPin,
					initState: initState
				}
			]);
		},
		updateServo: (servo) => {
			update((object) => {
				object = object.filter((item) => item.id !== servo.id);
				object = [
                    ...object,
                    {
                        id: servo.id,
                        servoName: servo.servoName,
                        servoPin: servo.servoPin,
                        initState: servo.initState
                    }
                ];
			});
		},
		removeServo: (servoPin) => {
			update((object) => object.filter((item) => item.servoPin !== servoPin));
		}
	};
}

export const initState = createInitialState([]);
