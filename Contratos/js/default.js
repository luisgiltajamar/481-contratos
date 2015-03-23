// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    
        var datos = [
            { titulo: "Xamarin forms", texto: "Patatin patatan" },
            { titulo: "Xamarin ios", texto: "Patatin patatan2" },
            { titulo: "Xamarin android", texto: "Patatin patatan3" },
            { titulo: "Winjs 1", texto: "Patatin patatan4" },
            { titulo: "winjs 2", texto: "Patatin patatan5" },
            { titulo: "C#", texto: "El mejor" },
            { titulo: "C# o java", texto: "La duda ofende" },
            { titulo: "Salida el jueves", texto: "Animense" },
            { titulo: "Examen el jueves", texto: "PAra quien no venga" }
        ];

    var b = new WinJS.Binding.List([]);
    WinJS.Namespace.define("Datos", { Data: datos,Busqueda:b });

    function manejadorBusqueda(args) {

        WinJS.Navigation.navigate("/pages/busqueda/busqueda.html",
            args.detail);

        Datos.Busqueda.length = 0;


        for (var i = 0; i < datos.length; i++) {
            var p = datos[i].titulo.toLowerCase().indexOf(
                args.detail.queryText.toLowerCase());

            if (p !== -1) {
                Datos.Busqueda.push(datos[i]);
            }
        }


    }


    WinJS.Namespace.define("OpcionesBusqueda", {
        GestorBusqueda:WinJS.UI.eventHandler(manejadorBusqueda)
    });


    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().done(function () {

                document.getElementById("buscador").winControl.
                    onquerysubmitted = manejadorBusqueda;





            }));

            WinJS.Application.onsettings= function(e) {

                e.detail.applicationcommands = {
                    "Ayuda": { title: "Ayuda", href: "/pages/ayuda/ayuda.html" },
                    "Configuracion": {
                        title: "Configuracion",
                        href: "/pages/ayuda/ayuda.html"
                    }

            }
                WinJS.UI.SettingsFlyout.populateSettings(e);
            }

            Windows.ApplicationModel.DataTransfer.
                DataTransferManager.getForCurrentView().
                addEventListener("datarequested", function (e) {

                    var texto = "";

                for (var i = 0; i < datos.length; i++) {
                    texto += "Titulo " + datos[i].titulo + " Texto "
                        + datos[i].texto +"\r\n";

                }

                e.request.data.properties.title = "TExto interesante";
                e.request.data.properties.description = "Lo que comparto";
                e.request.data.setText(texto);

            });
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
