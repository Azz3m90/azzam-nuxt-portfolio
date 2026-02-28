import os

files = {}

files[\"error.vue\"] = \"\"\"^<script setup lang=\"ts\"^>&echo const { t } = useI18n^(^)&echo const localePath = useLocalePath^(^)&echo.&echo defineProps^<{&echo   error: {&echo     statusCode: number&echo     statusMessage: string&echo   }&echo }^>^(^)&echo.&echo const handleError = ^(^) =^> clearError^({ redirect: localePath^('/'^) }^)&echo ^</script^>&echo.&echo ^<template^>&echo   ^<div class=\"min-h-screen flex items-center justify-center bg-white dark:bg-slate-950\"^>&echo     ^<div class=\"text-center px-6\"^>&echo       ^<p class=\"text-8xl font-extrabold gradient-text mb-4\"^>{{ error.statusCode }}^</p^>&echo       ^<h1 class=\"text-3xl font-bold text-slate-900 dark:text-white mb-3\"^>&echo         {{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}&echo       ^</h1^>&echo       ^<p class=\"text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto\"^>&echo         {{ error.statusCode === 404&echo           ? 'The page you are looking for does not exist or has been moved.'&echo           : error.statusMessage }}&echo       ^</p^>&echo       ^<button class=\"btn-primary\" @click=\"handleError\"^>&echo         Back to Home&echo       ^</button^>&echo     ^</div^>&echo   ^</div^>&echo ^</template^>\"\"\"

for path, content in files.items():
    with open(path, \"w\", encoding=\"utf-8\") as f:
        f.write(content)
