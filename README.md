[maket]: https://www.figma.com/file/3oruxhqroItRQ1XNqL4pjb/YANDEX.MESSENGER?type=design&node-id=0-1&t=YyiqCxkpjt8Wxhrs-0        "Figma maket link"

[domain]: https://frabjous-gnome-6c6c2c.netlify.app/        "Netlify domain link"
[domain_home]: https://frabjous-gnome-6c6c2c.netlify.app/messenger
[domain_login]: https://frabjous-gnome-6c6c2c.netlify.app/
[domain_register]: https://frabjous-gnome-6c6c2c.netlify.app/sign-up
[domain_profile]: https://frabjous-gnome-6c6c2c.netlify.app/profile
[domain_error404]: https://frabjous-gnome-6c6c2c.netlify.app/error404
[domain_error500]: https://frabjous-gnome-6c6c2c.netlify.app/error500

[local_home]: http://localhost:5173/messenger
[local_login]: http://localhost:5173/
[local_register]: http://localhost:5173/sign-up
[local_profile]: http://localhost:5173/profile
[local_error404]: http://localhost:5173/error404
[local_error500]: http://localhost:5173/error500

## Мессенджер

---

### Прототип в Figma: [link][maket]

---

### Домен Netlify: [link][domain]

- [home page][domain_home]
- [login page][domain_login]
- [register page][domain_register]
- [profile page][domain_profile]
- [error404 page][domain_error404]
- [error500 page][domain_error500]

---

## Команды

<code>-npm run build</code>  ==> сборка (build)

<code>-npm run start</code>  ==> сборка (build) и запуск express-сервера на <a>http://localhost:3000/</a>

<code>-npm run lint:es</code>  ==> запуск eslint

<code>-npm run lint:style</code>  ==> запуск stylelint

<code>-npm run test</code>  ==> заупск тестов

---

### Локальные ссылки

- [home page][local_home]
- [login page][local_login]
- [register page][local_register]
- [profile page][local_profile]
- [error404 page][local_error404]
- [error500 page][local_error500]

---

### Версии

#### v2.0.0 (16/06/2023)

- Добавлен fetch
- Добавлен EventBus
- Добавлен Block
- Добавлен eslint и stylelint
- Добавлена валидация инпутов и форм (тип: консоль)
- Переход на компоненты

#### v4.0.0 (28/07/2023)

- Перименован Block => Component
- Добавлены тесты (Mocha, Chai)
- precommit (Husky)
- Проведен аудит зависимостей
