<template>
    <div class="p-4 flex flex-col space-y-4">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

            <!-- Card 1: Total Customers -->
            <div class="flex flex-col gap-4 p-6 rounded-3xl shadow text-gray-100 bg-blue-600">
                <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'users']" class="text-2xl" />
                    <p class="font-medium">Total Customers</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-bold">32,173,932</p>
                    <p class="font-semibold">+12%</p>
                </div>
            </div>

            <!-- Card 2: Total Orders -->
            <div class="flex flex-col gap-4 p-6 rounded-3xl shadow text-gray-100 bg-green-600">
                <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" class="text-2xl" />
                    <p class="font-medium">Total Orders</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-bold">8,492</p>
                    <p class="font-semibold">+8%</p>
                </div>
            </div>

            <!-- Card 3: Total Revenue -->
            <div class="flex flex-col gap-4 p-6 rounded-3xl shadow text-gray-100 bg-purple-600">
                <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'dollar-sign']" class="text-2xl" />
                    <p class="font-medium">Total Revenue</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-bold">$123,456</p>
                    <p class="font-semibold">+15%</p>
                </div>
            </div>

            <!-- Card 4: New Users -->
            <div class="flex flex-col gap-4 p-6 rounded-3xl shadow text-gray-100 bg-red-600">
                <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'user-plus']" class="text-2xl" />
                    <p class="font-medium">New Users</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-bold">1,234</p>
                    <p class="font-semibold">+5%</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
</script>
