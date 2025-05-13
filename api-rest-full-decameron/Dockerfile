# Usa una imagen base de PHP con Apache
FROM php:8.4-apache

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git libpq-dev curl unzip && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql pdo_pgsql

# Copia el código del proyecto Laravel al contenedor
COPY api-rest-full-decameron /var/www/html/api-rest-full-decameron

# Define el directorio de trabajo como la raíz del proyecto Laravel
WORKDIR /var/www/html/api-rest-full-decameron

# Instala Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Asigna permisos adecuados a las carpetas necesarias de Laravel
RUN chown -R www-data:www-data /var/www/html/api-rest-full-decameron/storage /var/www/html/api-rest-full-decameron/bootstrap/cache

# Activa mod_rewrite para Apache
RUN a2enmod rewrite

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Apache
CMD ["apache2-foreground"]
