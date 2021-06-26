# TypeScript, Jest, Storybook, Image snapshots library and product testing preset

Демонстрация настроек [TypeScript](https://www.typescriptlang.org/docs) проекта,
с юнит-тестами на [Jest](https://jestjs.io/docs/en/getting-started), и тестированием [снапшотами картинок](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer#imagesnapshots) над [Storybook](https://storybook.js.org/docs/react/get-started/introduction)

## Расположение файлов
### Структура репозитория

Независимые проекты лежат в подпапках, как-бы для демонстрации того,
что один репозиторий вывозит несколько подпроектов и разных NPM пакетов.

Если в репозитории ведётся лишь один проект,
то этот дополнительный уровень вложенности может быть не нужен,
и JS проект разместится в корне репозитоиря

#### [mylib](./mylib)

Проект с библиотекой, которая публикуется в GitHub NPM registry.

#### [myapp](./myapp)

Проект с приложением (в перспективе - веб-приложением, сейчас оно чисто нодовское), который использует эту библиотеку.

#### [.github/workflows](./.github/workflows)

Сами знаете что.

#### [cli-utils](./cli-utils)

Для удобства работы появляется много вспомогательных тулзов, которые делают то и это,
и должны быть под рукой. Мне не нравится, когда куча этих левых файлов лежит в корне. Я сложил их в один подкаталог, они всегда там.


#### [docker](./docker)

Всё, что связано с докером. В основном, это описания образов.





### Структура JS проекта

**[mylib/build-tools](./mylib/build-tools), myapp/build-tools:**
Каждый инструмент норовит иметь в корне проекта свой файл с настройками,
в итоге получается огромная куча левых файлов.
Напрямую эти файлы к продукту не относятся, но всё равно хотят лежать в корне,
как будто они здесь самые главные. Возникает желание поубавить их пыл.

Всё, что возможно, я сложил в отдельную папку, учитывая возможность работы скриптов-сборщиков,
а также и удобство в VisualStudio Code.

Таким образом я решил оставить в корне
* основные файлы от NPM:
    * package.json
    * package-lock.json
    * .npmrc
* и от дополнительных тулзов:
    * [tsconfig](./mylib/tsconfig.json)
    * next.config.js

Остальное уехало в [build-tools](./mylib/build-tools).

**[mylib/out](./mylib/out.example):** Туда я компилирую TS -> JS, Сторибуки, Code Coverage, и кэш от awesome-typescript-loader.

**[mylib/src](./mylib/src), [myapp/src](./myapp/src):** Исходный код.

**[mylib/stories](./mylib/stories), myapp/stories:** Страницы сторибука.

**[mylib/test](./mylib/test), myapp/test:** Юнит тесты и [запускалка сторишотов](./mylib/test/storyshots.shots.js).



## Библиотека

#### Базовые принципы

**Библиотека утилит и компонент,** Т.е. публикуемые файлы
- это относительно независимые сущности, которые
пользователь библиотеки импортирует по отдельности.
Таким образом пакет можно рассматривать, как слегка причёсанные
и оттестированные исходники, служебные файлы которых (тесты и built-tools)
остались в Git репозитории и не попали в NPM registry,
и не мозолят глаза в конечном проекте.

**Публикуем JavaScript,** чтобы можно было использовать без TS.
Вместе с JavaScript публикуем декларации типов `*.d.ts`.

Пример:

* [исходник](./mylib/src/blocks/AddButton.tsx)
* [публикуемый код](./mylib/out.example/compiled/src/blocks/AddButton.jsx)
* [декларации типов](./mylib/out.example/compiled/src/blocks/AddButton.d.ts)

**Тесты гоняем поверх скомпилированного кода:** что публикуем, то и тестируем.
Поэтому Jest в _mylib_ не использует TS пресет.

**Сторибук для сторишотов тоже собираем из скомпилированных компонентов.**
[Эта конфигурация](./mylib/build-tools/storyshots) тоже не использует TS утилит.

Есть ещё один **сторибук для разработчика, его собираем поверх исходного кода,**
чтобы быстрее получать обратную связь на изменения. Поэтому для этого сторибука
есть [вторая конфигурация](./mylib/build-tools/storybook), уже с поддержкой TS.

**В скомпилировнный код мы кидаем JSX как есть, без трансформации.**
Это потому что [React](https://reactjs.org/) - не единственная библиотека, которая может работать с JSX.
Мы даём возможность пользователю библиотеки решить, что делать с JSX компонентами.

****CSS тоже никак не преобразуем.**

Мы, как единственные пользователи библиотеки прекрасно справляется с компиляцией
библиотечных стилей. Поэтому в этом пресете CSS и SASS публикуются как есть,
и импорт его остаётся в библиотечном JS коде.

Однако есть нюансы, про которые написано в самом низу.

Вообще, я предполагаю, что лучше бы стили компилировать в ембедженый JS,
но:
1. не уверен на 100%, что это было бы лучше
1. пока не разобрался как это делать

В этом пресете должны нормально работать [styled-components](https://styled-components.com/).
Но я их не использую в силу следующего принципа:

**CSS классы читаемые и постоянные.**
Компоненты библиотеки не должны иметь нечитаемых хэшеобразных классов.
В этом пресете данный принцип соблюдается *лишь наполовину.*
Хотя не конвертирую CSS в код с нечитаемыми классами,
но я их вообще никак не конвертирую, всё на откуп пользователя.
В том числе, пользователь может и накосячить с модулями, допустив коллизии классов.

[styled-components](https://styled-components.com/) мной забанены до тех пор,
пока там не появится возможность управлять конечным именем классов.
Может быть там это и можно делать, но я пока не научился.


В этом примере я **компилирую в target ES2015 и модули CommonJS** для того,
чтобы подчеркнуть, что опубликованный код можно запускать на голой Node, без лишних телодвижений.
В то же время, графические компоненты всё равно будут пересобираться в конечном проекте,
поэтому для библиотеки чисто графических компонентов можно было бы оставить target ES2020 c модулями ESNext.
Можно бы разделить графику и данные в разные библиотеки и собирать их с разными настройками.
Однако, если код, пусть даже неграфический, никогда не используется вне Webpack проекта,
то это разделение будет лишним.
В этом случае кажется **лучше поставить target ES2020 хотя бы для меньших трансформаций кода библиотеки.**

**Сторишоты гоняем в контейнере,**
потому что картинка в браузере сильно зависит от системы.
В контейнере мы получили стабильную систему, которая всегда даёт одинаковую картинку.




## Приложение

Приложение на данный момент - это [простейший JS файл](./myapp/src/index.js),
который импортит [тот библиотечный файл](./mylib/out.example/compiled/src/tools/add-util.js),
который импортит [другой библиотечный файл](./mylib/out.example/compiled/src/tools/add.js) по абсолютному пути.
И это как-бы демонстрация того, что всё работает.

В планах добавить графических компонентов и накрутить вокруг
приложения такую же тестирующую систему, как и вокруг библиотеки.

Отличие от библиотеки будет в том,
что тесты будем билдить и запускать на исходном TS коде,
а не на пред-компилированном,
потому что мы обычно TS файлы сразу запихиваются в Webpack,
а он их уже нормально обрабатывает.






## Особенности

Перечислим те нюансы, которые не появляются в один клик,
и ради которых пришлось штудировать документацию и рыть интернет,
и почему мой пресет может оказаться вам полезным.

### Билд

#### Конфигурация на TypeScript
Jest и Storybook - это всё-же чисто JavaScript инструменты,
поэтому их нужно чутка поднастроить, чтобы в них работал TS.


#### Импорт файлов внутри библиотеки по глобальному пути
Считается, что библиотечные файлы нормально импортят себя по относительному пути:

    import util from './util'

Или в крайнем случае, очень редко, приходится пондяться на пару уровней выше:

    import tool from '../../tools/tool'

> Считается, что если вам этого не хватает, то ваша библиотека плохо структурирована и слишком разраслась.
Нормального способа обратиться к корню библиотеки в Node нету.
Однако я не создаю библиотеку общего пользования,
а просто хочу расшарить общую часть приватного кода между несколькими проектами.
Для своего случая считаю избыточным плодить кучу библиотек, т.к. возникает избыточная забота об их струкруре.
Да и вообще, неважно отчего у меня библиотека разраслась, ну разраслась и разраслась. Всё равно, строить заборы из выхода на корневой уровень `../../..` - бесячее занятие и лучше иметь возможность пойти от корня, чем не иметь.

Когда библиотека уже импортирована и лежит в чьём-то `node-modules`, то
она легко может обращаться сама к себе по своему имени.
Однако, пока мы её разрабатываем, то по своему имени она сама себя не видит.
Поэтому пришлось с этим немножко поплясать.

Я решил этот вопрос в следующих инструментах:

* TypeScript
* Webpack
* Jest
* Storybook

Не пытался решать его в голом *NodeJS,* потому что пока не было такой необходимости.
Приглашаю вас добить этот пункт, чтобы закрыть вопрос.


#### Базовый образ для Сторишотов с хромиумом.

[Настроить Alpine и pupeeter](./docker/image-chromium-npm/Dockerfile) может быть и не самая сложная в жизни задача, но всё равно требует какого-то времени.

Нет лишнего времени? Пользуйтесь [моим образом](https://github.com/evoja/typescript-testing-preset/packages/558276).

Поддерживаются [кириллица и емоджи](./mylib/test/__image_snapshots__/storyshots-shots-js-puppeteer-storyshots-unicode-with-text-1-snap.png).

> Приглашаю поделиться образами для других браузеров.


#### Суффикс `.m.css` для модулей CSS
В NextJS настроено, что модули называются так: `.module.css`.
Однако у меня нет никакого CSS кроме модулей, и в моей ситуации иметь столь длинный суффикс кажется слишком жирно.
Я пробовал сделать наоборот, чтобы для *не*модулей был суффикс `.global.css` или `.g.css`,
а всё, что без суффикса, то бы шло модулем по умолчанию.
Но разбился об импорт стилей сторонних библиотек. Хотя,... если повозиться,
то наверное и это можно зарешать.


#### Декларации типов для модулей CSS
Рядом скаждым [style.m.css](./mylib/out.example/compiled/src/blocks/AddButton.m.css) автоматически создаётся его декларация: [style.m.css.d.ts](./mylib/out.example/compiled/src/blocks/AddButton.m.css.d.ts)


#### Сторишоты поддерживают SASS
Мы не используем обработку SASS в экспорте, а публикуем их как есть.
Но в сторишотах мы поддерживаем SASS для правильной конечной картинки.

Для демонстрации, я [добавил сюда в сторибук](./mylib/build-tools/storyshots/preview.js) стили от Bootstrap.






### GitHub Workflow

Тут в целом, ничего особенного, но, тоже хорошо иметь [пример](./.github/workflows/npm.yml) под рукой, чем не иметь.
Что зарешали:

* прогон тестов на GitHub воркере
* прогон сторишотов в Docker образе
* авторизация в NPM Package Registry и публикация пакета
* привязка публикации к веткам и тэгам
* проверка соответствия тэга и публикуемой версии

Я ставлю Гит тэги через слэш `/`, а не через дефис `-`, что немножко нестандартно.
Мне больше нравятся тэги такого вида `v/0.0.1`, `dev/0.0.1-17`, потому что
графические интерфейсы для гита, сворачивают такие тэги в подпапки и они
не висят одним огромным списком.




### package.json

#### repository
Это поле нужно, если в репозиторий публикуется несколько пакетов. В случае одного пакета на репозиторий, это поле не нужно.


#### peerDependencies

По каждой библиотеке нужно решать индивидуально, надо ли её декларировать как _peer._ Рассмотрим на примере Реакта.

Если вы написали универсальные JSX вьюхи, то они могу быть использованы с любым движком. Например [Preact](https://preactjs.com/). В этой ситуации непонятно, зачем ограничивать выбор движка декларацией в _peerDependencies_.

С другой стороны, если ваши компоненты заточены на хитрый реактовский API, то разумно декларировать и то, что это должен быть именно [Реакт](https://reactjs.org/), и его минимальную версию.


#### dependencies

Тут тоже двоякая ситуация.

С одной стороны, если библиотека ничего с собой не тащит, а только пирит, то у пользователя есть свобода выбора нужной версии зависимости, и для него не является сюрпризом, что какую-то либу он сам не ставил, а она у него волшебным образом где-то в модулях есть. Всё в его власти, что сказал установить, то и установлено.

С другой стороны, если пакет полностью покрывает потребности конечного приложения, то довольно удобно, когда он сам тянет всё, что для него нужно.
Пользователь подключает только один пакет, а всё остальное в нём уже есть.



#### scripts.mypublish
Исходники у меня лежат в [src](./mylib/src), а компилирую я всё в [out/compiled/src](./mylib/out.example/compiled/src). Однако `npm publish` работает от корня проекта. Это не имеет значения, когда в вашем пакете есть единая точка входа, которая указана полем [main](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#main) в вашем `package.json`. Но у меня нет одной точки. Каждый файл импортируется пользователем по мере необходимости независимо других файлов библиотеки.
Поэтому с одной стороны хочется избавиться от лишнего уровня импортах:

    import from 'mylibrary/out/compiled/src/tool' // это "out/compiled/src" в пути кажется лишним
    import from 'mylibrary/lib/tool' // уже лучше, но всё равно можно было бы и без "lib" обойтись

хочется без лишнего фрагмента:

    import from 'mylibary/tool'`

Но в то же время не хотелось бы билдить кучу файлов в корень. Поэтому мы притворяемся что корень проекта у нас в [out/compiled/src](./mylib/out.example/compiled/src) и публикуем оттуда.

Звучит как бред, но для меня работает.
Рад предложениям, как сделать то же самое но проще.


#### scripts.copy-artefacts

Мы хотим компилировать в другую папку ([out](./mylib/out.example)), однако `tsc` не трогает ничего кроме собственно тайп-скриптовых файлов. Поэтому всё остальное нужно перенести в out самостоятельно: и стили, и картинки, и JS файлы.

Эта хитромудрая цепочка, которая не копирует тайпскриптовые файлы `*.ts`, `*.tsx` но при этом копирует декларации типов `*.d.ts`. Это сделано, чтобы исходные файлы не попадали в опубликованную библиотеку.

Я не утверждаю, что эта цепочка самая простая и короткая из возможных. Но она работает.


#### scripts.my*

Эта секция к делу не относится, но всё же пробегусь по ней.

**myinstall:** мой `package.json` выразителен, там есть отступы пустыми строчками, порядок пакетов зависимостей для меня важен. NPM норовит испортить мой прекрасный файлик. Поэтому я пользуюсь командой `npm run myinstall` вместо `npm install`.

**myci:** это не настоящий `ci`. Это то же, что `myinstall`, только предотвращает изменения и в `package-lock.json` тоже.

**mylock:** это `npm install --package-lock-only`, который не даёт npm исправлять `package.json`








## In Addition

#### Окружение юнит-тестов

По умолчанию юнит-тесты бегут в джествоском окружении `jsdom` (это настраивается в конфиге), там тестам доступен mock для `window` и прочих браузерных плюшек.

Но для каждого из файлов можно выбрать своё окружение, так, для демонстрации, в файле [add-util.test.ts](./mylib/test/tools/add-util.test.ts) я поставил окружение `node`. Там ничего браузерного нет, а наоборот, есть всякое нодовское.

#### Завернуть в утилиту
Кроме того, было бы неплохо завернуть это как-то так,
чтобы не приходилось копировать пресет из проекта в проект.
Чтобы как-то заимпортил одной строчкой и пользуешься.
Но я над этим совсем не думал, потому что не было необходимости.


#### Не повторять базовое имя

Сейчас я в ста местах повторяю имя проекта.
Кажется, это можно как-то брать из объекта окружения.


#### CSS Loader

Storybook идёт с `css-loader@^3.5.3`, хотя уже вышел `5.0.1`,
и у них немножко поменялись опции конфигурации.
Поэтому я явно импорчу в зависимостях `css-loader@5.x.x`,
чтобы иметь новую конфигурацию во всех проектах.


#### Сторибука долго инициируется

Кажется, он слишком много лишнего через компилятор прогоняет.
Может там можно как-то поднастроить, чтобы быстрее было?


#### Преобразование CSS и SASS модулей

Как было сказано выше, стили можно и оставлять как есть,
так как если ты сам автор и пользователь, то нормально настраиваешь вебпак и радуешься.
Таким образом, нижеописанное к нашим проектам не относится.

NextJS [отказался](https://github.com/vercel/next.js/blob/master/errors/css-npm.md)
обрабатывать CSS файлы, которые импортируются в зависимостях `node_modules`.
Поэтому я научился так преобразовывать стили перед публикацией, что
результирующий JS никак их не импортирует, тем самым делаем NextJS довольным.
Пользователь должен их как-то сам себе заимпортить, все сразу или по компонентам.

Storybook прекрасно работал.
Т.е. через Webpack можно что угодно настроить,
может быть даже можно было бы NextJS переубедить, но я не стал.


#### Тестировать class-names модулей

Те имена классов в CSS модулях, о которых я писал выше, не проверяются тестами,
потому что Jest тупо игнорит импортирование CSS.
Было бы прикольно настроить так, чтобы они, таки, импортировались и проверялись.


#### Перевести README на английский

Этот текст на русском, потому что и на русском я с ним возился целый день.
Если бы я ждал, пока всё аккуратно сформулирую по-английски,
то опубликовал бы его только через год.

В общем, буду рад, если кто-нибудь сделает английскую версию раньше меня.





## Finally

Я не утверждаю, что этот пресет минимальный, т.к. он был собран из кусков разных проектов, которые как-то работали. А доскональным вычищением от лишнего я не занимался, и мог отаться мусорный код.
Буду рад, если кто-то отрежет куски кода и настроек, которые не помогают обеспечить те нюансы, которые обозначены в этом README.