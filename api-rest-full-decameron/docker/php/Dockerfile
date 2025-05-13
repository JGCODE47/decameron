# Usa la imagen oficial de PHP con FPM y extensiones necesarias
FROM php:8.3-fpm

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git libpq-dev curl unzip && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql pdo_pgsql

# Instala Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia el código del proyecto Laravel al contenedor
COPY . /var/www/html

# Define el directorio de trabajo como la raíz del proyecto Laravel
WORKDIR /var/www/html

# Instala las dependencias de Laravel (composer install)
RUN composer install --no-dev --optimize-autoloader

# Asigna permisos adecuados a las carpetas necesarias de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 9000 para PHP-FPM
EXPOSE 9000

# Comando por defecto para ejecutar PHP-FPM
CMD ["php-fpm"]
