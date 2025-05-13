# Etapa 1: Composer con PHP 8.3
FROM composer:2.7.2 AS vendor

WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

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

# Copia la carpeta vendor desde la etapa de Composer
COPY --from=vendor /app/vendor ./vendor

# Ajusta permisos (opcional según tu entorno)
RUN chown -R www-data:www-data storage bootstrap/cache
