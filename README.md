Unterlagen: Entwicklung für das BlackBerry PlayBook
===================================================
#### ... mit dem WebWorks SDK

Hier sind die [Slides](http://prezi.com/-u5gcayb9ei2/entwickeln-fur-das-blackberry-playbook/).

Beispiel-Applikation
--------------------

Die App kann im Browser getestet werden ([hier]()).

Um aus der Web App ein TabletOS Package zu bauen, sind folgende
Schritte notwendig:

### Erstellung des Applikations - Descriptors `config.xml`
_Ist im Beispiel schon vorhanden_

In dieser Datei wird folgendes Konfiguriert:

- Metadaten: `<name>, <description>, <author>, ...`
- Icon: `<icon>, <rim:loadingScreen>`
- Die Einsprungsdatei: `<content>` (_main.html, index.html, ..._) 
- Berechtigungen: `<feature>`s
- Internetzugriff: 
  _Wird in der Beispielapp nicht benutzt_
  - Welche Server dürfen per AJAX kontaktiert werden: `<access>`
  - Welche Berechtigungen hat Code, der von dieser Addresse
    nachgeladen wird: `<feature>`s als Children von `<access>`
- Diverse weitere mögliche Einstellungen

Eine `config.xml` kann mit dem Eclipse Plugin für WebWorks (welches
leider keine TableOS Tools unterstützt) bearbeitet werden.

### Verpacken der Quelldateien in ein `.zip` mit `config.xml` Toplevel.
_Per Build-Script:_ `ant package-zip` 

### Compilieren der `.zip` mittels `bbwp` aus dem **WebWorks TabletOS SDK**
_Per Build-Script:_ `ant package-bar`
  
Bei diesem Schritt werden die verschiedenen Resourcen in ein `.bar`
File gepackt (ebenfalls im `.zip` Format). Dazu kommt ein
`ActionScript` Launcher, der die Application gemäß der `config.xml`
startet.

Das Beispielprojekt kann mit einem einfachen `ant` call bis zu diesem Punkt gebracht werden. 
Die entstandene `.bar`, kann mittels
`blackberry-depoy -installApp [-user <sim-user>] [-password <sim-password>] -device <simulator-ip> -package <bar-file>`
auf einem Simulator, oder einem Gerät im Developer - Modus installiert werden.

### Signing

Um eine App in Umlauf bringen zu können, muss sie gesignt werden. Dazu sei auf [WebWorks TabletOS SDK][sdk] und [Signing][sign] verwiesen.

Linksammlung
------------
+ [sdk]: [WebWorks TabletOS SDK](http://us.blackberry.com/developers/tablet/)
+ [ref]: [WebWorks Reference](http://www.blackberry.com/developers/docs/webworks/api/)
+ [sign]: [Signing](http://www.hsharma.com/tech/tutorials/10-easy-steps-to-package-and-sign-air-apps-for-playbook/)
+ [Blackberry Github Account](https://github.com/blackberry)
+ [Mobile Browser Compatibility Tables](http://www.quirksmode.org/mobile/)
