<script lang="ts">
    import { animations } from "../stores/animationStore"
    import type { AnimationStore } from "$lib/stores/animationStore";
    import type { Animation } from "$lib/stores/animation";
    let ip: string = ""
    import axios from "axios";

    let animationStore: AnimationStore
    $: animations.subscribe(val => {
        animationStore = val
    })

    function handleCopy(animation: Animation) {
        let animationString = JSON.stringify(animation)

        navigator.clipboard.writeText(animationString)
            .then(() => {
                alert('Copied')
            })
            .catch(err => {
                alert('Some Error occured, check  console')
                console.log(err)
            })
    }
</script>

<main>

    <table class="table mt-10 w-96">
        <thead>
            <th>Name</th>
        </thead>
        <tbody>
            {#each animationStore.Animations as animation} 
                <tr>
                    <td>{animation.name}</td>
                    <td>
                        <button class="btn-accent btn btn-sm" on:click={() => {
                            handleCopy(animation)
                        }}>Copy to Clipboard</button>
                    </td>
                    <td>
                        <button class="btn btn-accent btn-ghost" on:click={() => {
                            animations.deleteAnimation(animation)
                        }}>Delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>

    </table>
</main>