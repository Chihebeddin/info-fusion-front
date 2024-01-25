<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Add a new product
        </h1>
      </div>

      <section class="bg-gray-light dark:bg-gray-light rounded-sm">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Product Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required="true"
                >
              </div>
              <div class="w-full">
                <label for="brand" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Brand</label>
                <input
                  id="brand"
                  type="text"
                  name="brand"
                  class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required="true"
                >
              </div>
              <div class="w-full">
                <label for="price" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Price</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required="true"
                >
              </div>
              <div>
                <label for="category" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Category</label>
                <select id="category" class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option selected="">
                    Select category
                  </option>
                  <option value="TV">
                    TV/Monitors
                  </option>
                  <option value="PC">
                    PC
                  </option>
                  <option value="GA">
                    Gaming/Console
                  </option>
                  <option value="PH">
                    Phones
                  </option>
                </select>
              </div>
              <div>
                <label for="item-weight" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Item Weight (kg)</label>
                <input
                  id="item-weight"
                  type="number"
                  name="item-weight"
                  class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required="true"
                >
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-sm font-semibold text-gray-dark dark:text-gray-dark">Description</label>
                <textarea id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-dark dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" />
              </div>
            </div>
            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-semibold text-center text-gray-dark bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Ajouter
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
