<script>
    let { form } = $props();
    let showPassword = $state(false);
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-6">


    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div class="relative w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-2xl">

       
        <div class="hidden lg:flex flex-col justify-center p-16 text-white bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
            <span class="text-indigo-300 uppercase tracking-[0.3em] text-sm">
                Welcome Back
            </span>

            <h1 class="text-6xl font-black mt-4 leading-tight">
                Secure Login Experience
            </h1>

            <p class="mt-6 text-slate-300 text-lg">
                Sign in to access your dashboard, manage your account,
                and continue where you left off.
            </p>

            <div class="mt-10 flex gap-4">
                <div class="h-3 w-3 rounded-full bg-indigo-400"></div>
                <div class="h-3 w-3 rounded-full bg-purple-400"></div>
                <div class="h-3 w-3 rounded-full bg-cyan-400"></div>
            </div>
        </div>

        <div class="p-8 sm:p-14">

            <div class="mb-10">
                <h2 class="text-4xl font-black text-white">
                    Sign In
                </h2>

                <p class="text-slate-400 mt-2">
                    Enter your credentials below
                </p>
            </div>

            {#if form?.error}
                <div class="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-300">
                    {form.error}
                </div>
            {/if}

            <form action="?/login" method="POST" class="space-y-5">

                <div>
                    <label class="text-sm text-slate-400 mb-2 block">
                        Username
                    </label>

                    <input
                        name="username"
                        type="text"
                        required
                        class="w-full h-14 rounded-xl bg-white/5 border border-white/10 px-5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        placeholder="Enter username"
                    />
                </div>

            
                <div>
                    <label class="text-sm text-slate-400 mb-2 block">
                        Password
                    </label>

                    <div class="relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            class="w-full h-14 rounded-xl bg-white/5 border border-white/10 px-5 pr-14 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="Enter password"
                        />

                        <button
                            type="button"
                            onclick={() => showPassword = !showPassword}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        </button>
                    </div>
                </div>

                <div class="flex justify-between items-center text-sm">
                    <label class="flex items-center gap-2 text-slate-400">
                        <input type="checkbox" />
                        Remember me
                    </label>

                    <a
                        href="/forgot-password"
                        class="text-indigo-400 hover:text-indigo-300"
                    >
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    class="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition"
                >
                    Sign In
                </button>

                <div class="relative py-3">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-white/10"></div>
                    </div>

                    <div class="relative text-center">
                        <span class="bg-transparent px-4 text-slate-500 text-sm">
                            OR CONTINUE WITH
                        </span>
                    </div>
                </div>

            
                <div class="grid grid-cols-2 gap-4">

                    <button
                        type="button"
                        class="h-12 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                    >
                        Google
                    </button>

                    <button
                        type="button"
                        class="h-12 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                    >
                        GitHub
                    </button>

                </div>

            </form>

            <p class="text-center text-slate-400 mt-8">
                Don't have an account?
                <a
                    href="/register"
                    class="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                    Create account
                </a>
            </p>

        </div>

    </div>

</div>