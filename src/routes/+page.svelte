<script lang="ts">
	import { animation } from '$lib/stores/animation';
	import type { Servo, Keyframe, Animation } from '$lib/stores/animation';

	let animationVal: Animation;
	$: animation.subscribe((val) => {
		animationVal = val;
	});

	function handleUpdate(keyframe: Keyframe) {
		let servo: Servo = {
			id: null,
			initValue: null,
			endValue: null,
			pin: null
		};
		keyframe.servos.push(servo);
		animation.updateKeyframe(keyframe);
	}
</script>

<main class="m-20">
	<div class="flex text-xl">
		<div>Declare Intial Values</div>
		<div class="mx-10">
			<button
				class="btn btn-accent"
				on:click={() => {
					animation.addServo({
						pin: '',
						id: Math.random(),
						initValue: null,
						endValue: null
					});
				}}>Add Servo</button
			>
		</div>
	</div>

	<div class="mt-10">
		{#each animationVal.initValues as servo}
			<label for="" class="w-1/8 my-5 flex gap-5">
				<input
					type="text"
					bind:value={servo.pin}
					placeholder="Pin"
					class="input input-bordered w-1/12"
					on:change={() => {
						animation.updateServo(servo);
					}}
				/>
				<input
					type="text"
					bind:value={servo.initValue}
					placeholder="Inital Value"
					class="input input-bordered w-36"
					on:change={() => {
						animation.updateServo(servo);
					}}
				/>
				<button
					class="btn btn-accent"
					on:click={() => {
						animation.deleteServo(servo);
					}}>Delete</button
				>
			</label>
		{/each}
	</div>

	<div class="mt-10 flex gap-5">
		<div class="text-xl">Add Keyframes</div>
		<button
			class="btn btn-accent"
			on:click={() => {
				animation.addKeyFrame({
					id: Math.random(),
					time: null,
					servos: []
				});
			}}>Add Keyframes</button
		>
	</div>

	<div class="mt-10">
		{#each animationVal.keyframes as keyframe, i}
			<div class="collapse w-96 bg-base-200">
				<input type="radio" name="my-accordion-1" />
				<div class="collapse-title text-xl font-medium">Keyframe: {i + 1}</div>
				<div class="collapse-content">
					<div class="flex gap-5">
						<label for="">
							<input
								type="text"
								class="inputbordered input"
								placeholder="Time"
								bind:value={keyframe.time}
							/>
						</label>
						<button
							class="btn btn-accent"
							on:click={() => {
								handleUpdate(keyframe);
							}}>Add Servo</button
						>
					</div>
					<div class="mt-5 flex flex-col gap-5">
						{#each keyframe.servos as keyframeServo}
							<label for="" class="flex gap-3">
								<select
									name=""
									id=""
									class="select select-bordered"
									bind:value={keyframeServo}
									on:change={() => {
										animation.updateKeyframe(keyframe);
									}}
								>
									<option value="" disabled selected>Select Servo</option>
									{#each animationVal.initValues as servo}
										<option value={servo}>Servo: {servo.pin}</option>
									{/each}
								</select>
								<input
									type="text"
									placeholder="Inital Value"
									class="input input-bordered"
									bind:value={keyframeServo.initValue}
									on:change={() => {
                                        console.log(animationVal)
										animation.updateKeyFrameServos(keyframe);
									}}
								/>
							</label>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
