FROM php:8.0-fpm
COPY php.ini /usr/local/etc/php/

# vim install
RUN apt-get update
RUN apt-get install -y vim

# php module
RUN apt-get update && apt-get install -y \
   zlib1g-dev \
   git \
   libzip* \
   libonig-dev \
   libc-client-dev \
   libkrb5-dev \
   libxml2-dev \
   libpq-dev

RUN rm -r /var/lib/apt/lists/*

RUN PHP_OPENSSL=yes docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install zip pdo_mysql mysqli mbstring imap soap pdo_pgsql


# composer install
COPY --from=composer /usr/bin/composer /usr/bin/composer

# nodejs install
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
