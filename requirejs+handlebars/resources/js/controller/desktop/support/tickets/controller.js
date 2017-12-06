define([
  'jquery'
], function($) {
  'use strict';

  var $categoryServiceSelect = $("#categoryService");

  function serviceCategoryAction() {

    var getValue = $categoryServiceSelect.val();

    $(".support_mantoman_qna__category_service").removeClass('active');

    switch(getValue) {
      case 'weport' : $("#categoryWeport").addClass('active'); break;
      case 'talkerbe' : $("#categoryTalkerbe").addClass('active'); break;
      case 'ncs' : $("#categoryNcs").addClass('active'); break;
      case 'all' : $("#categoryAll").addClass('active'); break;
    }

  }
  
  function controller() {

    serviceCategoryAction();

    $categoryServiceSelect.on('change', serviceCategoryAction);

    $('form[name=WriteForm]').submit(function () {
      if ($categoryServiceSelect.val() == 'weport')
        if (!$('#categoryWeport').val()) {
          alert('카테고리를 선택해주세요');
          return false;
        }
      
      if ($categoryServiceSelect.val() == 'talkerbe')
        if (!$('#categoryTalkerbe').val()) {
          alert('카테고리를 선택해주세요');
          return false;
        }

      if ($categoryServiceSelect.val() == 'ncs')
        if (!$('#categoryNcs').val()) {
          alert('카테고리를 선택해주세요');
          return false;
        }
      
      if (!$('.support_mantoman_qna__subject').val()) {
        alert('제목을 입력해주세요');
        return false;
      }

      if (!document.WriteForm.content.value) {
        alert('내용을 입력해주세요');
        return false;
      }
                
    });
  }
  
  return controller;
  
});