xtag.register('similarity-detector', {
  lifecycle: {
    created: function(){

      $("#calculate").click(function () {
        $.ajax('/detect', {
          type: 'POST',
          data: {
            code: $("#code").val(),
            variant: $("#variant").val()
          },
          success: function (data) {
            $("#result").html(data)
            console.log(data)
          }
        })
      })

      console.log('similarity-detector ready!')
    }
  }
})
