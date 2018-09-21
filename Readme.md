# MAIL-SERVICE

**MAIL-SERVICE** является микросервисом рассылки писем для пользователей [golos.io](https://golos.io) и приложений.

API JSON-RPC:

```
 send:                     // Отправить одно письмо одному или нескольким адресатам
     from <string>         // От кого
     to <string|string[]>  // Кому, возможна отправка множеству адресатов (до 10000)
     subject <string>      // Тема
     templateId <string>   // Идентификатор шаблона письма
     data <Object>         // Данные для шаблона в виде объекта    

 <- results:               // Варианты ответа
     (success):            // В случае успеха
         status <'OK'>     // Прошло успешно
         
 <- error:                             // Варианты ошибок     
     1001::'Invalid SendGrid request'  // SendGrid получил запрос, но вернул ошибку
 
 sendBulk:                 // Отправить множество разных писем за 1 запрос
     messages <send[]>     // Массив объектов с теми же полями что и для метода send
 
 <- results:               // Варианты ответа
     (success):            // В случае успеха
         status <'OK'>     // Прошло успешно
          
 <- error:                             // Варианты ошибок     
     1001::'Invalid SendGrid request'  // SendGrid получил запрос, но вернул ошибку
```                   

Возможные переменные окружения `ENV`:

 - `GLS_MAIL_API_KEY` *(обязательно)* - ключ апи для рассылки писем.

 - `GLS_DAY_START` - время начала нового дня в часах относительно UTC.  
  Дефолтное значение - `3` (день начинается в 00:00 по Москве).
   
 - `GLS_MONGO_CONNECT` - строка подключения к базе MongoDB.  
  Дефолтное значение - `mongodb://mongo/admin`
   
 - `GLS_METRICS_HOST` *(обязательно)* - адрес хоста для метрик StatsD.   
  Дефолтное значение при запуске без докера - `127.0.0.1`
   
 - `GLS_METRICS_PORT` *(обязательно)* - адрес порта для метрик StatsD.  
  Дефолтное значение при запуске без докера - `8125`
   
 - `GLS_CONNECTOR_HOST` *(обязательно)* - адрес, который будет использован для входящих подключений связи микросервисов.  
  Дефолтное значение при запуске без докера - `127.0.0.1`
   
 - `GLS_CONNECTOR_PORT` *(обязательно)* - адрес порта, который будет использован для входящих подключений связи микросервисов.  
  Дефолтное значение при запуске без докера - `8080`
  
Для запуска сервиса достаточно вызвать команду `docker-compose up` в корне проекта, предварительно указав
необходимые `ENV` переменные.   