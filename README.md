Beispielanwendung "WebprogrammierungWGPlaner"
===============================

Kurzbeschreibung
----------------

Dies ist eine Browser App, die ohne einen eignen Server im Hintergrund auskommt und
komplett im Browser läuft. Lediglich für die Persistierung wird Firebase verwendet. Bei der App handelt es sich
um eine so genannte Single Page App, da die App nur einmal durch
Aufrufen der HTML-Datei gestartet werden kann und dann bis zum Verlassen der
App nicht wieder neugeladen wird. Das bedeutet eine Single Page App besteht nur aus einem einzigen HTML-Dokument, 
wobei deren Inhalte dynamisch nachgeladen werden.


=======
Um die Anwendung zu starten muss das ganze Projekt heruntergeladen oder geclont werden. Anschließend muss lediglich die index.html in einem Browser geöffent werden.


Verwendete Technologien
-----------------------

Die App nutzt den Node Package Manager npm zur Paketverwaltung. Auf diese
Weise werden der Application Bundler ParcelJS sowie eine Hand voll externe
Bibliotheken für die Anwendung installiert. So zum Beispiel das für das Routing verwendete Navigo.js. Jedoch wird kein übergreifendes
Framework wie Angular oder React verwendet, da diese für eine allgemeine
Einführung zu speziell sind und viele wesentliche Details verbergen.

Folgende Entwicklungswerkzeuge kommen stattdessen zum Einsatz:

 * [Atom:](https://atom.io/) Spezieller Texteditor für Webentwickler und Programmierer
 * [git:](https://git-scm.com/") Versionsverwaltung zur gemeinsamen Arbeit am Quellcode
 * [npm:](https://nodejs.org/") Paketverwaltung zum automatischen Download abhängiger Bibliotheken
 * [Parcel:](https://parceljs.org/") Web Application Bundler und Entwicklungsserver

Zusätzlich werden folgende Bibliotheken genutzt:

 * [Navigo:](https://github.com/krasimir/navigo) Single Page Router zur Vereinfachung der Navigation innerhalb der App
 * [firebase:](https://firebase.google.com/") Datenbank zum Speichern der Aufgaben


UI-Skizzen und Screenshots
--------------------------


<table style="max-width: 100%;">
    <tr>
        <td>
            <img src="mockup1.png" style="display: block; width: 100%;" />
        </td>
		<td>
            <img src="mockup2.png" style="display: block; width: 100%;" />
        </td>
        <td>
            <img src="mockup3.png" style="display: block; width: 100%;" />
        </td>
        <td>
            <img src="mockup4.png" style="display: block; width: 100%;" />
        </td>
		<td>
            <img src="mockup5.png" style="display: block; width: 100%;" />
        </td>
    </tr>
    <tr>
        <td>
            Mobile Darstellung Handy
        </td>
		<td>
            Mobile Darstellung iPad
        </td>
        <td>
            Übersicht der Aufgaben
        </td>
        <td>
            Anlegen einer Aufgabe
        </td>
		<td>
            Übersicht der Einkaufsliste
        </td>
    </tr>
</table>

Copyright
---------

Dieses Projekt ist lizenziert unter
[_Creative Commons Namensnennung 4.0 International_](http://creativecommons.org/licenses/by/4.0/)

© 2019 Sazin Ali, Selina Pfeifer, Celine Breh <br/>

E-Mail: [sazeenali85@gmail.com][selina1.pfeifer@web.de] [celine.breh@web.de] <br/>

