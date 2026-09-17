FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo_pgsql zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY backend/composer.json backend/composer.lock ./

RUN composer install \
    --no-interaction \
    --prefer-dist \
    --no-scripts

COPY backend/ .

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]