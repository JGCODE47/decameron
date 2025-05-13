# Etapa 1: Composer con PHP 8.3
FROM composer:2.7.2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts



# Etapa 2: Aplicación PHP con PHP 8.3
FROM php:8.3-cli

# Instala extensiones necesarias
RUN apt-get update && apt-get install -y \
    zip unzip libpq-dev git \
    && docker-php-ext-install pdo pdo_pgsql

# Copia Composer desde la imagen anterior
COPY --from=vendor /usr/bin/composer /usr/bin/composer

# Define el directorio de trabajo
WORKDIR /var/www/html

# Copia el resto del código de la app
COPY . .

COPY --from=vendor /app/vendor ./vendor

# Ejecutar los scripts ahora que tienes todo el código
RUN php artisan package:discover --ansi