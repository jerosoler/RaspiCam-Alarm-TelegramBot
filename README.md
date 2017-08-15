# RaspiCam-Alarm-TelegramBot
Alarma con Raspberry + RaspiCam + Telegram Bot + Sensor PIR

Alarma multiusuario para bot de telegram. 


## Instalación
```bash
npm install
```

## Configuración

### Telegram
Obten tu API telegram. 
https://core.telegram.org/api/obtaining_api_id


### Raspberry
Enable raspicam on "raspi-config"
```bash
raspi-config
```
Más info: https://www.raspberrypi.org/documentation/usage/camera/

Son necesarios los paquetes raspistill y raspivid. 
https://www.raspberrypi.org/documentation/usage/camera/raspicam/README.md

Install MP4Box para convertir el video y enviarlo por telegram.
```bash
sudo apt-get install -y gpac
```

Conectar Sensor PIR en el PIN 11 (GPIO_GEN0)  (Aplicado en Rasbperry PI 2 model B)
[![](http://www.raspberry-pi-geek.com/var/rpi/storage/images/media/images/raspib-gpio/12356-1-eng-US/RasPiB-GPIO_reference.png)]



### Aplicación:

Modificar las lineas en app.js introduce el número de usuarios que quieras activar alarma.
```javascript
var usuarios = [USER_NUMBER_ONE,USER_NUMBER_TWO];
```

Y poner el token:
```javascript
const token = 'YOUR TELEGRAM TOKEN';
```

## Ejecutar: 
Es obligatorio utilizar sudo, ya que la libreria johnny-five lo requiere. 
```bash
sudo nodejs app.js
```


