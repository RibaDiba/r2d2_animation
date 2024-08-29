<script lang="ts">
    import { animation } from "../stores/animation"
    import type { Animation } from "../stores/animation";
    import { animations } from "../stores/animationStore";

    let animationVal: Animation
    $: animation.subscribe(val => {
        animationVal = val
    })
    let name: string = ""

</script>

<main>
    <label for="" class="flex gap-5">
        <input type="text"
            class="input input-bordered"
            placeholder="Enter Name"
            bind:value={name}
        >
        <button class="btn btn-accent" on:click={() => {
            let store = {
                initValues: animationVal.initValues,
                keyframes: animationVal.keyframes,
                id: Math.random(),
                name: name
            }

            animations.addAnimation(store)
            animation.clearAnimation()
            name = ""
        }}>Add Animation</button>
    </label>
</main>