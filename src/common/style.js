module.exports = function () {
  $("input[type='text'],select").removeAttr('style');
  $("input[type='text'], select").css({
      "display": "inline-block",
      "-webkit-box-sizing": "content-box",
      "box-sizing": "content-box",
      "padding": "3px 5px",
      "border": "1px solid #b7b7b7",
      "font": "normal 12px/normal",
      "color": "rgba(140,140,140,1)",
      "text-overflow": "clip",
      "letter-spacing": "1px",
      "background": "rgba(252,252,252,1)",
      "-webkit-box-shadow": "0 0 0 0 rgba(0,0,0,0.2) inset",
      "box-shadow": "0 0 0 0 rgba(0,0,0,0.2) inset",
      "text-shadow": "0 0 0 rgba(255,255,255,0.66) ",
      "-webkit-transition": "all 200ms cubic-bezier(0.42, 0, 0.58, 1)",
      "transition": "all 200ms cubic-bezier(0.42, 0, 0.58, 1)"
  });
  $("input[type='text'][readonly], select[disabled='disabled']").css({
      "cursor":"not-allowed",
      "color": "#767676",
        "display": "block",
        "background-color": "#eee",
        "opacity": "1"
  });

      $("input[type='text'], select").focus(function(){
        $(this).css({
          "border-color":"#66afe9"
        });
      });
      $("#formulario a.mini_botao").css({
        "padding":"6px",
        "background":"none",
        "background-color": "white",
          "text-color":"#00995D"
      });
      $("#mini_botao").css({
        "padding":"6px",
        "background":"none",
        "background-color": "white",
          "text-color":"#00995D"
      });
      $("#formulario a.mini_botao:hover").css({
        "padding":"6px",
        "background":"none",
        "background-color": "#00995D",
          "text-color":"white"
      });

      $(".title").css({
         "font-size": "18px",
         "font-weight": "500",
         "color" : "#FFFFFF",
        "padding" : "7px 0px 7px 0px",
        "text-align" : "center",
        "background-color" : "#00995D",
        "margin" : "0px 0px 0px 0px",
        "width" : "940px",
      });
      $("label").css({
        "font-size": "14px",
        "font-weight": "600",
        "color": "#00995D"
      });

      $(".subtitle").css({
        "font-size": "16px",
        "font-weight": "bold",
        "color" : "#00995D",
       "padding" : "7px 0px 7px 0px",
       "text-align" : "left",
       "margin" : "0px 0px 0px 0px",
       "width" : "940px",
       "border-bottom":"2px solid #00995D",
      });
      $(".blue").css({
        "font-size": "13px",
        "font-weight": "600",
        "color": "#5B5C65"
      });

      $('.mascara').css({
        'display' : 'none',
        'visibility' : 'hidden'
      });

}