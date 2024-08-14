<script> 

    import { animation } from '../lib/stores/animation'
    import { initState } from '../lib/stores/initialState'
    import plusIcon from '../lib/images/plusIcon.png'
    import KeyFrameHandler from '../lib/components/keyFrameHandler.svelte';

    let animationValue
    let time

    let initServos
    $: initState.subscribe(value => {
        initServos = value
    })

    function addKeyFrame(time) {
        animation.addKeyFrame(time)
        animation.subscribe(value => {
            animationValue = value
        })
        console.log(animationValue)
    }

    function handleAddServo() {
        initState.addServo("", "", "")
        console.log(initServos)
    }

    function handleChange(servo) {
        console.log(servo)
    }

</script>

<main class="m-10">


    <div class="flex items-center mb-5">
        <h1 class="text-2xl ">Enter Initial Positions</h1>
        <button class=" py-2 m-2 rounded-lg" on:click={handleAddServo}>
            <img src={plusIcon} alt="">
        </button>
    </div>

    <div class="my-5">
        {#each initServos as servo}
            <div class="flex items-center mb-3">
                <label for="" class="input input-bordered input-primary p-3 rounded-lg mr-2">
                    <input type="text" placeholder="Name" bind:value={servo.servoName} on:change={() => {
                        handleChange(servo)
                    }}>
                </label>

                <label for="" class="input p-3 input-bordered input-primary rounded-lg">
                    <input type="text" placeholder="Value" class="w-20" bind:value={servo.initState} on:change={() => {
                        handleChange(servo)
                    }}>
                </label>

                <label for="" class="input p-3 input-bordered input-primary rounded-lg ml-2">
                    <input type="text" class="w-10" placeholder="Pin" bind:value={servo.servoPin} on:change={() => {
                        handleChange(servo)
                    }}>
                </label>
            </div>
        {/each}
    </div>

    <h1 class="text-2xl">Select Time</h1>

    <div class="my-5">
        <label for="" class="input rounded-lg input-bordered p-4">
            <input type="text" placeholder="Enter Here (seconds)" class="" bind:value={time}>
        </label>
        <button class="btn rounded-lg btn-primary" on:click={() => {
            addKeyFrame(time)
        }}>Add Keyframe</button>
    </div>

    <KeyFrameHandler />


</main>