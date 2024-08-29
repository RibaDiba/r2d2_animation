<script lang="ts">
    import { animations } from "../stores/animationStore"
    import type { AnimationStore } from "$lib/stores/animationStore";
    let ip: string = ""
    import axios from "axios";

    let animationStore: AnimationStore
    $: animations.subscribe(val => {
        animationStore = val
    })

    function handlePost() {
    const jsonData = animationStore; // Replace with your actual JSON data
    const url = 'http://example.com/upload-json'; // Replace with your actual URL

    axios.post(url, jsonData)
        .then(response => {
            console.log('Data posted successfully:', response.data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}
</script>

<main>

    <table class="table mt-10">
        <thead>
            <th>Name</th>
        </thead>
        <tbody>
            {#each animationStore.Animations as animation} 
                <tr>
                    <td>{animation.name}</td>
                    <td>
                        <button class="btn btn-accent btn-sm" on:click={() => {
                            handlePost()
                        }}>Send</button>
                    </td>
                </tr>
            {/each}
        </tbody>

    </table>

    <div class="mt-10">
        <label for="">
            <input type="text" class="input-bordered input" bind:value={ip} placeholder="Enter IP">
        </label>
    </div>
</main>