<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="text-xl font-bold mb-4">K&H Coffee</h3>
          <p class="text-gray-300 text-sm">
            Serving the finest coffee with passion and quality since 2025.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-green-400 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/menu" class="hover:text-green-400 transition-colors">Menu</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-green-400 transition-colors">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-green-400 transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>📍 123 Coffee Street, Phnom Penh</li>
            <li>📞 +855 12 345 678</li>
            <li>✉️ info@k&hcoffee.com</li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-green-400 transition-colors" aria-label="Facebook">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-green-400 transition-colors" aria-label="Instagram">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.584.12 4.775.302 4.082.566c-.726.28-1.34.639-1.955 1.254C1.512 2.435 1.153 3.05.873 3.776c-.264.693-.446 1.502-.5 2.708C.314 7.69.3 8.09.3 11.711s.014 3.921.067 5.127c.054 1.206.236 2.015.5 2.708.22.726.579 1.34 1.194 1.955.615.615 1.23.974 1.955 1.254.693.264 1.502.446 2.708.5C7.996 23.686 8.396 23.7 12.017 23.7s3.921-.014 5.127-.067c1.206-.054 2.015-.236 2.708-.5.726-.22 1.34-.579 1.955-1.194.615-.615.974-1.23 1.254-1.955.264-.693.446-1.502.5-2.708.053-1.206.067-1.606.067-5.227s-.014-3.921-.067-5.127c-.054-1.206-.236-2.015-.5-2.708-.22-.726-.579-1.34-1.194-1.955C20.565 1.512 19.95.873 19.224.593c-.693-.264-1.502-.446-2.708-.5C16.038.314 15.638.3 12.017.3zM12.017 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-green-400 transition-colors" aria-label="Twitter">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © 2025 K&H Coffee. All rights reserved.
      </div>
    </div>
  </footer>
</template>
