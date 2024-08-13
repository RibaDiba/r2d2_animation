<script> 

    import { animation } from '../lib/stores/animation'
    import { initState } from '../lib/stores/initialState'

    let animationValue

    let initServos
    $: initState.subscribe(value => {
        initServos = value
    })

    function addKeyFrame() {
        animation.addKeyFrame(5)
        animation.subscribe(value => {
            animationValue = value
        })
        console.log(animationValue)
    }

</script>

<main class="m-10">

    <h1 class="text-2xl mb-10">Enter Initial Positions</h1>

    <div>
        <button class="btn">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAW0lEQVR4nO2VQQrAIAwE53n+/wnxIdtLC0WQqKGkhwzkZMzAEhSKTRrQAR2W3TOmWGC4XpIpT9Mp8u6nCxQ8LwHbEWmx/isYqS0iPSKPfIF9/Vy3oMS8D6dg5ALzIZ+a+RX41gAAAABJRU5ErkJggg==">
        </button>
    </div>

    <div class="my-5">
        {#each initServos as servo}
            <div>
                <label for="" class="input input-bordered input-primary p-3 rounded-lg mr-2">
                    <input type="text" placeholder="Name">
                </label>

                <label for="" class="input p-3 input-bordered input-primary rounded-lg">
                    <input type="text" placeholder="Value" class="w-20">
                </label>

                <label for="" class="input p-3 input-bordered input-primary rounded-lg ml-2">
                    <input type="text" class="w-10" placeholder="Pin">
                </label>
            </div>
        {/each}
    </div>

    <h1 class="text-2xl">Select Time</h1>

    <div class="my-5">
        <label for="" class="input rounded-lg input-bordered p-4">
            <input type="text" placeholder="Enter Here (seconds)" class="">
        </label>
        <button class="btn rounded-lg btn-primary" on:click={addKeyFrame}>Add Keyframe</button>

    </div>


</main>