<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
            <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">manage your teachers and students</h2>
                <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Welcome to the Teacher and Student Management App</h1>
            </div>
            <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                <div class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">                    
                    <router-link to="/teachers" class="text-center">Manage Teachers</router-link>
                </div>
                <div class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <router-link to="/students" class="text-center">Manage Students</router-link>
                </div>
            </div>
        </div>
    </section>
</template>