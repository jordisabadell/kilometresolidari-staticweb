$(document).ready(function() {

    var firebaseConfig = {
        apiKey: process.env.APIKEYFIREBASE,
        authDomain: "kilometresolidari-static-web.firebaseapp.com",
        databaseURL: "https://kilometresolidari-static-web.firebaseio.com",
        projectId: "kilometresolidari-static-web",
        storageBucket: "kilometresolidari-static-web.appspot.com",
        messagingSenderId: "224806508824",
        appId: "1:224806508824:web:15a26221dde55bdcf5a66d",
        measurementId: "G-QFHE8T259X"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    
    $('#formulariContacte').submit(function (e) {
        e.preventDefault();

        //reCaptcha validate
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
            return false;
        }
        
        const nom = document.getElementById('inputNom');
        const email = document.getElementById('inputEmail');
        const missatge = document.getElementById("textareaMissatge");

        firebase.database().ref('contact').push({
            'nom': nom.value,
            'email': email.value,
            'missatge': missatge.value
        }).then(function(){
            var html = '<div class="alert alert-success" role="alert">' +
                'Missatge enviat correctament.' +  
                '</div>';
            $("#resposta-content").html(html);
        })
        .catch(function(){
            var html = '<div class="alert alert-danger" role="alert">' +
                'No s\'ha pogut enviar el missatge.' +  
                '</div>';
            $("#resposta-content").html(html);
        });

        $("#formulariContacte").trigger("reset");
    });
});