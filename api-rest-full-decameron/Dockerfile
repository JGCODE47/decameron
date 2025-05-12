# api-rest-full-decameron/Dockerfile

# 1. Imagen base slim de PHP con FPM
FROM php:8.1-fpm-bullseye-slim

# 2. Instala dependencias del sistema y extensiones PHP para PostgreSQL
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    libpq-dev git unzip zip \
 && docker-php-ext-install pdo_pgsql \
 && rm -rf /var/lib/apt/lists/*

# 3. Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

# 4. Copia Composer files e instala deps antes de copiar todo el código
COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader --no-dev --prefer-dist --no-interaction --no-progress

# 5. Copia el resto del proyecto Laravel
COPY . .

# 6. Genera clave y cachea configuración, rutas y vistas
RUN php artisan key:generate \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

# 7. Expón el puerto de PHP-FPM
EXPOSE 9000

# 8. Arranque por defecto
CMD ["php-fpm"]
