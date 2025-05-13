# Usa una imagen base de PHP con Apache (o cualquier imagen que prefieras)
FROM php:8.4-apache

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git libpq-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql pdo_pgsql

# Copia el código de la aplicación al contenedor
WORKDIR /var/www/html
COPY api-rest-full-decameron /var/www/html/

# Instala Composer (si no está instalado ya)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala dependencias de Laravel
WORKDIR /var/www/html/api-rest-full-decameron
RUN composer install --no-dev --optimize-autoloader

# Establece los permisos adecuados
RUN chown -R www-data:www-data /var/www/html/api-rest-full-decameron

# Exponer el puerto 80
EXPOSE 80

# Configura el comando para iniciar Apache
CMD ["apache2-foreground"]
