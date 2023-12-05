<template>
    <h1>Home</h1>
    <button @click="logout">
        LogOut
    </button>
</template>

<script setup>
import ApiService from '@/services/api.services'

const logout = () => {
    ApiService.logOut()
}
</script>