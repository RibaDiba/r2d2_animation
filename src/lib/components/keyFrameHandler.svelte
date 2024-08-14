<script>

    import { animation } from "../stores/animation";
    import { initState } from "../stores/initialState";
    import plusIcon from "../images/plusIcon.png"

    let checked

    let animationJson
    $: animation.subscribe((value) => {
        animationJson = value
    })

    let initJson 
    $: initState.subscribe((value) => {
        initJson = value
    })

    function addServo(id) {
        animation.addServo(id, "", "", "")
    }

</script>

<main>

    {#each animationJson as keyframe, i}
        <div class="collapse collapse-plus bg-base-200 w-1/2">
            <input type="checkbox" name="my-accordion-3" bind:checked={checked} />
            <div class="collapse-title text-xl font-medium">Keyframe {i+1}</div>
            <div class="collapse-content">
                <div class="text-xl">Select servos that you want to change</div>

                <div>
                    <button class="mt-2" on:click={() => {
                        addServo(keyframe.id)
                    }}>
                        <img src={plusIcon} alt="">
                    </button>
                </div>

                <div>
                    {#each keyframe.animation as servo}
                        <select name="" id="" class="select select-primary"></select>
                    {/each}
                </div>
            </div>
        </div>     
    {/each}

</main>