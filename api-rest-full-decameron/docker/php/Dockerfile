FROM composer:latest AS vendor

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# --------------------------------------------

FROM php:8.2-fpm

# Instala extensiones necesarias (ajusta según tus necesidades)
RUN apt-get update && apt-get install -y \
    zip unzip libpq-dev git \
    && docker-php-ext-install pdo pdo_pgsql

# Copia Composer desde la primera etapa
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define el directorio de trabajo
WORKDIR /var/www/html

# Copia el resto del código
COPY . .

# Copia la carpeta vendor desde la etapa de Composer
COPY --from=vendor /app/vendor ./vendor

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
