$(() => {
  $('#fullpage').fullpage();
  if($('#toggleDemo').click(function(){
    $('.product-card').css('margin', '0');
    $('.product-container').css({
        'padding' : '2.35765%',
        'margin-left' : '6%'
      });
    setTimeout(showProduct, 2000);
  }));
  function showProduct(){
    $('.product-wrapper-inner').hide();
    $('.product-wrapper').addClass('show-individual');
    $('.video-stream').show();
  }
});
