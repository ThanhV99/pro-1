<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Abcxyz
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {{ currentForm === 'signup' ? 'Create an account' : 'Login' }}
                    </h1>
                    <div v-if="show_message"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <!-- <strong class="font-bold">Holy smokes!</strong> -->
                        <span class="block sm:inline">{{ message_status }}</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">

                        </span>
                    </div>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input v-model="email" type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com">
                        </div>
                        <div v-if="currentForm === 'signup'">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input v-model="name" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="your name">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div v-if="currentForm === 'signup'">
                            <label for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input v-model="confirm_pass" type="confirm-password" name="confirm-password"
                                id="confirm-password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div v-if="currentForm === 'signup'" class="flex items-start">
                            <div class="flex items-center h-5">
                                <input v-model="check_box" id="terms" aria-describedby="terms" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                                    I accept the
                                    <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {{ currentForm === 'signup' ? 'Create an account' : 'Login' }}</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?
                            <a href="#" @click.prevent="toggleForm"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                {{ currentForm === 'signup' ? 'Login here' : 'Create an account' }}
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import ApiService from '@/services/api.services'
import router from "@/router/index"

const currentForm = ref('login');
const email = ref('');
const name = ref('');
const password = ref('');
const confirm_pass = ref('');
const check_box = ref();
const message_status = ref();
const show_message = ref();

const toggleForm = () => {
    currentForm.value = currentForm.value === 'signup' ? 'login' : 'signup';
};

const submitForm = async () => {
    // Handle form submission logic here
    if (currentForm.value === 'signup') {
        if (check_box.value) {
            const { messages } = await ApiService.register(email.value, name.value, password.value, confirm_pass.value)
            message_status.value = messages.value
            console.log(messages.value)
            show_message.value = true
        } else {
            show_message.value = true
            message_status.value = "Need accept term"
        }
    } else {
        // console.log('Email:', email.value);
        // console.log('Password:', password.value);
        const { message } = await ApiService.logIn(email.value, password.value)
        message_status.value = message.value
        if (message.value != "login success") {
            show_message.value = true
        }
    }
};


</script>