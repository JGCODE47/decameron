FROM php:8.2-apache

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia el código de la aplicación
COPY . .

# Instala dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Da permisos a los directorios necesarios
RUN chown -R www-data:www-data storage bootstrap/cache

# Habilita mod_rewrite para Apache
RUN a2enmod rewrite

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["apache2-foreground"]
