import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type Servo, type Keyframe, type Animation, animation } from './animation';

export interface AnimationStore {
	Animations: Animation[];
}

function createAnimationStore(initValue: AnimationStore) {
	const { subscribe, update, set } = writable<AnimationStore>(initValue);

	return {
		subscribe,
		addAnimation: (animation: Animation) => {
			update((store) => {
				if (animation.name === "") {
					alert('Kavish please name your animations');
					console.log('no name')
				} else {
					console.log('name provided')
					store.Animations = [...store.Animations, animation];
				}

				return store;
			});
		},
		deleteAnimation: (aniamtion: Animation) => {
			update(store => {
				store.Animations = store.Animations.filter(item => item.id !== aniamtion.id)

				return store
			})
		}
	};
}

export const animations = createAnimationStore({
    Animations: []
})

animations.subscribe((val) => {
	if (browser) {
		localStorage.setItem('animationStore', JSON.stringify(val));
	}
});
