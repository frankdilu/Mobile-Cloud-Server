Explicacion:

La otra vez me encontré un celular con la pantalla rota, pero todo lo demas funcionaba perfectamente. Por lo que decidí convertirlo en un servidor literlamente movil.

Usando adb por tcp/ip se puede controlar un celular android inalambricamente, siempre y cuando se haya configurado antes (a traves de usb, seteando el tcp/ip port). Esta fue la solucion de la pantalla rota.

El proyecto esta hecho en React-Native. Gracias a una libreria llamada "nodejs-mobile-react-native" podemos levantar una instancia de nodeJS en una aplicacion de RN, por lo que usé Express.js como framework del servidor.

Tanto el frontend y el backend estan basados en un cloud server de Antonio Sarosi. Este proyecto fue modificado para poder eliminar archivos y hacer un fixbug del manejo de urls, porque en el base toda carpeta o archivo con guiones ( - ) generaba errores.

Pasos de buildeo:
1. Setear la ip del celular en el .env del frontend
2. Buildear el frontend en React
3. Utilizar la libreria gulp para comprimirlo todo en un mismo archivo

4. Crear un proyecto de RN
5. Mover los archivos de la carpeta React-Native files a la carpeta del proyecto RN (reemplazar todo)
6. Mover el archivo saliente de gulp (index.html) a la carpeta /proyecto RN/nodejs-assets/nodejs-project/front/
7. Instalar las dependencias del proyecto interno de Node.js en la carpeta /proyecto RN/nodejs-assets/nodejs-project/

8. Disfrutar un servidor cloud movil


Comandos:

`cd ./Frontend/`
`npm i`
**SET DEVICE IN .ENV WITH 5000 PORT**
`npm run build`
`npx gulp`
`cd..`

`npx react-native init mobileCloudServerApp`
**MOVE /React-Native files/ CONTENT INTO /mobileCloudServerApp/**
**MOVE /Frontend/index.html TO /mobileCloudServerApp/nodejs-assets/nodejs-project/front/**
`cd /mobileCloudServerApp/`
`npm i`
`cd /nodejs-assets/nodejs-project/`
`npm i`
`cd..`
`cd..`
`npm start / npm run android / npm run ios`

Y lesto!

Comandos de React-native:
npm run android -> run android device
npm run ios -> run ios device

La primera vez que se buildea tarda bastante (25 mins en un potato pc)

Home cloud entry point: 
devicelocalip:5000

ex: 192.168.1.33:5000

Checkear la doc de React-Native para correr la release

Posibles mejoras:
1. Hacer el tema de la ip dinamico, por lo que no habria que hacer todo el proceso de buildeo para cada equipo y en cambios de ip
2. Mensajes agradables al usuario en la aplicacion de RN


Testeado y hecho en Windows y Android. No fue testeado en otras plataformas.

**Creditos:**

Frontend y backend base (modificados):
https://github.com/antoniosarosi/home-cloud

