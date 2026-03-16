# Variables
NPM = npm

# Comandos principales
install:
	$(NPM) install

start:
	npx expo start

# Calidad de código
lint:
	npx eslint . --ext .js,.jsx,.ts,.tsx

format:
	npx prettier --write .

# Limpieza
clean:
	rm -rf node_modules
	$(NPM) install

.PHONY: install start lint format clean

