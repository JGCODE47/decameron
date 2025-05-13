FROM php:8.3-apache

# Instala extensiones necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev unzip git curl libpng-dev libonig-dev libxml2-dev zip \
    && docker-php-ext-install pdo_pgsql

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia todos los archivos
COPY . /var/www/html

WORKDIR /var/www/html

# Permisos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Puerto para Render
EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=10000
