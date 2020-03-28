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

        //reCaptcha v3 validation
        grecaptcha.ready(function() {        
            grecaptcha.execute(process.env.APIKEYRECAPTCHA, {action: 'search'}).then(function(token) {
    
                $('#formulariContacte').prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
                $.post("http://kilometresolidari.cat/scripts/recaptcha-validation/validate-token.php",{token: token}, function(result) {
                  if(result.success) {
                    console.log("reCaptcha v3 pass");
                    
                    //Send message to Firebase
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

                        $("#formulariContacte").trigger("reset");
                    })
                    .catch(function(){
                        var html = '<div class="alert alert-danger" role="alert">' +
                            'No s\'ha pogut enviar el missatge.' +  
                            '</div>';
                        $("#resposta-content").html(html);
                    });

                  } else {
                    console.log("reCaptcha v3 no pass");
                    var html = '<div class="alert alert-danger" role="alert">' +
                        'No s\'ha pogut enviar el missatge.' +  
                        '</div>';
                    $("#resposta-content").html(html);
                  }
                });
            });
        });
    });
});