
<template>
    <div>
        <section>
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
                    <img class="w-8 h-8 mr-2" src="" alt="">
                    ShopLoc   
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray md:text-2xl dark:text-gray-dark">
                            Créez un compte
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            
                            <div class="flex">
                                <div class="flex items-center mr-4">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Commerçant</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input checked id="inline-checked-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="inline-checked-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Autre</label>
                                </div>
                            </div>

                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-dark dark:text-gray">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-light border border-gray text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-dark dark:text-gray">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-dark dark:text-gray">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <button type="submit" class="w-full text-gray-dark bg-teal hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal">Créer un compte</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Déjà un compte ? <NuxtLink to="/signin" class="font-medium text-teal hover:underline dark:text-teal">Connectez-vous</NuxtLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>