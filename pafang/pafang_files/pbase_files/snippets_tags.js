$(function(){
  $('.kft_line_tt span,.line_quick_search_bd span').click(function(){
      $('.kft_impo_tt .fl span').remove();
      var tagsVal = $(this).html();
      var tagsSpan = $(this).attr('class');
      $('<span class="'+tagsSpan+'">'+tagsVal+'<a href="javascript:;"></a><s></s></span>').appendTo('.kft_impo_tt .fl');

      $('.kft_impo_tt .fl span').delegate('a','click',function(){
          $(this).parent().remove();
      });
  });

  $('.kft_impo_tt .fl span').delegate('a','click',function(){
      $(this).parent().remove();
  });
});

  