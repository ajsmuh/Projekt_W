<script>
    let {form} = $props();
</script>

<h1> Register</h1>

{#if form?.error}
    <p id="warning"> {form.error}</p>
{/if}

<section>

    <form action="?/register" method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username"/>
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"/>
        </div>

        <button type="submit">Register</button>
    </form>
</section>

<style>
    #warning {
        border: 1px solid red;
        background-color: bisque;
        padding: 25px;
        margin: 10px;
    }
</style>