const { writeFileSync } = require('fs');

const common = {
  header_title_example: {
    en: 'Example',
    ru: 'Пример',
  },
  header_title_description: {
    en: 'Description',
    ru: 'Описание',
  },
  header_title_home: {
    en: 'Home',
    ru: 'Главная',
  },
  port: {
    en: 'Port',
    ru: 'Порт',
  },
  request_body: {
    en: 'Request body',
    ru: 'Тело запроса',
  },
  response_body: {
    en: 'Response body',
    ru: 'Тело ответа',
  },
  logs: {
    en: 'Logs',
    ru: 'Логи',
  },
  run: {
    en: 'Run',
    ru: 'Запустить',
  },
  // '': {
  //   en: '',
  //   ru: '',
  // },
};

const { en, ru } = Object.keys(common).reduce(
  (prev, curr) => {
    prev.en.translation[curr] = common[curr].en;
    prev.ru.translation[curr] = common[curr].ru || `**${common[curr].en}**`;
    return prev;
  },
  {
    en: {
      translation: {},
    },
    ru: {
      translation: {},
    },
  },
);

try {
  writeFileSync('./src/locales/en.json', JSON.stringify(en, null, 2));
  writeFileSync('./src/locales/ru.json', JSON.stringify(ru, null, 2));
} catch (error) {
  console.log(error.message);
}
