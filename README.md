### Instalación:
	git clone https://github.com/galu32/mercadolibre-challenge
	cd mercadolibre-challenge
	npm install

### Iniciar aplicación:

> npm start

### Tests:

> npm test

### API:

- (GET) /api/items/?q=:

	###### Ejemplo de uso: /api/items/?q=celulares

	###### Ejemplo de respuesta:
		{
			ok: Boolean,
			data: {
				author: {
					name: String,
					lastname: String
				},
				categories: [String, String],
				items: [
					{
					id: String,
					title: String,
					price: {
						currency: String,
						amount: Number
					},
					picture: String,
					condition: String,
					free_shipping: Boolean
					}
				]
			}
		}

- (GET) /api/items/:id

	###### Ejemplo de uso: /api/items/MLA123

	###### Ejemplo de respuesta:
		{
			ok: Boolean,
			data: {
				author: {
					name: String,
					lastname: String
				},
				item: {
					id: String,
					title: String,
					price: {
						currency: String,
						amount: Number
					},
					picture: String,
					condition: String,
					free_shipping: Boolean,
					sold_quantity: Number,
					description: String
				}
			}
		}

- (GET) /api/items/:id/category

	###### Ejemplo de uso: /api/items/MLA123/category

	###### Ejemplo de respuesta:
		{
			ok: Boolean,
			data: {
				author: {
					name: String,
					lastname: String
				},
				categories: [String, String]
			}
		}
### Imágenes:
![Screenshot 1](https://i.ibb.co/Xy2fm26/ss7.png)
![Screenshot 2](https://i.ibb.co/FV73r6c/ss5.png)
![Screenshot 3](https://i.ibb.co/wrKmGpx/ss4.png)
